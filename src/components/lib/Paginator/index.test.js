import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Paginator from './';


describe('<Paginator />', () => {
    let component;

    const { location } = window;

    const create = params => {
        component = mount(<Paginator { ...params } />);
    };

    const originalLocation = window.location;

    beforeEach(() => {
        delete window.location;

        window.location = {
            search: '',
        };
    });

    afterEach(() => {
        window.location = originalLocation;
    });

    it('Should render correctly', () => {
        create({ active: 2, total: 10 });
        
        const $content = component.find('.content');
        const $first = component.find('.root').childAt(0);
        const $prev = component.find('.root').childAt(1);
        const $next = component.find('.root').childAt(3);
        const $last = component.find('.root').childAt(4);

        expect($content.text()).toBe('Page 2 of 10');
        expect($first.text()).toBe(Paginator.Titles.First);
        expect($prev.text()).toBe(Paginator.Titles.Prev);
        expect($next.text()).toBe(Paginator.Titles.Next);
        expect($last.text()).toBe(Paginator.Titles.Last);


        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should have correct links', () => {
        create({ active: 3, total: 10 });

        const $first = component.find('.root').childAt(0);
        const $prev = component.find('.root').childAt(1);
        const $next = component.find('.root').childAt(3);
        const $last = component.find('.root').childAt(4);

        expect($first.prop('href')).toBe('?page=1');
        expect($prev.prop('href')).toBe('?page=2');
        expect($next.prop('href')).toBe('?page=4');
        expect($last.prop('href')).toBe('?page=10');
    });

    it('If location have other search, it should add page to current seach', () => {
        window.location.search = '?color=width';

        create({ active: 3, total: 10 });

        const $first = component.find('.root').childAt(0);

        expect($first.prop('href')).toBe('?color=width&page=1');

        window.location.search = '';
    })

    it('Should render SPAN instead of Link if active page 1', () => {
        create({ active: 1, total: 10 });

        const $first = component.find('.root').childAt(0);
        const $prev = component.find('.root').childAt(1);

        expect($first.type()).toBe('span');
        expect($prev.type()).toBe('span');
    });

    it('Should render SPAN instead of Link if active page is last', () => {
        create({ active: 1, total: 10 });

        const $next = component.find('.root').childAt(3);
        const $last = component.find('.root').childAt(4);

        expect($next.type()).toBe('span');
        expect($last.type()).toBe('span');
    });
});