export interface SingleTag {
    id: number;
    attributes: TagContent;
    // relationships: {
    //     tasks: {
    //         data: Tasks;
    //     };
    // };
}

interface TagContent {
    title: string;
    color: string;
    slug: string;
}

interface Tasks {
    id: string;
    type: string;
}
