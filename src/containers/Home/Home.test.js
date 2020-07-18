import React from 'react';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Home } from './Home';
import Button from '../../components/UI/Button/Button';

configure({adapter: new Adapter()});

describe('<Home />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Home />);
    });

    it('should render 1 <Button /> element if not authenticated', () => {
        expect(wrapper.find(Button)).toHaveLength(1);
    });

    it('should render 2 <Button /> elements if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(Button)).toHaveLength(2);
    });
});