import { deleteTask } from "@/store/taskSlice";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { SelectTaskType } from "@/types/tasks";

type Props = {
  setEditingTask: React.Dispatch<React.SetStateAction<SelectTaskType | null>>;
  task: SelectTaskType;
};

const TaskItem = ({ setEditingTask, task }: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex-grow">
        <span className="mr-2">{task.title}</span>
        <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {task.status}
        </span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setEditingTask(task)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => dispatch(deleteTask(task.id))}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
