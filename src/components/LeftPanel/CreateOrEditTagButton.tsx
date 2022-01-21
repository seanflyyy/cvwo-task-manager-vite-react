import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {makeStyles} from '@mui/styles';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {SketchPicker} from 'react-color';
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {ListItem, ListItemIcon} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {MdEdit} from 'react-icons/Md';
import {createTagOnDatabase, updateTag} from '../../misc/database';
import axios from 'axios';
import * as ContainerClass from '../../misc/constants';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {setAllTags} from '../../features/leftPanel/left-panel-slice';
import {SingleTag} from '../../model/tag';


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
  },
  editButton: {
    padding: 0,
  },
  editIcon: {
    color: 'blue',
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
interface EditOrCreateTagInterface {
  createOrEdit: string,
  tagData: SingleTag | null,
}


const CreateOrEditTagButton: React.FC<EditOrCreateTagInterface> = (props) => {
  const initialColor = props.createOrEdit == 'Create' ? '#ff5722' : props.tagData?.attributes.color;
  const initialText = props.createOrEdit == 'Create' ? '' : props.tagData?.attributes.title;
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openChild, setOpenChild] = React.useState(false);    
  const [selectedColor, setColor] = React.useState(initialColor);
  const [textFieldText, setText] = React.useState(initialText);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChildOpen = () => setOpenChild(true);
  const handleChildClose = () => setOpenChild(false);

  const dispatch = useAppDispatch();
  const leftPanel = useAppSelector((state) => state.leftPanel);

  /**
   * Gets all tags from database.
   */
  function getAllTags() {
    (async () => {
      await axios
          .get(`${ContainerClass.databaseLink}/labels`)
          .then((resp) => {
            const tags = resp.data['data'];
            
            if (props.createOrEdit == 'Create') {
              if (tags.length == leftPanel.allTags.length) {
                getAllTags();
              } else {
                dispatch(setAllTags(tags));
                console.log('Created tag');
              }
            } else {
              getAllTags();
              dispatch(setAllTags(tags));
            }
            
          })
          .catch((err) => {
            console.log(err);
          });
    })();
  }

  /**
   * Gets all tags from database.
   * @param {React.ChangeEventHandler<HTMLInputElement>} event - Event Handler
   */
  function handleTextFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  /**
   * Creates tags and updates main panel task list.
   * @param {React.ChangeEventHandler<HTMLInputElement>} event - Event Handler
   */
  function manageTag(textFieldText: string, selectedColor: string) {
    textFieldText = textFieldText.trim();
    props.createOrEdit == 'Create' 
    ? createTagOnDatabase({title: textFieldText, color: selectedColor})
    : updateTag(props.tagData!.id, {title: textFieldText, color: selectedColor});
    getAllTags();
    handleChildClose();
    handleClose();
    setText('');
  }


  const handleChangeComplete = (color: any) => {
    handleChildClose();
    setColor(color.hex);
  };

  return (
    <div>
      {props.createOrEdit == 'Create' ?
      <Button
        onClick={handleOpen}
        className={classes.createTagButton}
        startIcon={<AddIcon />}
      >
      Create New Tag
      </Button> :
      <IconButton
        className={classes.editButton}
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        <MdEdit size={28} className={classes.editIcon}/>
      </IconButton>}

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
              {props.createOrEdit == 'Create' ? 'CreateTask' : 'EditTask'}
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
              <Button onClick={() => manageTag(textFieldText!, selectedColor!)} variant="contained">
                <CheckCircleIcon sx={{fontSize: 30}}/>
              </Button>
            </ListItem>
            {openChild &&
            <div className={classes.colorPicker}>
              <SketchPicker
                color={props.createOrEdit == 'Create' ?
                selectedColor :
                props.tagData?.attributes.color}
                onChangeComplete={handleChangeComplete}
              />
            </div>}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateOrEditTagButton;
