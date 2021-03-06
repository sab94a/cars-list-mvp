//@flow 

import React from 'react';
import Select from 'components/lib/Select';
import Button from 'components/lib/Button';

import type { SelectView } from 'types/views';

import styles from './index.module.scss';

export type State = {
    color?: ?string,
    manufacturer?: ?string
};

export type Props = {
    color?: ?string,
    colors: Array<SelectView>,
    manufacturer?: ?string,
    manufacturers: Array<SelectView>,
    onSubmit: (value: State) => void
};

class FiltersForm extends React.PureComponent<Props, State> {
    static Titles = {
        Color: 'Color',
        Manufacturer: 'Manufacturer',
        Submit: 'Filter'
    };

    static Placeholders = {
        Color: 'All car colors',
        Manufacturer: 'All manufacturers'
    };

    static Fields = {
        Color: 'color',
        Manufacturer: 'manufacturer'
    };
    
    state = {
        color: this.props.color,
        manufacturer: this.props.manufacturer
    }

    handlers = {};

    bindChange(field: string) {
        if(!this.handlers[field]) {
            this.handlers[field] = (value: string) => {
                this.setState({
                    [field]: value
                });
            };
        };
        return this.handlers[field];
    };

    onSubmit = (e:SyntheticEvent<*>) => {
        e.preventDefault();

        this.props.onSubmit(this.state);
    };

    componentDidUpdate(prevProps:Props) {
        // I know about this article https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state
        // But I think that in this expamle it's probably only one solution
        // Because we should have it's own state and we should update state, when props changed
        // For example if props changed from Url Query params

        const { color, manufacturer } = this.props;

        let state = {};

        if (color !== prevProps.color) {
            state.color = color;
        };

        if (manufacturer !== prevProps.manufacturer) {
            state.manufacturer = manufacturer;
        };

        if(Object.keys(state).length) {
            this.setState(state);
        };
    }

    render() {
        const { colors, manufacturers } = this.props;
        const { color, manufacturer } = this.state;

        return (
            <form className={ styles.root } onSubmit={ this.onSubmit }>
                <Select 
                    className={ styles.select } 
                    value={ color }
                    onChange={ this.bindChange(FiltersForm.Fields.Color) }
                    label={ FiltersForm.Titles.Color }
                    placeholder={ FiltersForm.Placeholders.Color }
                    options={ colors } 
                />
                <Select 
                    className={ styles.select } 
                    value={ manufacturer }
                    onChange={ this.bindChange(FiltersForm.Fields.Manufacturer) }
                    label={ FiltersForm.Titles.Manufacturer }
                    placeholder={ FiltersForm.Placeholders.Manufacturer }
                    options={ manufacturers } 
                />
                <Button type='submit'>{ FiltersForm.Titles.Submit }</Button>
            </form>
        )
    }
}

export default FiltersForm;
