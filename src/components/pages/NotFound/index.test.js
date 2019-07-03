import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import NotFound from './'

describe('<NotFound />', () => {
    it('Should render correctly', () => {
        const component = mount(<NotFound />)

        expect(toJson(component)).toMatchSnapshot();
    });
});
