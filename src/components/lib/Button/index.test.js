import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from './'

describe('<Button />', () => {
    it('Should render correctly', () => {
        const component = mount(<Button />)

        expect(toJson(component)).toMatchSnapshot();
    });
});
