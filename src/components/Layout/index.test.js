import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from './Header';
import Footer from './Footer';
import Layout from './';

describe('<Layout>', () => {
    const navigation = [{ href: '1', title: '1'}];
    const footerText = 'footerText';
    const children = 'text';

    let component = null;

    beforeEach(() => {
        component = shallow(
            <Layout navigation={ navigation } footerText={ footerText }>
                { children }
            </Layout>
        );
    });

    it('Should render correctly', () => {
        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should render Header correctly', () => {
        const nav = component.find(Header);

        expect(nav).toHaveLength(1);
        expect(nav.prop('navigation')).toEqual(navigation);
    });

    it('Should render Footer correctly', () => {
        const footer = component.find(Footer);
        
        expect(footer).toHaveLength(1);
        expect(footer.prop('children')).toEqual(footerText);
    });

    it('Should render child content correctly', () => {
        const main = component.find('main');

        expect(main).toHaveLength(1);
        expect(main.text()).toEqual(children);
    });
});
