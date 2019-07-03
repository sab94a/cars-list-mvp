import React from 'react';

import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Select from 'components/lib/Select';
import Button from 'components/lib/Button';

import FiltersForm from './';


describe('<FiltersForm />', () => {
    const color = 'white';
    const colors = [{
        value: 'black',
        title: 'black'
    }, {
        value: 'white',
        title: 'white'
    }];

    const manufacturer = 'value_2'
    const manufacturers = [{
        value: 'value_1',
        title: 'value_1'
    }, {
        value: 'value_2',
        title: 'value_2'
    }, {
        value: 'value_3',
        title: 'value_3'
    }];

    let onSubmit;
    let component;
    let defaultProps;

    const create = params => {
        component = mount(<FiltersForm { ...params } />);
    };

    beforeEach(() => {
        onSubmit = jest.fn();
        defaultProps = {
            color,
            colors,
            manufacturer,
            manufacturers,
            onSubmit
        }
    })

    it('Should render correctly', () => {
        create(defaultProps);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should render Color Select with correct params', () => {
        const $select = component.find(Select).at(0);

        expect($select.prop('value')).toBe(color);
        expect($select.prop('options')).toEqual(colors);
        expect($select.prop('label')).toBe(FiltersForm.Titles.Color);
        expect($select.prop('placeholder')).toBe(FiltersForm.Placeholders.Color);
    });

    it('Should render Manufacturer Select with correct params', () => {
        const $select = component.find(Select).at(1);

        expect($select.prop('value')).toBe(manufacturer);
        expect($select.prop('options')).toEqual(manufacturers);
        expect($select.prop('label')).toBe(FiltersForm.Titles.Manufacturer);
        expect($select.prop('placeholder')).toBe(FiltersForm.Placeholders.Manufacturer);
    });


    it('Should update FiltersForm state on Color Select change', () => {
        const $select = component.find(Select).at(0);
        const cb = $select.prop('onChange');
        const value = 'new color';

        cb(value);

        expect(component.state('color')).toBe(value);
    });

    it('Should update FiltersForm state on Manufacturer Select change', () => {
        const $select = component.find(Select).at(1);
        const cb = $select.prop('onChange');
        const value = 'new manufacturer';

        cb(value);

        expect(component.state('manufacturer')).toBe(value);
    });

    it('Should call onSubmit prop with state', () => {
        create(defaultProps);
        
        const state = {
            color: 'color',
            manufacturer: 'manufacturer'
        };
        const cb = component.find('form').prop('onSubmit');

        component.setState(state);

        cb({ preventDefault: () => null });

        expect(onSubmit).toHaveBeenCalled();
        expect(onSubmit).toHaveBeenCalledWith(state);
    })
});

