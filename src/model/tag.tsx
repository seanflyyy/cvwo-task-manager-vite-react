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
}

export interface TaskForTags {
  id: string;
  type: string;
}


export interface CreateTagContent {
  title: string;
  color: string;
}
