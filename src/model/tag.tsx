export interface SingleTag {
  id: number;
  attributes: TagContent;
  relationships: {
      tasks: {
          data: TaskForTags[];
      };
  };
}

interface TagContent {
  title: string;
  color: string;
  slug: string;
  user_id: number;
}

export interface TaskForTags {
  id: string;
  type: string;
}


export interface CreateTagContent {
  title: string;
  color: string;
  user_id: number;
}
