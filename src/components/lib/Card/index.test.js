import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Card from './';

describe('<Card />', () => {
    let component;
    const image = './image';
    const title = 'title';
    const description = 'description';
    const footer = (<b>Footer</b>);

    const create = params => {
        component = mount(<Card { ...params } />);
    };

    it('Should render correctly default view', () => {
        create({ image, title, description, footer });

        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should render correctly loading state', () => {
        create({ loading: true });

        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should have correct image, title, description and footer', () => {
        create({ image, title, description, footer });

        const $image = component.find('.image');
        const $title = component.find('.title');
        const $description = component.find('.description');
        const $footer = component.find('.footer');

        expect($image.prop('style')).toEqual({ backgroundImage: `url(${image})`});
        expect($title.text()).toBe(title);
        expect($description.text()).toBe(description);
        expect($footer.contains(footer)).toBeTruthy();
    });

    it('Should render correct element type', () => {
        create({ loading: true, elemType: 'article' });

        expect(component.find('.root').type()).toBe('article')
    })
});
