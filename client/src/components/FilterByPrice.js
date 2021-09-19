import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
const AirbnbSlider = withStyles({
  root: {
    color: "#3a8589",
    height: 3,
    maxWidth: 200,
    minWidth: 50,
    padding: "13px 0",
    align: "flex-start",
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -12,
    marginLeft: -13,
    boxShadow: "#ebebeb 0 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0 2px 3px 1px",
    },
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: "#d8d8d8",
    opacity: 1,
    height: 3,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

const FilterByPrice = ({ value, handleChange }) => {
  const classes = useStyles();
  const minP = Math.floor(Math.min(...value));
  const maxP = Math.ceil(Math.max(...value));

  return (
    <div className={classes.root}>
      <div className={classes.margin} />
      <Typography gutterBottom>
        <h5>Filter by Price:</h5>
      </Typography>
      <AirbnbSlider
        ValueLabelComponent={ValueLabelComponent}
        ThumbComponent={AirbnbThumbComponent}
        min={minP}
        max={maxP}
        defaultValue={[minP, maxP]}
        onChange={handleChange}
      />
    </div>
  );
};

export default FilterByPrice;
