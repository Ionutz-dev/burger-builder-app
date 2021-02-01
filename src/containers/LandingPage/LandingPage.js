import React from 'react';

import classes from './LandingPage.module.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { NavLink } from 'react-router-dom';

const landingPage = props => {
  return (
    <Aux>
      <div className={classes.LandingPage}>
        <h1 className={classes.h1}>Handcrafted burgers as you like</h1>
        <p className={classes.Info}>Order now your favorite burger!</p>
        <NavLink to="/burger-builder" className={classes.Link}>
          <strong>ORDER</strong>
        </NavLink>
      </div>
    </Aux>
  );
};

export default landingPage;
