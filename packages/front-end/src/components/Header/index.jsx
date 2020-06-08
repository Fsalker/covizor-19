import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  // root: {
  //   flexGrow: 1
  // },
  title: {
    flexGrow: 1
  }
}));

function Footer() {
  const classes = useStyles();

  return (
    <AppBar color={"inherit"} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Covizor-19 - Fresh nicely drawn charts of the outbreak
        </Typography>
        {/*<Button color="inherit">swoosh</Button>*/}
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
