/* eslint-disable react/no-unescaped-entities */
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import * as ContainerClass from '../../misc/constants';
import {setTaskList} from '../../features/mainPanel/main-panel-slice';
import {SingleTag} from '../../model/tag';
import {deleteTag, deleteTask} from '../../misc/database';
import {SingleTaskItem} from '../../model/task';

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
    padding: 0,
  },
  trashCan: {
    //   paddingLeft: 30,
    color: '#F44E3B',
  },
  divTagButton: {
    paddingLeft: 0,
  },
}));

interface DeleteButtonInterface {
  tagData: SingleTag,
  hideButtons: Function,
}


const DeleteTagButton: React.FC<DeleteButtonInterface> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const leftPanel = useAppSelector((state) => state.leftPanel);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /**
 * Close modal completely
 */
  const closeModal = () => {
    props.hideButtons();
    handleClose();
  };
  /**
   * Deletes tasks under tag and the tag and updates the task list and tag list.
   */
  const handleDeleteTaskEvent = () => {
    deleteAllTasks();
    getTasks();
    closeModal();
    getTags();
  };

  const deleteAllTasks = () => {
    (async () => {
      await axios
          .get(`${ContainerClass.databaseLink}/labels`, {
            headers: {
              'Authorization': `token ${localStorage.getItem('token')}`,
            },
          })
          .then((resp) => {
            const filteredTasks = resp.data['included']
                .filter((element: SingleTaskItem) =>
                  element.attributes.label_id == props.tagData.id);
            filteredTasks.forEach((element: SingleTaskItem) => {
              deleteTask(+element.id);
            });
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
          .get(`${ContainerClass.databaseLink}/labels`, {
            headers: {
              'Authorization': `token ${localStorage.getItem('token')}`,
            },
          })
          .then((resp) => {
            const tasks = resp.data['included'];
            const filteredTasks = tasks
                .filter((element: SingleTaskItem) =>
                  element.attributes.label_id == props.tagData.id);
            if (filteredTasks.length > 0) {
              getTasks();
            } else {
              deleteTag(props.tagData.id);
              dispatch(setTaskList(tasks));
            }
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
          .get(`${ContainerClass.databaseLink}/labels`, {
            headers: {
              'Authorization': `token ${localStorage.getItem('token')}`,
            },
          })
          .then((resp) => {
            const tags = resp.data['data'];
            if (tags.length === leftPanel.allTags.length) {
              getTags();
            } else {
              dispatch(setAllTags(tags));
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
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={{
          alignItems: 'center',
          textAlign: 'center',
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center">
            <Typography variant="h6" fontWeight="bold">
              "{props.tagData.attributes.title}" and all the tasks under it
              will be deleted
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2, mb: 2}}>
          You cannot undo this action.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="error"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                onClick={handleDeleteTaskEvent}>
                Delete
              </Button>
            </Stack>
          </Grid>

        </Box>
      </Modal>
    </div>


  );
};

export default DeleteTagButton;
