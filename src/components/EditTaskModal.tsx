import { useDispatch } from "react-redux";
import { updateTask } from "../store/taskSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { taskStatus } from "@/constants/constants";
import { SelectTaskType } from "@/types/tasks";

// Validation Schema
const taskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  status: z.nativeEnum(taskStatus),
});

type Props = {
  task: SelectTaskType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EditTaskModal = ({ task, open, onOpenChange }: Props) => {
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      status: task.status,
    },
  });

  const onSubmit = (data: z.infer<typeof taskSchema>) => {
    dispatch(
      updateTask({
        id: task.id,
        ...data,
      })
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Edit task details</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select task status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(taskStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status
                            .replace("-", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Update Task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;
