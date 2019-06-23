import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Link } from 'react-router-dom';
import Navigation from 'components/lib/Navigation';
import Logo from 'components/lib/Logo';
import Header from './';

const navigation = [{ href: '', title: ''}];

describe('<Header>', () => {
    let component =  null

    beforeEach(() => {
        component = shallow(<Header navigation={ navigation } />)
    });

    it('Should render correctly', () => {
        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should has Logo, Link and Navigation with right props', () => {
        const LogoComponent = component.find(Logo);
        const LinkComponent = component.find(Link);
        const NavigationComponent = component.find(Navigation);

        expect(LogoComponent).toHaveLength(1);
        expect(LinkComponent).toHaveLength(1);
        expect(NavigationComponent).toHaveLength(1);
        expect(NavigationComponent.prop('items')).toEqual(navigation);
    });
});
