import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Home Page</NavigationItem>
    <NavigationItem link="/burger-builder">Burger Builder</NavigationItem>
    {!props.isAuth ? null : (
      <NavigationItem link="/orders">My Orders</NavigationItem>
    )}
    {!props.isAuth ? (
      <NavigationItem link="/auth">Sign In</NavigationItem>
    ) : (
      <NavigationItem link="/signout">Sign Out</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
