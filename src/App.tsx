import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AddTaskModal from "./components/AddTaskModal";
import TaskList from "./components/TaskList";
import { taskStatus } from "./constants/constants";

// Task Status Enum

const App = () => {
  const [filter, setFilter] = React.useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-300">
      <Card className="w-4/6 h-5/6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Task Management App</CardTitle>
          <div className="flex items-center space-x-4">
            <Select onValueChange={setFilter} defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Tasks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value={taskStatus.PENDING}>Pending</SelectItem>
                <SelectItem value={taskStatus.IN_PROGRESS}>
                  In Progress
                </SelectItem>
                <SelectItem value={taskStatus.COMPLETED}>Completed</SelectItem>
              </SelectContent>
            </Select>
            <AddTaskModal
              open={isAddModalOpen}
              onOpenChange={setIsAddModalOpen}
            />
          </div>
        </CardHeader>
        <CardContent>
          <TaskList filter={filter} />
        </CardContent>
      </Card>
    </div>
  );
};

export default App;

// store/taskSlice.js
// components/AddTaskModal.js
