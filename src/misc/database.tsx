import * as ContainerClass from './constants';
import {useState} from 'react';
import axios from 'axios';
import {TaskContent} from '../model/task';
import {SingleTag} from '../model/tag';

export const getLabel = (tagID: number) => {
  const [data, setData] = useState<SingleTag>();

  (async () => {
    const result = await axios.get(
      `${ContainerClass.databaseLink}/labels/${tagID}`
    );
    const tasks = result.data['data'];
    setData(tasks);
  })();
  const tagObject = data;

  return tagObject;
};

export const getSpecificTask = (id: number) => {
  const [data, setData] = useState([]);

  (async () => {
    const result = await axios.get(
      `${ContainerClass.databaseLink}/tasks/${id}`
    );
    const task = result.data['data'];
    setData(task);
  })();

  return data;
};

export const updateTask = (id: number, taskContent: TaskContent) => {
  (async () => {
    await axios
      .patch(`${ContainerClass.databaseLink}/tasks/${id}`, taskContent)
      .then(resp => console.log(resp.status));
  })();
};

export const createTaskOnDatabase = async (taskContent: TaskContent) => {
  await axios
    .post(`${ContainerClass.databaseLink}/tasks`, taskContent)
    .then(resp => {
      console.log(resp.status);
    })
    .catch(err => console.log(err));
};
