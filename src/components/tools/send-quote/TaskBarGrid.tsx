'use client';

import { useMemo } from 'react';

import { CustomTask } from './CustomGanttChart';
import TaskBar from './TaskBar';

interface TaskBarGridProps {
  data: CustomTask[];
  handleUpdateTasks: (taskId: string, newData: Partial<CustomTask>) => void;
  onStartEditingTask: (task: CustomTask) => void;
}

// Before all, I want to note: I'm creating a task bar grid with "full 7 days" of a week.
// It means, the first item of allDays constant is Sunday, index of it is 0, x-position is 0.
// And I'm using week as Sunday (index 0), Monday (index 1), ..., Friday (index 5), Saturday (index 6) (as same as javascript rule)
// If you don't follow this rule, it maybe cause a bug. If you want to change rule, make sure to fix all bugs.

export default function TaskBarGrid({
  data,
  handleUpdateTasks,
  onStartEditingTask,
}: TaskBarGridProps) {
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

  // Example: The date is 21/05/2025, Wednesday. The start date of this week is 18/05/2025, Sunday
  const getStartDateOfWeek = (date: Date) => {
    const d = new Date(date);
    let day = d.getDay();
    d.setDate(d.getDate() - day);
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

            {/* Fill light gray color for holidays */}
            <g>
              {Array.from({ length: allDays.length + 1 }).map(
                (_, index) =>
                  (index % 7 === 0 || (index + 1) % 7 === 0) && (
                    <rect
                      key={index}
                      x={index * 40}
                      y={0}
                      width={40}
                      height={data.length * 40}
                      fill='#f8f9fa'
                    ></rect>
                  )
              )}
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
                handleUpdateTasks={handleUpdateTasks}
                onStartEditingTask={onStartEditingTask}
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
