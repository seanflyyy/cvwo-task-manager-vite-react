import * as ContainerClass from '../../misc/constants';
import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import {InputBase, Paper} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useAppDispatch} from '../../app/hooks';
import {setFilterKeyword} from '../../features/mainPanel/main-panel-slice';

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  justifyContent: 'flex-start',
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: ContainerClass.centerContainerWidth,
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 0),
  marginLeft: theme.spacing(2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  boxSizing: 'border-box',
  width: '100%',
  color: 'inherit',
  paddingLeft: '60px',
  margin: theme.spacing(0.5, 0, 0.5, 0),
}));

const SearchField: React.FC = () => {
  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // do the rest here
    console.log(e.nativeEvent.target);
    dispatch(setFilterKeyword(e.target.value));
  };

  return (
    // <Box sx={{ flexGrow: 1, backgroundColor: 'black' }}>
    <Paper elevation={3}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{'aria-label': 'search'}}
          onChange={onChange}
        />
      </Search>
    </Paper>
    // </Box>
  );
};

export default SearchField;
