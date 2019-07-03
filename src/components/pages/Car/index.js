//@flow

import React from 'react';
import cx from 'classnames';

import type { CarView } from 'types/views';
import Button from 'components/lib/Button';
import styles from './index.module.scss';

type Props = {
    car: CarView,
    init: () => void,
    addFavourite: () => void,
    removeFavourite: () => void,
    navigate: (path: string) => void,
    error: ?string
}

class Car extends React.PureComponent<Props> {
    componentDidMount() {
        const { init, car } = this.props;

        if(!car) {
            init()
        }
    }

    componentDidUpdate() {
        const { error, navigate, car } = this.props;

        if(error && !car) {
            navigate('/404')
        }
    }

    get item() {
        return this.props.car || {}
    }

    render() {
        const { addFavourite, removeFavourite } = this.props;
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
                        { car.isFavourite ? (
                            <>
                                <p>
                                    This car is actually in your collection. You can remove it. 
                                </p>
                                <Button onClick={ removeFavourite }>Remove</Button>
                            </>
                        ) : (
                            <>  
                                <p>
                                    If you like this car, click the button and
                                    save it in your collection of favourite
                                    items.
                                </p>
                                <Button onClick={ addFavourite }>Save</Button>
                            </>
                        ) }
                    </aside>
                </div>
            </div>
        )
    }
}

export default Car;
