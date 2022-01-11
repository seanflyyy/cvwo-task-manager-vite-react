import * as ContainerClass from './constants';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SingleTaskItem, TaskContent } from '../model/task';
import { SingleTag } from '../model/tag';
import { addToMainPanelTaskList, setMainPanelCounter, setTaskList } from '../features/mainPanel/main-panel-slice';
import { setAllTags } from '../features/leftPanel/left-panel-slice';


export const getLabel = (tagID: number) => {
    const [data, setData] = useState<SingleTag>();

    (async () => {
            const result = await axios.get(`${ContainerClass.databaseLink}/labels/${tagID}`);
            const tasks = result.data['data'];
            setData(tasks);
    })();
    const tagObject = data;

    return tagObject;
};

export const getSpecificTask = (id: number) => {
    const [data, setData] = useState([]);

    (async () => {
        const result = await axios.get(`${ContainerClass.databaseLink}/tasks/${id}`);
        const task = result.data['data'];
        setData(task);
    })();

    return data;
};

export const updateTask = (id: number, taskContent: TaskContent) => {
    (async () => {
        await axios.patch(`${ContainerClass.databaseLink}/tasks/${id}`, taskContent);
    })();
};

export const createTaskOnDatabase = async (taskContent: TaskContent) => {
    (async () => {
        await axios.post(`${ContainerClass.databaseLink}/tasks`, taskContent)
        .then((resp) => {
            console.log(resp.status);
        })
        .catch((err) => console.log(err));
    })();
}
