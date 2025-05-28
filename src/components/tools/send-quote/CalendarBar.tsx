'use client';

import { useMemo } from 'react';

import { CustomTask } from './CustomGanttChart';

interface CalendarBarProps {
  data: CustomTask[];
}

export default function CalendarBar({ data }: CalendarBarProps) {
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

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={allDays.length * 40}
      height='65'
    >
      <g fontSize='14px'>
        <rect
          x='0'
          y='0'
          width={allDays.length * 40}
          height='65'
          fill='#ffffff'
          stroke='#e0e0e0'
          strokeWidth='1px'
        />

        {allDays.map((date, index) => (
          <text key={index} y='50' x={index * 40 + 12}>
            {date.getDate()}
          </text>
        ))}

        {allDays.map(
          (date, index) =>
            index % 7 === 0 && (
              <g key={index} className='calendarTop'>
                <line
                  x1={index * 40}
                  y1='0'
                  x2={index * 40}
                  y2='65'
                  className='_1rLuZ'
                />
                <text y='22.5' x={index * 40 + 108}>
                  {date.toLocaleDateString('vi-VN')}
                </text>
              </g>
            )
        )}
      </g>
    </svg>
  );
}
