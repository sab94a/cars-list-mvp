//@flow

import React from 'react';
import cx from 'classnames';

import type { CarView } from 'types/views';
import type { Match } from 'types/routes';

import Button from 'components/lib/Button';

import styles from './index.module.scss';

type Props = {
    car: CarView,
    getCar: number => void,
    match: Match,
    error: ?string,
    history: History
}

class Car extends React.PureComponent<Props> {
    componentDidMount() {
        const { getCar, car, match: { params } } = this.props;

        if(!car) {
            getCar(params.id)
        }
    }

    componentDidUpdate() {
        const { error, history } = this.props;

        if(error) {
            history.push('/404')
        }
    }

    get item() {
        return this.props.car || {}
    }

    render() {
        const car = this.item;
        const imageClass = cx(styles.image, { 
            [styles.hasImage]: car.image 
        });
        const imageStyles = { 
            backgroundImage: car.image ? `url(${ car.image })` : null 
        };


        return (
            <div className={ styles.root }>
                <div className={ imageClass } style={ imageStyles } />
                <div className={ styles.wrapper }>
                    <div className={ styles.content }>
                        <h1 className={ styles.title }>{ car.title }</h1>
                        <p className={ styles.description }>{ car.description }</p>
                        <p className={ styles.note }>
                            This car is currently available and can be delivered as soon as
                            tomorrow morning. Please be aware that delivery times shown in
                            this page are not definitive and may change due to bad weather
                            conditions.
                        </p>
                    </div>
                    <aside className={ styles.aside}>
                        <p>
                            If you like this car, click the button and
                            save it in your collection of favourite
                            items.
                        </p>
                        <Button>Save</Button>
                    </aside>
                </div>
            </div>
        )
    }
}

export default Car;
