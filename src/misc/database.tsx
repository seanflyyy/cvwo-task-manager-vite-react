import * as ContainerClass from './constants';
import {useState} from 'react';
import axios from 'axios';
import {TaskContent} from '../model/task';
import {CreateTagContent, SingleTag} from '../model/tag';

export const getLabel = (tagID: number) => {
  const [data, setData] = useState<SingleTag>();

  (async () => {
    const result = await axios.get(
        `${ContainerClass.databaseLink}/labels/${tagID}`, {
          headers: {
            'Authorization': `token ${localStorage.getItem('token')}`,
          },
        },
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
        `${ContainerClass.databaseLink}/tasks/${id}`, {
          headers: {
            'Authorization': `token ${localStorage.getItem('token')}`,
          },
        },
    );
    const task = result.data['data'];
    setData(task);
  })();

  return data;
};

export const updateTask = (id: number, taskContent: TaskContent) => {
  (async () => {
    await axios
        .patch(`${ContainerClass.databaseLink}/tasks/${id}`, taskContent, {
          headers: {
            'Authorization': `token ${localStorage.getItem('token')}`,
          },
        })
        .then((resp) => console.log(resp.status));
  })();
};

export const updateTag = (id: number, tagContent: CreateTagContent) => {
  (async () => {
    await axios
        .patch(`${ContainerClass.databaseLink}/labels/${id}`, tagContent, {
          headers: {
            'Authorization': `token ${localStorage.getItem('token')}`,
          },
        })
        .then((resp) => console.log(resp.status));
  })();
};


export const createTaskOnDatabase = async (taskContent: TaskContent) => {
  await axios
      .post(`${ContainerClass.databaseLink}/tasks`, taskContent, {
        headers: {
          'Authorization': `token ${localStorage.getItem('token')}`,
        },
      })
      .then((resp) => {
        console.log(resp.status);
      })
      .catch((err) => console.log(err));
};


// eslint-disable-next-line max-len
export const createTagOnDatabase = async (createTagContent: CreateTagContent) => {
  await axios
      .post(`${ContainerClass.databaseLink}/labels`, createTagContent, {
        headers: {
          'Authorization': `token ${localStorage.getItem('token')}`,
        },
      })
      .then((resp) => {
        console.log(resp.status);
      })
      .catch((err) => console.log(err));
};

/**
   * Deletes tag on the backend.
   * @param {number} tagID - The ID of the tag to be deleted.
   */
export const deleteTag = (tagID: number) => {
  (async () => {
    await axios
        .delete(`${ContainerClass.databaseLink}/labels/${tagID}`, {
          headers: {
            'Authorization': `token ${localStorage.getItem('token')}`,
          },
        })
        .then((resp) => {
          console.log(resp.status);
        })
        .catch((err) => {
          console.log(err);
        });
  })();
};

/**
   * Deletes task on the backend.
   * @param {number} taskID - The ID of the task to be deleted.
   */
export const deleteTask = (taskID: number) => {
  (async () => {
    await axios
        .delete(`${ContainerClass.databaseLink}/tasks/${taskID}`, {
          headers: {
            'Authorization': `token ${localStorage.getItem('token')}`,
          },
        })
        .then((resp) => {
          console.log(resp.status);
        })
        .catch((err) => {
          console.log(err);
        });
  })();
};
