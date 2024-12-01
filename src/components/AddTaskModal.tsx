import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Plus } from "lucide-react";
import { taskStatus } from "@/constants/constants";

// Validation Schema
const taskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  status: z.nativeEnum(taskStatus).default(taskStatus.PENDING),
});

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AddTaskModal = ({ open, onOpenChange }: Props) => {
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      status: taskStatus.PENDING,
    },
  });

  const onSubmit = (data: z.infer<typeof taskSchema>) => {
    dispatch(addTask(data));
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>Add a new task to the list</DialogDescription>
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
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Add Task</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
