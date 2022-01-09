import StyledList from "../components/mainPanel/StyledList";
import RightPanel from "../components/rightPanel/RightPanel";
import LeftPanel from "../components/leftPanel/LeftPanel";
import React, { useState } from "react";
import { Typography, Grid } from "@mui/material";
import Typewriter from "typewriter-effect";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "../app/hooks";

const useStyles = makeStyles(() => ({
  page: {
    backgroundColor: "#D7EAE9",
    minHeight: "100vh",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  box: {
    marginLeft: "20px",
    flexDirection: "column",
    // justifyContent: 'center',
    // leftmargin: '20px',
    justifyContent: "center",
  },
  newDiv: {
    top: "50%",
    margin: "auto",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledPage: React.FC = () => {
  const rightPanelOpen = useAppSelector((state) => state.rightPanel);

  return (
    <Grid container direction="column">
      <LeftPanel />
      <Typography variant="h5" component="div" gutterBottom>
        <Typewriter
          options={{
            cursor: "",
          }}
          onInit={(typewriter) => {
            typewriter
              .changeDelay(80)
              .typeString("Welcome to your Task Manager!")
              .start();
          }}
        />
      </Typography>
      <br /> 
      <StyledList />

      <Grid
        container
        spacing={2}
        justifyContent="center"
        direction="row"
        paddingTop="20px"
      >

        {/* <Item> */}
        {/* </Item> */}
        
      </Grid>
      {rightPanelOpen.rightPanel && (
            <RightPanel />
        )}
    </Grid>
  );
};

export default StyledPage;
