import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Footer from './';

describe('<Footer>', () => {
    let component = null;
    const text = 'Footer';

    beforeEach(() => {
        component = shallow(<Footer>{ text }</Footer>);
    });

    it('Should render correctly', () => {
        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should have right footer text', () => {
        expect(component.text()).toEqual(text);
    });
});
