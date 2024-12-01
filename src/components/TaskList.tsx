// components/TaskList.js
import { useState } from "react";
import { useSelector } from "react-redux";
import EditTaskModal from "./EditTaskModal";
import { SelectTaskType } from "@/types/tasks";
import TaskItem from "./TaskItem";

const TaskList = ({ filter }: { filter: string }) => {
  const [editingTask, setEditingTask] = useState<SelectTaskType | null>(null);

  const tasks = useSelector((state: { tasks: { tasks: SelectTaskType[] } }) => {
    if (filter === "all") return state.tasks.tasks;
    return state.tasks.tasks.filter((task) => task.status === filter);
  });

  return (
    <>
      <div className="p-8">
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              setEditingTask={setEditingTask}
            />
          ))
        )}
      </div>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          open={!!editingTask}
          onOpenChange={() => setEditingTask(null)}
        />
      )}
    </>
  );
};

export default TaskList;
