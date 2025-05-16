import { useState, useEffect, useMemo } from 'react';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { QuoteItem } from '@/types/quote';

const FormSchema = z.object({
  taskName: z.string().min(2, {
    message: 'Vui lòng nhập tên công việc!',
  }),
});

interface GanttChartProps {
  quotationItems: QuoteItem[];
  totalMandays: number;
}

export default function GanttChart({
  quotationItems,
  totalMandays,
}: GanttChartProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [taskIsEditing, setTaskIsEditing] = useState<Task | null>(null);
  const [editingTaskName, setEditingTaskName] = useState<string>('');

  const tasksV2: Task[] = useMemo(() => {
    return tasks.map((task) => {
      return {
        ...task,
        styles: {
          backgroundColor: '#0080ff',
          backgroundSelectedColor: '#0080ff',
        },
      };
    });
  }, [tasks]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: {
      taskName: editingTaskName,
    },
  });

  const onDoubleClickTaskBar = (task: Task) => {
    setTaskIsEditing(task);
    setEditingTaskName(task.name);
    setIsEditTaskDialogOpen(true);
  };

  const onClose = () => {
    setTaskIsEditing(null);
    setEditingTaskName('');
    setIsEditTaskDialogOpen(false);
  };

  const handleChangeTaskName = (data: z.infer<typeof FormSchema>) => {
    const editedTasks = tasks.map((task) => {
      return task.id === taskIsEditing?.id
        ? { ...task, name: data.taskName }
        : task;
    });

    setTasks(editedTasks);
    onClose();
  };

  const handleChangeDate = (task: Task) => {
    const editedTasks = tasks.map((t) => {
      return t.id === task.id ? { ...t, start: task.start, end: task.end } : t;
    });
    setTasks(editedTasks);
  };

  const convertQuotationItemsToTasks = (): Task[] => {
    const today = new Date();
    let previousEndDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return quotationItems.map((item) => {
      const startDate = new Date(
        previousEndDate.getFullYear(),
        previousEndDate.getMonth(),
        previousEndDate.getDate()
      );
      const endDate = new Date(
        previousEndDate.getFullYear(),
        previousEndDate.getMonth(),
        previousEndDate.getDate() + item.mandays
      );
      previousEndDate = endDate;

      return {
        start: startDate,
        end: endDate,
        name: item.item,
        id: item.no.toString(),
        type: 'task',
        progress: 0,
      };
    });
  };

  useEffect(() => {
    setTasks(convertQuotationItemsToTasks());
  }, [quotationItems]);

  return (
    <div className='mt-6'>
      <Dialog open={isEditTaskDialogOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleChangeTaskName)}>
              <FormField
                control={form.control}
                name='taskName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task's name</FormLabel>
                    <FormControl className='mt-2'>
                      <Input placeholder='Nhập tên công việc' {...field} />
                    </FormControl>
                    <FormMessage className='text-[#FF0000]' />
                  </FormItem>
                )}
              />
              <div className='flex justify-end mt-[1rem] gap-4'>
                <Button variant='secondary' onClick={onClose}>
                  Cancel
                </Button>
                <Button type='submit'>Submit</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {tasksV2.length > 0 && (
        <Gantt
          tasks={tasksV2}
          viewMode={ViewMode.Day}
          onDateChange={(task) => handleChangeDate(task)}
          onDoubleClick={onDoubleClickTaskBar}
          listCellWidth='150px'
          locale='vi'
        />
      )}
    </div>
  );
}
