import * as React from 'react';
import * as ContainerClass from '../../misc/constants';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useAppDispatch} from '../../app/hooks';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {handleLogout} from '../../features/auth/auth-slice';
import {makeStyles} from '@mui/styles';

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const useStyles = makeStyles(() => ({
  avatar: {
    // height: '100%',
    width: '52%',
    position: 'fixed',
    top: 0,
    right: 0,
    overflowX: 'hidden',
    flexDirection: 'column',
  },
}));

const AvatarWidget: React.FC = () => {
  const [anchorElUser, setAnchorElUser] =
  React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  /**
   * Handles the logout button click
   */
  function handleLogoutClick() {
    axios.delete(`${ContainerClass.databaseLink}/logout`, {
      withCredentials: true,
      headers: {
        'Authorization': `token ${localStorage.getItem('token')}`,
      },
    })
        .then((response) => {
          dispatch(handleLogout());
          navigate('/login');
        }).catch((error) => {
          console.log(error);
        });
  }

  return (
    <Box className={classes.avatar} sx={{flexGrow: 0}}>
      <br />
      <br />
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
          <Avatar/>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{mt: '45px'}}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key={'Logout'} onClick={handleLogoutClick}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
        {/* {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))} */}
      </Menu>
    </Box>
  );
};
export default AvatarWidget;
