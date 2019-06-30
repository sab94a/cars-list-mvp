//@flow

import React from 'react';
import qs from 'query-string';

import type { PagesNavigation } from 'types/routes';
import type { CarView } from 'types/views';

import Card from 'components/lib/Card';
import Link from 'components/lib/Link';
import Select from 'components/lib/Select';
import Paginator from 'components/lib/Paginator';
import FiltersForm from 'components/pages/Main/FiltersForm';

import styles from './index.module.scss';

export type Props = {
    init: (params: mixed) => void,
    update: (params: mixed) => void,
    cars: Array<CarView>,
    carsLoading: boolean,
    navigation: PagesNavigation,
    location: Location 
}

class Main extends React.PureComponent<Props> {
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

    placeholder:Array<boolean> = new Array(10).fill(false);

    render() {
        const { 
            cars, 
            navigation: { 
                shownItems, 
                totalItems, 
                totalPages, 
                page 
            },
            carsLoading
        } = this.props;

        const isNotFound = !carsLoading && !cars.length;

        return (
            <div className={ styles.root }>
                <aside className={ styles.aside }>
                    <FiltersForm />
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
                            <Select label="Sort by" options={[{ title: 'white', value: 1 }, { title: 'white 2', value: 2 }]} />
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
                                    footer={
                                        <Link href={ item.link }>View details</Link>
                                    }
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
