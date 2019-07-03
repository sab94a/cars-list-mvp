import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { CARS_PER_PAGE } from 'constants/api';

import Card from 'components/lib/Card';
import Link from 'components/lib/Link';
import Select from 'components/lib/Select';
import Paginator from 'components/lib/Paginator';
import FiltersForm from 'components/pages/Main/FiltersForm';
import Main from './';


describe('<Main /> page component', () => {
    let init;
    let update;
    let removeFavourite;
    let navigate;

    const cars = new Array(10).fill(10).map((item, index) => ({
        stockNumber: index,
        title: `title ${index}`,
        image: `image_${index}.png`,
        link: `?cars/${index}/`,
        description: `description_${index}`,
        isFavourite: index == 2 || index == 6 ? true : false
    }));

    const colors = [{
        value: 'black',
        title: 'black'
    }, {
        value: 'white',
        title: 'white'
    }];

    const sortings = [{
        value: 'des',
        title: 'asc'
    }];

    const manufacturers = [{
        value: 'value 1',
        title: 'value 1'
    }, {
        value: 'value 2',
        title: 'value 2'
    }, {
        value: 'value 3',
        title: 'value 3'
    }];

    const navigation = {
        shownItems: 10,
        totalItems: 1000,
        totalPages: 100,
        page: 10
    };

    const filters = {
        color: '',
        sortings: '',
        manufacturers: ''
    }

    const search = '';

    let defaultProps;
    let component;

    const create = params => {
        component = mount(<Main { ...params } />);
    };

    beforeEach(() => {
        init = jest.fn();
        update = jest.fn();
        removeFavourite = jest.fn();
        navigate = jest.fn();

        defaultProps = {
            init,
            update,
            removeFavourite,
            navigate,
            cars,
            colors,
            sortings,
            manufacturers,
            navigation,
            filters,
            search
        }
    })

    it('Should render correctly', () => {
        create({ ...defaultProps });

        expect(toJson(component)).toMatchSnapshot();
    });

    it('Should call init with correct params', () => {
        create({ ...defaultProps, search: '?page=1&color=white' });

        expect(init).toHaveBeenCalledTimes(1);
        expect(init).toHaveBeenCalledWith({ page: 1, color: 'white' });
    });

    it('Should call update with correct props', () => {
        create({ ...defaultProps, search: '?page=1&color=white' });

        component.setProps({ search: '?page=1&color=white&sort=asc' })

        expect(update).toHaveBeenCalledWith({ page: 1, color: 'white', sort: 'asc' });
    })

    it('Should show correct search result with navigation', () => {
        const $search = component.find('.searchResult');

        expect($search.text()).toBe(`Showing ${ navigation.shownItems } of ${ navigation.totalItems } results`)
    });

    it('Should show render list correctly', () => {
        create({ ...defaultProps });

        const $cards = component.find(Card)

        expect($cards).toHaveLength(cars.length)

        cars.forEach((item, index) => {
            const $card = $cards.at(index);

            expect($card.prop('title')).toBe(item.title);
            expect($card.prop('image')).toBe(item.image);
            expect($card.prop('description')).toBe(item.description);
            expect($card.contains(<Link href={ item.link }>View details</Link>)).toEqual(true);

            if (item.isFavourite) {
                const $removeLink = $card.find(Link).at(1);
                expect($removeLink.text()).toBe('Remove from favourites')
            }
        });
    });

    it('If loading is passed and previous cars are absent, should render loading placeholder', () => {
        create({ ...defaultProps, cars: [], carsLoading: true });

        const $cards = component.find(Card);

        expect($cards).toHaveLength(CARS_PER_PAGE);

        $cards.forEach((item, index) => {
            expect($cards.at(index).prop('loading')).toBe(true);
        });
    });

    it('If cars are absent and loading is nor passed, hould render Not Found Message', () => {
        create({ ...defaultProps, cars: [] });

        expect(component.find('.notFound')).toHaveLength(1)
    })

    it('Should render Paginator if component has havigation', () => {
        create({ ...defaultProps });

        const $paginator = component.find(Paginator);

        expect($paginator).toHaveLength(1);
        expect($paginator.prop('active')).toBe(navigation.page);
        expect($paginator.prop('total')).toBe(navigation.totalPages);
    });

    it('Shouldn\'t render paginator if navigation is not passed', () => {
        create({ ...defaultProps, navigation: null });

        expect(component.find(Paginator)).toHaveLength(0);
    });

    it('Should render Filter Form correctly', () => {
        const color = 'white';
        const manufacturer = 'value 2';

        create({ ...defaultProps, filters: { color, manufacturer } });

        const $filterForm = component.find(FiltersForm);

        expect($filterForm).toHaveLength(1);
        expect($filterForm.prop('color')).toEqual(color);
        expect($filterForm.prop('colors')).toEqual(colors);
        expect($filterForm.prop('manufacturer')).toEqual(manufacturer);
        expect($filterForm.prop('manufacturers')).toEqual(manufacturers);
    });

    it('Should submit Filter Form correctly', () => {
        const color = 'black';
        const manufacturer = 'value_1';

        create({ ...defaultProps, filters: { color, manufacturer } });

        const $filterForm = component.find(FiltersForm);
        const submit = $filterForm.prop('onSubmit')

        submit({ color, manufacturer});

        expect(navigate).toHaveBeenCalledWith({
            search: `?color=${color}&manufacturer=${manufacturer}&page=1`
        });
    });

    it('Should render Sort Select correctly', () => {
        const sort = 'asc';

        create({ ...defaultProps, filters: { sort } });

        const $sortSelect = component.find('.searchHeader').find(Select);

        expect($sortSelect).toHaveLength(1);
        expect($sortSelect.prop('value')).toEqual(sort);
        expect($sortSelect.prop('options')).toEqual(sortings);
        expect($sortSelect.prop('label')).toEqual(Main.SortLabel);
    });

    it('Should submit Sort Select correctly', () => {
        const sort = 'asc';

        create({ ...defaultProps, filters: { sort } });

        const $sortSelect = component.find('.searchHeader').find(Select);
        const submit = $sortSelect.prop('onChange')

        submit(sort);

        expect(navigate).toHaveBeenCalledWith({
            search: `?page=1&sort=${sort}`
        });
    });

    it('Should remove Favourite Card correctly', () => {
        create({ ...defaultProps });

        const $card = component.find(Card).at(2);
        const $removeLink = $card.find(Link).at(1);
        const submit = $removeLink.prop('onClick');

        submit({ preventDefault: () => null });

        expect(removeFavourite).toHaveBeenCalledWith(cars[2].stockNumber);
    });
});
