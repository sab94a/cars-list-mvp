import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Main from 'components/pages/Main';
import * as selectors from './selectors';
import MainContainer from './';

jest.mock('components/pages/Main');
jest.mock('./selectors');
Main.mockImplementation(() => null);

const storeFake = state => {
    return {
        default: jest.fn(),
        subscribe: jest.fn(),
        dispatch: jest.fn(),
        getState: () => state,
    };
}; 

describe('container <Main />', () => {
    let wrapper;
    let component;
    let container;

    beforeEach(() => {
        const store = storeFake({});

        wrapper = mount(
            <Provider store={store}>
                <MainContainer />
            </Provider>
        );

        container = wrapper.find(MainContainer);
        component = container.find(Main);
    });

    it('should render both the container and the component ', () => {
        expect(container.length).toBeTruthy();
        expect(component.length).toBeTruthy();
    });

    it('should map state to props', () => {
        const expectedPropKeys = [
            'cars',
            'carsLoading',
            'navigation'
        ]; 

        expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    });

    afterAll(() => {
        Main.mockRestore();
        selectors.mockRestore();
    })
});
