//@flow 

import React from 'react';
import Select from 'components/lib/Select';
import Button from 'components/lib/Button';
import styles from './index.module.scss';

export type Props = {
    color: string,
    manufacturer: string,
    colors: Array<string>,
    manufacturers: Array<string>
}

class FiltersForm extends React.PureComponent<Props> {
    static Titles = {
        Color: 'Color',
        Manufacturer: 'Manufacturer',
        Submit: 'Filter'
    }

    static Placeholders = {
        Color: 'All car colors',
        Manufacturer: 'All manufacturers'
    }

    static Fields = {
        Color: 'color',
        Manufacturer: 'manufacturer'
    }
    
    static defaultProps = {
        onSubmit: () => null
    }

    state = {
        color: '',
        manufacturer: ''
    }

    handlers = {}

    bindChange(field) {
        if(!this.handlers[field]) {
            this.handlers[field] = value => {
                this.setState({
                    [field]: value
                })
            }
        }
        return this.handlers[field];
    };

    onSubmit = e => {
        e.preventDefault();

        this.props.onSubmit(this.state)
    };

    componentDidMount() {
        const { color = '', manufacturer = '' } = this.props;

        this.setState({
            color,
            manufacturer
        })
    }

    componentDidUpdate({ color, manufacturer }) {
        if (this.props.color !== color) {
            this.setState({ color })
        }
        if (this.props.manufacturer !== manufacturer) {
            this.setState({ manufacturer })
        }
    }

    render() {
        const { colors, color, manufacturers, manufacturer } = this.props;

        return (
            <form className={ styles.root } onSubmit={ this.onSubmit }>
                <Select 
                    className={ styles.select } 
                    defaultValue={ color }
                    onChange={ this.bindChange(FiltersForm.Fields.Color) }
                    label={ FiltersForm.Titles.Color }
                    placeholder={ FiltersForm.Placeholders.Color }
                    options={ colors } 
                />
                <Select 
                    className={ styles.select } 
                    defaultValue={ manufacturer }
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
