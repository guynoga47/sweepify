import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import IconLoad from "@material-ui/icons/Publish";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import GridContext from "../../../Context/grid-context";

const useStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

//prettier-ignore
const DataRow = ({ row }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const context = useContext(GridContext);
  const {convertAvailableStepsToBatteryCapacity, loadConfiguration} = context;

  const handleLoad = (path, config) => {
    loadConfiguration(config);
    context.updateState("userAlgorithmResult", {path});
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" component="th" scope="row">{row.name}</TableCell>
        <TableCell align="right">{row.avgRuntime}ms</TableCell>
        <TableCell align="right">{row.avgEfficiency}%</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Configurations
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">NAME</TableCell>
                    <TableCell align="left">DIMENSIONS</TableCell>
                    <TableCell align="right">BATTERY</TableCell>
                    <TableCell align="right">RUNTIME</TableCell>
                    <TableCell align="right">EFFICIENCY</TableCell>
                    <TableCell align="right">LOAD</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.configs.map(({cfgName, dimensions, runtime, efficiency,path, battery, cfg}) => (
                    <TableRow key={cfgName}>
                      <TableCell align="left">{cfgName}</TableCell>
                      <TableCell align="left">{dimensions}</TableCell>
                      <TableCell align="right">{convertAvailableStepsToBatteryCapacity(cfg.grid,battery)}%</TableCell>
                      <TableCell align="right">{runtime}</TableCell>
                      <TableCell align="right">{efficiency}%</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={()=>{handleLoad(path, cfg)}}>
                          <IconLoad/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default DataRow;