import { InsertTaskType, SelectTaskType } from "@/types/tasks";
import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  } as { tasks: SelectTaskType[] },

  reducers: {
    addTask: {
      reducer: (state, action: { payload: SelectTaskType }) => {
        state.tasks.push(action.payload);
      },
      prepare: (taskData: InsertTaskType) => ({
        payload: {
          id: Date.now().toString(),
          ...taskData,
          status: taskData.status,
        },
      }),
    },
    updateTask: (state, action: { payload: SelectTaskType }) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        Object.assign(task, action.payload);
      }
    },
    deleteTask: (state, action: { payload: string }) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
