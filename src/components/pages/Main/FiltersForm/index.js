//@flow 

import React from 'react';
import Select from 'components/lib/Select';
import Button from 'components/lib/Button';
import styles from './index.module.scss';

class FiltersForm extends React.PureComponent {
    static Titles = {
        Color: 'Color',
        Manufacturer: 'Manufacturer',
        Submit: 'Filter'
    }
    static Placeholders = {
        Color: 'All car colors',
        Manufacturer: 'All manufacturers'
    }
    render() {
        return (
            <form className={ styles.root }>
                <Select 
                    className={ styles.select } 
                    label={ FiltersForm.Titles.Color }
                    placeholder={ FiltersForm.Placeholders.Color }
                    options={[{ title: 'white', value: 1 }, { title: 'white 2', value: 2 }]} 
                />
                <Select 
                    className={ styles.select } 
                    label={ FiltersForm.Titles.Manufacturer }
                    placeholder={ FiltersForm.Placeholders.Manufacturer }
                    options={[{ title: 'white', value: 1 }, { title: 'white 2', value: 2 }]} 
                />
                <Button>{ FiltersForm.Titles.Submit }</Button>
            </form>
        )
    }
}

export default FiltersForm;
