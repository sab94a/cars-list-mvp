import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Logo from './'

describe('<Logo />', () => {
    it('Should render correctly', () => {
        const component = mount(<Logo />)

        expect(toJson(component)).toMatchSnapshot();
    });
});
