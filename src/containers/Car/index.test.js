import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Car from 'components/pages/Car';
import * as selectors from '../../selectors';
import CarContainer from './';

jest.mock('components/pages/Car');
jest.mock('../../selectors');
Car.mockImplementation(() => null);

const storeFake = state => {
    return {
        default: jest.fn(),
        subscribe: jest.fn(),
        dispatch: jest.fn(),
        getState: () => state,
    };
}; 

describe('container <Car />', () => {
    const ownProps = {
        history: {
            push: () => null
        },
        match: {
            params: {}
        }
    }

    let wrapper;
    let component;
    let container;

    beforeEach(() => {
        const store = storeFake({});

        wrapper = mount(
            <Provider store={ store }>
                <CarContainer {...ownProps} />
            </Provider>
        );

        container = wrapper.find(CarContainer);
        component = container.find(Car);
    });

    it('should render both the container and the component ', () => {
        expect(container.length).toBeTruthy();
        expect(component.length).toBeTruthy();
    });

    it('should map state to props', () => {
        const expectedPropKeys = [
            'car',
            'error'
        ]; 

        expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys)); 
    });

    it('should map dispatch to props', () => {
        const expectedPropKeys = [
            'init',
            'addFavourite',
            'removeFavourite',
            'navigate'
        ]; 

        expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    });

    afterAll(() => {
        Main.mockRestore();
        selectors.mockRestore();
    })
});
