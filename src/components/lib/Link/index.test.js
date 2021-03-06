import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Link from './'

describe('<Link />', () => {
    const href = '/path';
    const title = 'title'
    let component;

    const create = ({title, ...params}) => {
        component = mount(<Link { ...params }>{ title }</Link>);
    };

    it('Should render correctly', () => {
        create({ href, title });

        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should have right title', () => {
        create({ href, title });

        expect(component.text()).toEqual(title);
    });

    it('Should have right link', () => {
        create({ href, title });

        expect(component.find('a').prop('href')).toEqual(href);
    });

    it('Should have correct className', () => {
        const className = 'test';
        create({ href, title, className });

        expect(component.find('a').prop('className')).toEqual(expect.stringContaining(className));
    });

    it('Should pass extra props', () => {
        const target = '_blank';
        create({ href, title, target });

        expect(component.find('a').prop('target')).toEqual(target); 
    });
});
