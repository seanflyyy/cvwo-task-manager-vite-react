export interface SingleTaskItem {
    attributes: TaskContent;
    id: number;
}

interface TaskContent {
    title: string;
    completed: boolean;
    due: string;
    label_id: number;
}
