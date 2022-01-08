import * as ContainerClass from './constants';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TaskContent } from '../model/task';
import { SingleTag } from '../model/tag';

export const getLabels = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await axios.get(`${ContainerClass.databaseLink}/labels`);
            const tasks = result.data['data'];
            setData(tasks);
        })();
    }, []);
    // const mappedData = data.map(data.product, 'proizvod_naziv');
    const mappedData = data;

    return mappedData;
};

export const getLabel = (tagID: number) => {
    const [data, setData] = useState<SingleTag>();

    useEffect(() => {
        (async () => {
            const result = await axios.get(`${ContainerClass.databaseLink}/labels/${tagID}`);
            const tasks = result.data['data'];
            setData(tasks);
        })();
    }, []);
    // const mappedData = data.map(data.product, 'proizvod_naziv');
    const tagObject = data;

    return tagObject;
};


export const getTasks = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await axios.get(`${ContainerClass.databaseLink}/labels`);
            const tasks = result.data['included'];
            setData(tasks);
        })();
    }, []);
    // const mappedData = data.map(data.product, 'proizvod_naziv');
    const mappedData = data;

    return mappedData;
};

export const getSpecificTask = (id: number) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await axios.get(`${ContainerClass.databaseLink}/tasks/${id}`);
            const task = result.data['data'];
            setData(task);
        })();
    }, []);
    // const mappedData = data.map(data.product, 'proizvod_naziv');
    // const mappedData = data;
    console.log(data);
    return data;
};

export const updateTask = (id: number, taskContent: TaskContent) => {
    // useEffect(() => {
    (async () => {
    const result = await axios.patch(`${ContainerClass.databaseLink}/tasks/${id}`, taskContent);
    })();
    // }, []);
};

