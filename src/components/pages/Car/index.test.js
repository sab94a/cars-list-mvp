import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Button from 'components/lib/Button';

import Car from './';

describe('<Car /> page component', () => {
    let init;
    let update;
    let addFavourite;
    let removeFavourite;
    let navigate;

    const car = {
        stockNumber: 1,
        title: 'My Super Car',
        image: 'image_car.png',
        description: 'description',
        isFavourite: false
    };

    let defaultProps;
    let component;

    const create = params => {
        component = mount(<Car { ...params } />);
    };

    beforeEach(() => {
        init = jest.fn();
        update = jest.fn();
        addFavourite = jest.fn();
        removeFavourite = jest.fn();
        navigate = jest.fn();

        defaultProps = {
            init,
            update,
            addFavourite,
            removeFavourite,
            navigate,
            car
        }
    });

    it('Should render correctly', () => {
        create({ ...defaultProps });

        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should call init after mount if car is absent', () => {
        create({ ...defaultProps, car: null }); 
        expect(init).toHaveBeenCalled();
    });

    it('Should NOT call init after mount if car is absent', () => {
        create({ ...defaultProps }); 
        expect(init).not.toHaveBeenCalled();
    });

    it('Should render banner with correct image', () => {
        const $image = component.find('.image');

        expect($image.prop('style')).toEqual({ backgroundImage: `url(${ car.image })`})
    });

    it('Should render correct title', () => {
        const $title = component.find('h1');
            
        expect($title.text()).toBe(car.title);
    });

    it('Should render correct description', () => {
        const $description = component.find('.description');
            
        expect($description.text()).toBe(car.description);
    });

    it('Should render Save Button if car is not Favourite', () => {
        create({ ...defaultProps });

        const $btn = component.find(Button);
        const cb = $btn.prop('onClick');

        cb();

        expect($btn.text()).toBe('Save');
        expect(addFavourite).toHaveBeenCalled();
    });

    it('Should render Remove Button if car is Favourite', () => {
        create({ ...defaultProps, car: { ...car, isFavourite: true } });
        
        const $btn = component.find(Button);
        const cb = $btn.prop('onClick');

        cb();

        expect($btn.text()).toBe('Remove');
        expect(removeFavourite).toHaveBeenCalled();
    });

    it('Should navigate to 404 if error was passed', () => {
        component.setProps({ ...defaultProps, error: 'error', car: null })

        expect(navigate).toHaveBeenCalled();
        expect(navigate).toHaveBeenCalledWith('/404');
    })
});
