import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Toolbar from './Toolbar';
import NavigationItems from '../NavigationItems/NavigationItems';
import Typography from '../../UI/Typography/Typography';

configure({adapter: new Adapter()});

describe('<Toolbar />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Toolbar />);
    });

    it('should render two <NavigationItems /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItems)).toHaveLength(2);
    });

    it('should one <Typography /> element if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(Typography)).toHaveLength(1);
    });
});