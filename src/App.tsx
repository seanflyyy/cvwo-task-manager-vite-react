import './App.css';
import StyledPage from './pages/StyledPage';

import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material';
import {blue, orange} from '@mui/material/colors';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
});

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            // {/* <Route path="/styled" element={<StyledPage />} /> */}
            // {/* <Route path="/" element={<StyledPage />} /> */}
            // {/* <Route path="/" element={<Home />} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
