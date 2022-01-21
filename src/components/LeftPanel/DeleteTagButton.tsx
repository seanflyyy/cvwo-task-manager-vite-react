/* eslint-disable react/no-unescaped-entities */
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import * as ContainerClass from '../../misc/constants';
import {setTaskList} from '../../features/mainPanel/main-panel-slice';
import {SingleTag, TaskForTags} from '../../model/tag';

import axios from 'axios';
import {TiDelete} from 'react-icons/Ti';
import {makeStyles} from '@mui/styles';
import {IconButton} from '@mui/material';
import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import {setAllTags} from '../../features/leftPanel/left-panel-slice';


const useStyles = makeStyles(() => ({
  deleteTagButton: {
    // position: 'absolute',
    // right: '5%',
    padding: 0,
  },
  trashCan: {
    //   paddingLeft: 30,
    color: 'red',
  },
  divTagButton: {
    paddingLeft: 0,
  },
}));

const style = {
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  //   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DeleteTagButton: React.FC<SingleTag> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const mainPanel = useAppSelector((state) => state.mainPanel);
  const leftPanel = useAppSelector((state) => state.leftPanel);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(props.relationships.tasks.data);

  const handleDeleteTaskEvent = () => {
    // go ahead to delete all the tasks on the backend first by looping
    // through the props.relationships.tasks.data.
    props.relationships.tasks.data.forEach((element: TaskForTags) => {
      deleteTask(+element.id);
    });

    // when done, calling getTasks() to update the task panel
    getTasks();

    // delete the tag
    deleteTag(props.id);

    // update the tag list
    getTags();
  };

  /**
   * Deletes task on the backend.
   * @param {number} taskID - The ID of the task to be deleted.
   */
  const deleteTask = (taskID: number) => {
    (async () => {
      await axios
          .delete(`${ContainerClass.databaseLink}/tasks/${taskID}`)
          .then((resp) => {
            console.log(resp.status);
          })
          .catch((err) => {
            console.log(err);
          });
    })();
  };

  /**
   * Retrieves all the tasks from the backend and recursively calls itself
   * until the data on the mainPanel.data has been updated with the new data.
   */
  const getTasks = () => {
    // reloads the task list in the main section
    (async () => {
      await axios
          .get(`${ContainerClass.databaseLink}/labels`)
          .then((resp) => {
            const tasks = resp.data['included'];
            if (tasks.length === mainPanel.data.length) {
              // recursively call database until the currentList
              // has been updated
              getTasks();
            } else {
              dispatch(setTaskList(tasks));
              console.log('dispatched');
            }
          })
          .catch((err) => {
            console.log(err);
          });
    })();
  };

  /**
   * Deletes tag on the backend.
   * @param {number} tagID - The ID of the tag to be deleted.
   */
  const deleteTag = (tagID: number) => {
    (async () => {
      await axios
          .delete(`${ContainerClass.databaseLink}/labels/${tagID}`)
          .then((resp) => {
            console.log(resp.status);
          })
          .catch((err) => {
            console.log(err);
          });
    })();
  };

  /**
   * Retrieves all the tags from the backend and recursively calls itself
   * until the data on the mainPanel.data has been updated with the new data.
   */
  const getTags = () => {
    // reloads the task list in the main section
    (async () => {
      await axios
          .get(`${ContainerClass.databaseLink}/labels`)
          .then((resp) => {
            const tags = resp.data['data'];
            if (tags.length === leftPanel.allTags.length) {
              // recursively call database until the currentList
              // has been updated
              getTags();
            } else {
              dispatch(setAllTags(tags));
              console.log('set all tags');
            }
          })
          .catch((err) => {
            console.log(err);
          });
    })();
  };


  return (
    <div>
      <div className={classes.divTagButton}>
        <IconButton
          className={classes.deleteTagButton}
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          <TiDelete
            size={32}
            className={classes.trashCan}
          />
        </IconButton>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center">
            <Typography variant="h6" fontWeight="bold">
              "{props.attributes.title}" and all the tasks under it
              will be deleted
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2, mb: 2}}>
          You cannot undo this action.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => handleDeleteTaskEvent()}>
                Delete
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
            </Stack>
          </Grid>

        </Box>
      </Modal>
    </div>


  );
};

export default DeleteTagButton;
