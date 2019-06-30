import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Card from 'components/lib/Card';
import Link from 'components/lib/Link';
import Paginator from 'components/lib/Paginator';
import Main from './';


describe('<Main /> page component', () => {
    let fetchData;
    const cars = new Array(10).fill(10).map((item, index) => ({
        stockNumber: 1,
        title: `title ${index}`,
        image: `image_${index}.png`,
        link: `?cars/${index}/`,
        description: `description_${index}`
    }));

    const navigation = {
        shownItems: 10,
        totalItems: 1000,
        totalPages: 100,
        page: 10
    };
    const location = {
        search: ''
    };

    let component;

    const create = params => {
        component = mount(<Main { ...params } />);
    };

    beforeEach(() => {
        fetchData = jest.fn();
    })

    it('Should render correctly', () => {
        create({ fetchData, cars, navigation, location, carsLoading: false });

        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should show correct search result', () => {
        const $search = component.find('.searchResult');

        expect($search.text()).toBe(`Showing ${ navigation.shownItems } of ${ navigation.totalItems } results`)
    });

    it('Should show render list correctly', () => {
        const $cards = component.find(Card)

        expect($cards).toHaveLength(cars.length)

        cars.forEach((item, index) => {
            const $card = $cards.at(index);

            expect($card.prop('title')).toBe(item.title);
            expect($card.prop('image')).toBe(item.image);
            expect($card.prop('description')).toBe(item.description);
            expect($card.contains(<Link href={ item.link }>View details</Link>)).toEqual(true);
        });
    });

    it('If loading, should render loading placeholder', () => {
        create({ fetchData, navigation, location, carsLoading: true });

        const $cards = component.find(Card);

        expect($cards).toHaveLength(cars.length);

        $cards.forEach((item, index) => {
            expect($cards.at(index).prop('loading')).toBe(true);
        });
    });

    it('Should render Paginator if component has pages', () => {
        const $paginator = component.find(Paginator);

        expect($paginator).toHaveLength(1);
        expect($paginator.prop('active')).toBe(navigation.page);
        expect($paginator.prop('total')).toBe(navigation.totalPages);
    });

    it('Shouldn\'t render paginator if pages are not passed', () => {
        create({ fetchData, navigation: { totalPages: 0 }, location, carsLoading: true });

        expect(component.find(Paginator)).toHaveLength(0);
    });

    it('Should render Not Found Node insted of cars correctly', () => {
        create({ fetchData, navigation: {}, cars: [], location, carsLoading: false });

        expect(component.find('.notFound')).toHaveLength(1);
    })
});
