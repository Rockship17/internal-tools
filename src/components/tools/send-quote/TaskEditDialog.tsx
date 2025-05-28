import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
import { CustomTask } from './CustomGanttChart';
import { DatePicker } from '@/components/ui/date-picker';
import { calculateDateInGanttChart } from '@/utils/helper';

interface TaskEditDialogProps {
  isDialogOpen: boolean;
  editingTask: CustomTask | undefined;
  onClose: () => void;
  handleUpdateTasks: (taskId: string, newData: Partial<CustomTask>) => void;
}

interface TaskFormValues {
  name: string;
  start: Date | undefined;
  end: Date | undefined;
  duration: number;
}

export default function TaskEditDialog({
  isDialogOpen,
  editingTask,
  onClose,
  handleUpdateTasks,
}: TaskEditDialogProps) {
  const [currentTask, setCurrentTask] = useState<CustomTask | undefined>(
    editingTask
  );

  useEffect(() => {
    setCurrentTask(editingTask);
  }, [editingTask]);

  const form = useForm<TaskFormValues>({
    values: {
      name: currentTask?.name || '',
      start: currentTask?.start,
      end: currentTask?.end,
      duration: currentTask?.duration || 0,
    },
  });

  const handleSubmit = (data: TaskFormValues) => {
    console.log(data);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name='name'
              rules={{ required: 'Please enter task name!' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task name</FormLabel>
                  <FormControl className='mt-2'>
                    <Input placeholder='Enter task name' {...field} />
                  </FormControl>
                  <FormMessage className='text-[#FF0000]' />
                </FormItem>
              )}
            />

            <div className='flex space-between gap-4 mt-4'>
              <FormField
                control={form.control}
                name='start'
                rules={{ required: 'Please choose start date!' }}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Start</FormLabel>
                    <FormControl className='mt-2'>
                      <DatePicker
                        date={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          const formValues = form.getValues();
                          console.log(
                            calculateDateInGanttChart(
                              formValues.start,
                              undefined,
                              formValues.duration
                            )
                          );
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-[#FF0000]' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='end'
                rules={{ required: 'Please choose end date!' }}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>End</FormLabel>
                    <FormControl className='mt-2'>
                      <DatePicker
                        date={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          const formValues = form.getValues();
                          console.log(
                            calculateDateInGanttChart(
                              formValues.start,
                              date,
                              undefined
                            )
                          );
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-[#FF0000]' />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='duration'
              rules={{ required: 'Please enter duration!' }}
              render={({ field }) => (
                <FormItem className='mt-4'>
                  <FormLabel>Duration</FormLabel>
                  <FormControl className='mt-2'>
                    <Input
                      type='number'
                      placeholder='Enter duration'
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        const formValues = form.getValues();
                        console.log(
                          calculateDateInGanttChart(
                            formValues.start,
                            undefined,
                            Number(e.target.value)
                          )
                        );
                      }}
                    />
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
  );
}
