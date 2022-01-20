import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {makeStyles} from '@mui/styles';
import {Grid, Paper} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { SketchPicker } from 'react-color';
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {ListItem, ListItemIcon} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { createTagOnDatabase } from '../../misc/database';
import axios from 'axios';
import * as ContainerClass from '../../misc/constants';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {setAllTags} from '../../features/leftPanel/left-panel-slice';




const useStyles = makeStyles(() => ({
  createTagButton: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    left: 0,
    height: '7%',
  },
  colorPicker: {
    paddingLeft: 27,
    paddingBottom: 10,
  },
  textField: {
    paddingRight: 17,
  }
}));

const style = {
  position: 'absolute' as const,
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 370,
  bgcolor: 'background.paper',
  // height: 230,
  // border: '2px solid #000',
  boxShadow: 24,
  p: 3,
};


const CreateTagButton: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openChild, setOpenChild] = React.useState(false);
  const [selectedColor, setColor] = React.useState('#ff5722');
  const [textFieldText, setText] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChildOpen = () => setOpenChild(true);
  const handleChildClose = () => setOpenChild(false);
  
  const dispatch = useAppDispatch();
  const leftPanel = useAppSelector(state => state.leftPanel);



  function getAllTags() {
    (async () => {
      await axios
        .get(`${ContainerClass.databaseLink}/labels`)
        .then(resp => {
          const tags = resp.data['data'];
          if (tags.length == leftPanel.allTags.length) {
            getAllTags();
          } else {
            dispatch(setAllTags(tags));
            console.log('Created tag');
          }
        })
        .catch(err => {
          console.log(err);
        });
    })();
  }
    

  function handleTextFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function createTag() {
    createTagOnDatabase({title: textFieldText, color: selectedColor});
    getAllTags();
    handleChildClose();
    handleClose();
  }

  const handleChangeComplete = (color: any) => {
    handleChildClose();
    setColor(color.hex);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className={classes.createTagButton}
        startIcon={<AddIcon />}
      >
        Create New Tag
      </Button>{' '}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h4" sx={{paddingLeft: 3.5, paddingBottom: 1}}>
              Create Tag
            </Typography>
            <ListItem> 
              
              <ListItemIcon>
                <IconButton onClick={handleChildOpen}>
                  <CircleIcon sx={{color: selectedColor, fontSize: 34}}/>
                </IconButton>
              </ListItemIcon>
              <div className={classes.textField}> 
              <TextField
                id="outlined-basic"
                label="Tag Name"
                variant="outlined"
                multiline
                value={textFieldText}
                onChange={handleTextFieldChange}
              />
              </div> 
              <Button onClick={createTag} variant="contained">
                <CheckCircleIcon sx={{fontSize: 30}}/>
              </Button>
              
            </ListItem>
            {openChild &&
            <div className={classes.colorPicker}>
                  <SketchPicker
                        color={selectedColor}
                        onChangeComplete={handleChangeComplete}
            />
            </div>}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateTagButton;
