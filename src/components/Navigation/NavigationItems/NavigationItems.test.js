import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render three <NavigationItem /> elements if not authentificated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render four <NavigationItem /> elements if authentificated', () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(4);
  });

  it('should an exact signout button', () => {
    wrapper.setProps({ isAuth: true });
    expect(
      wrapper.contains(
        <NavigationItem link="/signout">Sign Out</NavigationItem>
      )
    ).toEqual(true);
  });
});
