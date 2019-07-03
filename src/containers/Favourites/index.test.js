import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Main from 'components/pages/Main';
import * as selectors from '../../selectors';
import FavouritesContainer from './';

jest.mock('components/pages/Main');
jest.mock('../../selectors');
Main.mockImplementation(() => null);

const storeFake = state => {
    return {
        default: jest.fn(),
        subscribe: jest.fn(),
        dispatch: jest.fn(),
        getState: () => state,
    };
}; 

describe('container <Favourites />', () => {
    const ownProps = {
        history: {
            push: () => null
        },
        location: {
            search: '?ssss'
        }
    }

    let wrapper;
    let component;
    let container;

    beforeEach(() => {
        const store = storeFake({});

        wrapper = mount(
            <Provider store={ store }>
                <FavouritesContainer {...ownProps} />
            </Provider>
        );

        container = wrapper.find(FavouritesContainer);
        component = container.find(Main);
    });

    it('should render both the container and the component ', () => {
        expect(container.length).toBeTruthy();
        expect(component.length).toBeTruthy();
    });

    it('should map state to props', () => {
        const expectedPropKeys = [
            'cars',
            'colors',
            'manufacturers',
            'filters',
            'search',
            'sortings'
        ]; 

        expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    });

    it('should map dispatch to props', () => {
        const expectedPropKeys = [
            'init',
            'update',
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
