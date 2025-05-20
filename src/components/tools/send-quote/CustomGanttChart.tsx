import { useState } from 'react';
import CalendarBar from './CalendarBar';
import TaskBarGrid from './TaskBarGrid';

export interface CustomTask {
  duration: number;
  start: Date;
  end: Date;
  name: string;
  id: string;
  type: string;
  progress?: number;
  styles?: {
    backgroundColor: string;
    backgroundSelectedColor: string;
  };
}

export default function CustomGanttChart() {
  const data: CustomTask[] = [
    {
      duration: 5,
      start: new Date(2025, 4, 19),
      end: new Date(2025, 4, 23),
      name: 'Requirement Analysis and Documentation',
      id: '1',
      type: 'task',
      progress: 0,
      styles: {
        backgroundColor: '#0080ff',
        backgroundSelectedColor: '#0080ff',
      },
    },
    {
      duration: 7,
      start: new Date(2025, 4, 26),
      end: new Date(2025, 5, 3),
      name: 'UI/UX Design (Wireframing and Mockups)',
      id: '2',
      type: 'task',
      progress: 0,
      styles: {
        backgroundColor: '#0080ff',
        backgroundSelectedColor: '#0080ff',
      },
    },
    {
      duration: 2,
      start: new Date(2025, 5, 4),
      end: new Date(2025, 5, 5),
      name: 'Frontend Development (Web)',
      id: '3',
      type: 'task',
      progress: 0,
      styles: {
        backgroundColor: '#0080ff',
        backgroundSelectedColor: '#0080ff',
      },
    },
  ];

  const [tasks, setTasks] = useState<CustomTask[]>(data);

  const handleUpdateTasks = (taskId: string, newData: Partial<CustomTask>) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          ...newData,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className='flex mt-4'>
      {/* Task lisk */}
      <div>
        <div className='!border !border-r-0 !border-solid !border-[#e6e4e4] table'>
          <div className='table-row h-16'>
            <div className='table-cell align-middle px-3 max-w-60 min-w-60'>
              Task Name
            </div>
            <div className='!border-0 !border-r !border-solid !border-[#c4c4c4] h-6 mt-3'></div>
            <div className='table-cell align-middle px-3 max-w-[120px] min-w-[120px]'>
              Start
            </div>
            <div className='!border-0 !border-r !border-solid !border-[#c4c4c4] h-6 mt-3'></div>
            <div className='table-cell align-middle px-3 max-w-[120px] min-w-[120px]'>
              End
            </div>
            <div className='!border-0 !border-r !border-solid !border-[#c4c4c4] h-6 mt-3'></div>
            <div className='table-cell align-middle px-3 max-w-24 min-w-24'>
              Duration
            </div>
          </div>
        </div>

        <div>
          <div className='!border !border-r-0 !border-t-0 !border-solid !border-[#e6e4e4] table'>
            {tasks.map((item) => (
              <div key={item.id} className='table-row h-10'>
                <div
                  title={item.name}
                  className='table-cell align-middle px-3 max-w-60 min-w-60 whitespace-nowrap text-ellipsis overflow-hidden'
                >
                  {item.name}
                </div>
                <div className='table-cell align-middle px-3 max-w-[120px] min-w-[120px]'>
                  {item.start.toLocaleDateString('vi-VN')}
                </div>
                <div className='table-cell align-middle px-3 max-w-[120px] min-w-[120px]'>
                  {item.end.toLocaleDateString('vi-VN')}
                </div>
                <div className='table-cell align-middle px-3 max-w-24 min-w-24'>
                  {item.duration} days
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task bars grid */}
      <div className='overflow-auto'>
        <CalendarBar data={tasks} />
        <TaskBarGrid data={tasks} handleUpdateTasks={handleUpdateTasks} />
      </div>
    </div>
  );
}
