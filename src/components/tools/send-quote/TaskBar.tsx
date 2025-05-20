'use client';

import { useState, useRef, useEffect } from 'react';

import { CustomTask } from './CustomGanttChart';

interface TaskBarProps {
  task: CustomTask;
  index: number;
  dayIndex: number;
}

export default function TaskBar({ task, index, dayIndex }: TaskBarProps) {
  // Start: Moving task bar
  const [positionX, setPositionX] = useState(0);
  const dragStart = useRef<number | null>(null);

  const [leftResizeX, setLeftResizeX] = useState(0);
  const leftDragStart = useRef<number | null>(null);
  const [rightResizeX, setRightResizeX] = useState(0);
  const rightDragStart = useRef<number | null>(null);

  const setPositionAfterMouseUp = (posX: number) => {
    setPositionX(Math.floor(posX / 40) * 40);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStart.current = e.clientX - positionX;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragStart.current) return;
    setPositionX(e.clientX - dragStart.current);
  };

  const handleMouseUp = (e: MouseEvent) => {
    setPositionAfterMouseUp(e.clientX - (dragStart.current || 0));
    dragStart.current = null;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };
  // End: Moving task bar
  // ================================================================================================================
  // Start: Moving left resize element to resize task bar
  const setPositionAfterMouseUpLeft = (posX: number) => {
    setLeftResizeX(Math.floor(posX / 40) * 40);
  };

  const handleMouseDownLeft = (e: React.MouseEvent) => {
    e.stopPropagation(); // To prevent moving the task bar, because it default applies this event for parent element
    leftDragStart.current = e.clientX - leftResizeX;
    window.addEventListener('mousemove', handleMouseMoveLeft);
    window.addEventListener('mouseup', handleMouseUpLeft);
  };

  const handleMouseMoveLeft = (e: MouseEvent) => {
    if (!leftDragStart.current) return;

    // task.duration * 40 - leftResizeX + rightResizeX is width of task bar. Prevent it to be smaller than 40 (one day)
    // Because leftResizeX doesn't change during mouseMove event, use e.clientX - leftDragStart.current instead.
    if (
      task.duration * 40 - (e.clientX - leftDragStart.current) + rightResizeX >=
      40
    ) {
      setLeftResizeX(e.clientX - leftDragStart.current);
    }
  };

  const handleMouseUpLeft = (e: MouseEvent) => {
    setPositionAfterMouseUpLeft(e.clientX - (leftDragStart.current || 0));
    leftDragStart.current = null;
    window.removeEventListener('mousemove', handleMouseMoveLeft);
    window.removeEventListener('mouseup', handleMouseUpLeft);
  };
  // End: Moving left resize element to resize task bar
  // ================================================================================================================
  // Start: Moving right resize element to resize task bar
  const setPositionAfterMouseUpRight = (posX: number) => {
    setRightResizeX(Math.ceil(posX / 40) * 40);
  };

  const handleMouseDownRight = (e: React.MouseEvent) => {
    e.stopPropagation(); // To prevent moving the task bar, because it default applies this event for parent element
    rightDragStart.current = e.clientX - rightResizeX;
    window.addEventListener('mousemove', handleMouseMoveRight);
    window.addEventListener('mouseup', handleMouseUpRight);
  };

  const handleMouseMoveRight = (e: MouseEvent) => {
    if (!rightDragStart.current) return;

    // task.duration * 40 - leftResizeX + rightResizeX is width of task bar. Prevent it to be smaller than 40 (one day)
    // Because rightResizeX doesn't change during mouseMove event, use e.clientX - rightDragStart.current instead.
    if (
      task.duration * 40 - leftResizeX + e.clientX - rightDragStart.current >=
      40
    ) {
      setRightResizeX(e.clientX - rightDragStart.current);
    }
  };

  const handleMouseUpRight = (e: MouseEvent) => {
    setPositionAfterMouseUpRight(e.clientX - (rightDragStart.current || 0));
    rightDragStart.current = null;
    window.removeEventListener('mousemove', handleMouseMoveRight);
    window.removeEventListener('mouseup', handleMouseUpRight);
  };
  // End: Moving right resize element to resize task bar

  return (
    <g
      onDoubleClick={() => console.log(444)}
      onMouseDown={handleMouseDown}
      transform={`translate(${positionX + leftResizeX}, 0)`} // use transform to move the task bar
    >
      <g className='_KxSXS' tabIndex={0}>
        <g>
          <rect
            x={dayIndex * 40}
            width={task.duration * 40 - leftResizeX + rightResizeX}
            y={index * 40 + 8}
            height='24'
            ry='3'
            rx='3'
            fill='#0080ff'
            className='_31ERP'
          ></rect>

          {/* It seems that this is a triangular to change progress, please don't remove */}
          {/* <rect
                    x='0'
                    width='0'
                    y='10'
                    height='30'
                    ry='3'
                    rx='3'
                    fill='#8282f5'
                  ></rect> */}
        </g>
        <g className='handleGroup'>
          <g>
            <rect
              x={dayIndex * 40 + 1}
              y={index * 40 + 9}
              width='8'
              height='22'
              className='_3w_5u cursor-ew-resize'
              ry='3'
              rx='3'
              onMouseDown={handleMouseDownLeft}
            ></rect>

            {/* When resize on left, we currently add leftResizeX into taskbar's transform, 
            that affects the taskbar's position => affects the position of right resize, too. Therefore, we need to
            subtract leftResizeX here */}
            <rect
              x={
                (dayIndex + task.duration) * 40 - 9 - leftResizeX + rightResizeX
              }
              y={index * 40 + 9}
              width='8'
              height='22'
              className='_3w_5u cursor-ew-resize'
              ry='3'
              rx='3'
              onMouseDown={handleMouseDownRight}
            ></rect>
          </g>
        </g>
      </g>
    </g>
  );
}
