export type InsertTaskType = {
  title: string;
  status: string;
};

export type SelectTaskType = InsertTaskType & {
  id: string;
};
