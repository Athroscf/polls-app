import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Home } from './Home';
import Button from '../../components/UI/Button/Button';
import Typography from '../../components/UI/Typography/Typography';

configure({adapter: new Adapter()});

describe('<Home />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Home />);
    });

    it('should render 1 <Button /> element if not authenticated', () => {
        expect(wrapper.find(Button)).toHaveLength(1);
    });

    it('should render 2 <Typography /> element if not authenticated', () => {
        expect(wrapper.find(Typography)).toHaveLength(2);
    });

    it('should render 2 <Button /> elements if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(Button)).toHaveLength(2);
    });

    it('should render 1 <Typography /> elements if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(Typography)).toHaveLength(1);
    });
});