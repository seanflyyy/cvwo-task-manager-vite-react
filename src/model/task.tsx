export interface SingleTaskItem {
  attributes: TaskContent;
  id: number;
}

export interface TaskContent {
  title: string;
  completed: boolean;
  due: string;
  label_id: number;
  user_id: number;
}
