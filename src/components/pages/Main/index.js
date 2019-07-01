//@flow

import React from 'react';
import qs from 'query-string';

import type { PagesNavigation } from 'types/routes';
import type { CarView, SelectView } from 'types/views';
import type { CarsFilters } from 'types/api';

import Card from 'components/lib/Card';
import Link from 'components/lib/Link';
import Select from 'components/lib/Select';
import Paginator from 'components/lib/Paginator';
import FiltersForm from 'components/pages/Main/FiltersForm';

import styles from './index.module.scss';

export type Props = {
    init: (params: mixed) => void,
    update: (params: mixed) => void,
    removeFavourite: (id: number) => void,
    cars: Array<CarView>,
    colors: Array<SelectView>,
    sortings: Array<SelectView>,
    manufacturers: Array<SelectView>,
    carsLoading: boolean,
    navigation: PagesNavigation,
    filters: CarsFilters,
    location: Location,
    history: History
}

class Main extends React.PureComponent<Props> {
    static SortLabel = 'Sort by';

    handlers = {};

    componentDidMount() {
        this.props.init(this.getParams())
    };

    componentDidUpdate({ location: { search: prevSearch } }: Props) {
        const { location: { search } } = this.props;

        if (search !== prevSearch) {
            this.props.update(this.getParams())
        }
    }

    getParams() {
        const { location: { search } } = this.props;
        const { page, manufacturer, color, sort } = qs.parse(search);

        return {
            page: page ? Number.parseInt(page) : 1, 
            manufacturer,
            color,
            sort
        };
    }

    onFilterChange = (params) => {
        const { location: { pathname }, history } = this.props

        let query = {}

        for(let key in params) {
            if(params[key]) {
                query[key] = params[key]
            }
        }

        query.page = 1

        history.push({
            pathname,
            search: `?${qs.stringify(query)}`
        })
    }

    onFilterFormSubmit = ({ manufacturer, color }) => {
        this.onFilterChange({
            ...this.getParams(),
            manufacturer,
            color
        })
    }

    onShorChange = (sort) => {
        this.onFilterChange({
            ...this.getParams(),
            sort
        })
    };

    bindRemoveClick = (carId: number) => {
        const { removeFavourite } = this.props;

        if(!this.handlers[carId]) {
            this.handlers[carId] = e => {
                e.preventDefault()

                removeFavourite(carId)
            }
        }
        return this.handlers[carId];
    }

    renderCarFooter(car: CarView) {
        return (
             <>
                <Link href={ car.link }>View details</Link>
                { car.isFavourite && (
                    <>
                        <span className={ styles.separator } />
                        <Link href="#" onClick={ this.bindRemoveClick(car.stockNumber) }>
                            Remove from favourites
                        </Link>
                    </>
                ) }
            </>
        )
    }

    placeholder:Array<boolean> = new Array(10).fill(false);

    render() {
        const { 
            cars,
            colors,
            sortings,
            manufacturers,
            navigation: { 
                shownItems, 
                totalItems, 
                totalPages, 
                page 
            },
            carsLoading,
            filters
        } = this.props;

        const isNotFound = !carsLoading && !cars.length;

        return (
            <div className={ styles.root }>
                <aside className={ styles.aside }>
                    <FiltersForm 
                        color={ filters.color }
                        colors={ colors }
                        manufacturer={ filters.manufacturer }
                        manufacturers={ manufacturers }
                        onSubmit={ this.onFilterFormSubmit }
                    />
                </aside>
                <div className={ styles.content }>
                    <div className={ styles.searchHeader}>
                        <div className={ styles.searchInfo}>
                            <h2>Available cars</h2>
                            <div className={ styles.searchResult}>
                                { `Showing ${ shownItems } of ${ totalItems } results` }
                            </div>
                        </div>
                        <div className={ styles.sort }>
                            <Select 
                                label={ Main.SortLabel }
                                value={ filters.sort }
                                options={ sortings }
                                onChange={ this.onShorChange }
                            />
                        </div>
                    </div>
                    { !isNotFound && (
                        <ul className={ styles.items }>
                            { !carsLoading && cars.map((item, index) => (
                                <Card 
                                    key={ index }
                                    elemType='li'
                                    title={ item.title }
                                    image={ item.image }
                                    description={ item.description }
                                    footer={this.renderCarFooter(item)}
                                />
                            ))}

                            { carsLoading && this.placeholder.map((item, index) => (
                                <Card key={ index } elemType='li' loading={ true } />
                            )) }
                        </ul>
                    ) }
                    
                    { isNotFound && (
                        <div className={ styles.notFound }>There is no avalible cars for your search.</div>
                    ) }

                    { !!totalPages && (
                        <Paginator 
                            active={ page } 
                            total={ totalPages } 
                        />
                    ) }
                </div>
            </div>
        )
    };
}

export default Main;
