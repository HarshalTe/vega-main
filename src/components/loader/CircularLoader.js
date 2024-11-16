import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CircularLoader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <LinearProgress /> */}
      <CircularProgress color={props?.color ? props?.color : "secondary"} />
    </div>
  );
}
