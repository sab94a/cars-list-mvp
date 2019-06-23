import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Link from 'components/lib/Link';
import Navigation from './';

const navigation = [{
    href: 'href',
    title: 'title'
}, {
    href: 'href2',
    title: 'title2'
}]

describe('<Navigation />', () => {
    let component = null
    
    beforeEach(() => {
        component = mount(<Navigation items={ navigation } />);
    });

    it('Should be rendered correctly', () => {
        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should render right amount of Link', () => {
        expect(component.find(Link)).toHaveLength(2);
    });
});
