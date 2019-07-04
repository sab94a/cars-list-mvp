import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Select from './';

describe('<Select />', () => {
    const value = 'value_1';
    const options = [{
        value: 'value_1',
        title: 'titile_1'
    }, {
        value: 'value_2',
        title: 'title_2'
    }];
    const placeholder = 'Placeholder';
    const label = 'Label';
    const className = 'extraClass';

    let onChange;
    let component;
    let defaultProps;

    beforeEach(() => {
        onChange = jest.fn();
        defaultProps = {
            value,
            options,
            placeholder,
            onChange,
            label,
            className
        };
    });

    const create = params => {
        component = mount(<Select { ...params } />);
    };

    it('Should render correctly', () => {
        create(defaultProps);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should render label if it passed', () => {
        const $label = component.find('.label');

        expect($label).toHaveLength(1);
        expect($label.text()).toBe(label);
    });

    it('Should NOT render label if it isn\'t passed', () => {
        create({ ...defaultProps, label: null });

        const $label = component.find('.label');
        expect($label).toHaveLength(0);
    });

    it('Should add extra ClassName to root container if it passed', () => {
        const $root = component.find('.root');

        expect($root.hasClass(className)).toBeTruthy();
    });

    it('If correct value passed, should render it\'s titile', () => {
        const option = options[0];

        create({ ...defaultProps, value: option.value });

        const $selected = component.find('.selected');

        expect($selected.text()).toEqual(option.title);
    });

    it('If it was passed incorrect value, should render placeholder', () => {
        create({ ...defaultProps, value: 'any_value' });
        const $selected = component.find('.selected');

        expect($selected.text()).toEqual(placeholder);
    });

    it('Should NOT render list of options by default', () => {
        create(defaultProps);

        expect(component.find('ul')).toHaveLength(0);
    });

    it('Should render list of options by select click', () => {
        create(defaultProps);
        const $selected = component.find('.selected');

        $selected.simulate('click');
        component.update();

        expect(component.find('ul')).toHaveLength(1);
    });

    it('Should render correct default option', () => {
        const $default = component.find('li').at(0);

        expect($default.text()).toBe(placeholder);
    });

    it('Should render correct options', () => {
        const $items = component.find('li');

        expect($items).toHaveLength(options.length + 1);

        for (let i = 1; i < $items.length; i++) {
            expect($items.at(i).text()).toBe(options[i - 1].title);
        };
    });

    it('Should call onChange callback with option value on click', () => {
        create(defaultProps);
        
        component.setState({ open: true });

        const index = 1;
        const $item = component.find('li').at(index);

        $item.simulate('click');

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledWith(options[index - 1].value);
    });

    it('Should call onChange callback with `null` on default option click', () => {
        create(defaultProps);
        
        component.setState({ open: true });

        const $item = component.find('li').at(0);

        $item.simulate('click');

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledWith(null);
    });

    it('Should close list of options after click', () => {
        expect(component.find('ul')).toHaveLength(0);
    });

    it('Should close list on selected click, if it is opened', () => {
        create(defaultProps);

        component.setState({ open: true });

        const $selected = component.find('.selected');

        $selected.simulate('click');
        component.update();

        expect(component.find('ul')).toHaveLength(0);
    });
});
