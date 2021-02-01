import React from 'react';

import classes from './ToggleBtn.module.css';

const toggleBtn = props => (
  <div onClick={props.clicked} className={classes.ToggleBtn}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default toggleBtn;
