import React from 'react';
import { shallow  } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './'

describe('container <App />', () => {
    const store = {
        default: jest.fn(),
        subscribe: jest.fn(),
        dispatch: jest.fn(),
        getState: () => {},
    };

    const routes = [{
        path: 'path_1',
        component: 'component_1'
    }, {
        path: 'path_2',
        component: 'component_2'
    }];

    const navigation = [{
        title: 'title_1',
        href: '/test'
    }, {
        title: 'title_2',
        href: '/test_2'
    }];

    const strings = { copyright: 'copyright' };

    it('Should render correctly', () => {
        const component = shallow (
            <App store={ store } routes={ routes } navigation={ navigation } strings={ strings } />
        )

        expect(toJson(component)).toMatchSnapshot();
    });
});
