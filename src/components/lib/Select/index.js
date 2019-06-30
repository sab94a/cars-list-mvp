// @flow

import React from 'react';
import cx from 'classnames';
import { SelectItem, Select as SelectType } from 'components/lib/types'
import styles from './index.module.scss';

export default class Select extends React.PureComponent<SelectType> {
    static placeholder = 'None';
    static clearSelectValue = '/';

    static defaultProps = {
        defaultValue: null,
        placeholder: Select.placeholder,
        options: [],
        onChange: () => null
    };

    state = {
        active: null,
        open: false
    }

    handlers = {}

    get emptyOption(){ 
        return {
            title: this.props.placeholder,
            value: Select.clearSelectValue
        }
    }

    get items() {
        return [this.emptyOption, ...this.props.options]
    };

    componentDidMount() {
        const { defaultValue } = this.props;

        if (defaultValue) {
            this.setState({
                active: this.findItem(defaultValue).title
            })
        }
    }

    findItem = (value:string) => {
        for (let item of this.props.options) {
            if (item.value === value) {
                return item;
            };
        }
        return this.emptyOption
    };

    bindClick(value: string) {
        if(!this.handlers[value]) {
            this.handlers[value] = (event: SyntheticEvent<*>) => {
                event.preventDefault();

                if (value === Select.clearSelectValue) {
                    this.props.onChange(false)
                } else {
                    this.props.onChange(value)
                }

                this.setState({
                    active: value,
                    open: false
                })
            }
        }
        return this.handlers[value]
    }

    togglePanel = (event: SyntheticEvent<*>) => {
        event.preventDefault();

        this.setState({ open: !this.state.open })
    }


    onBlur = () => {
        this.setState({ open: false })
    }

    render() {
        const { label, className } = this.props;
        const { open, active } = this.state;
        const selectedClasses = cx(styles.selected, { [styles.open]: open})

        return (
            <div className={ cx(className, styles.root) } tabIndex="0" onBlur={ this.onBlur }>
                { !!label && (
                    <div className={ styles.label }>{ label }</div> 
                )}
                <div className={ selectedClasses } onClick={ this.togglePanel }>
                    { this.findItem(active).title }
                </div>
                { open && (
                    <ul className={ styles.list}>
                        { this.items.map(({ value, title }: SelectItem) => (
                            <li 
                                key={ value } 
                                className={ styles.item }
                                onClick={ this.bindClick(value) }
                            >{ title }</li>
                        )) }
                    </ul> 
                )}
            </div>
        )
    }
}
