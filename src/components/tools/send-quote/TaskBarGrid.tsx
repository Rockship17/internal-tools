'use client';

import { useMemo, useRef, useState } from 'react';

import { CustomTask } from './CustomGanttChart';
import TaskBar from './TaskBar';

interface TaskBarGridProps {
  data: CustomTask[];
}

export default function TaskBarGrid({ data }: TaskBarGridProps) {
  const startDays = useMemo(() => data.map((task) => task.start), [data]);
  const endDays = useMemo(() => data.map((task) => task.end), [data]);

  const firstStartDay = useMemo(
    () =>
      startDays.reduce((min, current) => {
        return current.toISOString() < min.toISOString() ? current : min;
      }),
    [startDays]
  );
  const lastEndDay = useMemo(
    () =>
      endDays.reduce((min, current) => {
        return current.toISOString() > min.toISOString() ? current : min;
      }),
    [endDays]
  );
  const diffInDays = useMemo(
    () =>
      (lastEndDay.getTime() - firstStartDay.getTime()) / (60 * 60 * 24 * 1000) +
      1,
    [lastEndDay, firstStartDay]
  );

  // Example: The date is 21/05/2025, Wednesday. The start date of this week is 19/05/2025, Monday
  const getStartDateOfWeek = (date: Date) => {
    const d = new Date(date);
    let day = d.getDay();
    if (day === 0) day = 7; // Sunday = 7
    d.setDate(d.getDate() - day + 1);
    return d;
  };

  const startDateOfFirstWeek = useMemo(
    () => getStartDateOfWeek(firstStartDay),
    [firstStartDay]
  );

  const allDays = useMemo(() => {
    const dates = [];
    const currentDate = new Date(startDateOfFirstWeek);

    // Get all dates from the start date to the end date, and 60 days after the end date.
    // Use Math.ceil((diffInDays + 60) / 7) * 7 to get full dates of the last week
    for (let i = 0; i < Math.ceil((diffInDays + 60) / 7) * 7; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }, [diffInDays, startDateOfFirstWeek]);

  const getDayIndex = (date: Date) => {
    return (
      (date.getTime() - startDateOfFirstWeek.getTime()) / (60 * 60 * 24 * 1000)
    );
  };

  return (
    <div className={`w-[${allDays.length * 40}px]`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={allDays.length * 40}
        height={data.length * 40}
      >
        <g className='grid'>
          <g className='gridBody'>
            <g className='rows'>
              {data.map((task, index) => (
                <rect
                  key={task.id}
                  x='0'
                  y={index * 40}
                  width={allDays.length * 40}
                  height='40'
                  fill='#fff'
                ></rect>
              ))}
            </g>

            <g className='rowLines'>
              <line
                x='0'
                y1='0'
                x2={allDays.length * 40}
                y2='0'
                className='_3rUKi'
              ></line>

              {data.map((task, index) => (
                <line
                  key={task.id}
                  x='0'
                  y1={(index + 1) * 40}
                  x2={allDays.length * 40}
                  y2={(index + 1) * 40}
                  className='_3rUKi'
                ></line>
              ))}
            </g>

            <g className='ticks'>
              {Array.from({ length: allDays.length + 1 }).map((_, index) => (
                <line
                  key={index}
                  x1={index * 40}
                  y1='0'
                  x2={index * 40}
                  y2={data.length * 40}
                  stroke='#e6e4e4'
                ></line>
              ))}
            </g>
          </g>
        </g>

        <g className='content'>
          <g className='arrows' fill='grey' stroke='grey'></g>
          <g className='bar'>
            {data.map((task, index) => (
              <TaskBar
                key={task.id}
                task={task}
                index={index}
                dayIndex={getDayIndex(task.start)}
              />
              // <g
              //   key={task.id}
              //   onDoubleClick={() => console.log(444)}
              //   onMouseDown={handleMouseDown}
              //   transform={`translate(${position.x}, ${position.y})`}
              // >
              //   <g className='_KxSXS' tabIndex={0}>
              //     <g>
              //       <rect
              //         x={getDayIndex(task.start) * 40}
              //         width={task.duration * 40}
              //         y={index * 40 + 8}
              //         height='24'
              //         ry='3'
              //         rx='3'
              //         fill='#0080ff'
              //         className='_31ERP'
              //       ></rect>

              //       {/* It seems that this is a triangular to change progress, please don't remove */}
              //       {/* <rect
              //       x='0'
              //       width='0'
              //       y='10'
              //       height='30'
              //       ry='3'
              //       rx='3'
              //       fill='#8282f5'
              //     ></rect> */}
              //     </g>
              //     <g className='handleGroup'>
              //       <g>
              //         <rect
              //           x={getDayIndex(task.start) * 40 + 1}
              //           y={index * 40 + 9}
              //           width='8'
              //           height='22'
              //           className='_3w_5u'
              //           ry='3'
              //           rx='3'
              //           onMouseDown={(e) => console.log(e.clientX, e.clientY)}
              //           // onMouseMove={(e) => console.log(e.clientX, e.clientY)}
              //           onMouseUp={(e) => console.log(e.clientX, e.clientY)}
              //         ></rect>
              //         <rect
              //           x={(getDayIndex(task.start) + task.duration) * 40 - 9}
              //           y={index * 40 + 9}
              //           width='8'
              //           height='22'
              //           className='_3w_5u'
              //           ry='3'
              //           rx='3'
              //         ></rect>
              //       </g>
              //     </g>
              //   </g>
              // </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
