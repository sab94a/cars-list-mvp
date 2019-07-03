// @flow

import React from 'react';
import qs from 'query-string';
import cx from 'classnames';
import Link from 'components/lib/Link';
import type { Paginator as Props } from 'components/lib/types';
import styles from './index.module.scss';

class Paginator extends React.PureComponent<Props> {
    static Query = 'page'
    static Titles = {
        First: 'First',
        Prev: 'Previous',
        Next: 'Next',
        Last: 'Last'
    }

    buildQuerySearch(page: number):?string {
        const { total, active } = this.props;

        if (page === active || page < 1 || page > total) {
            return null;
        }

        let params = qs.parse(window.location.search);

        return `?${qs.stringify({
            ...params,
            [Paginator.Query]: page
        })}`
    }

    renderLink(link: ?string, title:string) {
        return link ? (
            <Link className={ styles.link } href={ link }>{ title }</Link>
        ) : (
            <span className={ cx(styles.link, styles.disable) }>{ title }</span>
        )
    }

    render() {
        const { active, total } = this.props;

        return (
            <div className={ styles.root }>
                { this.renderLink(this.buildQuerySearch(1), Paginator.Titles.First) }
                { this.renderLink(this.buildQuerySearch(active - 1), Paginator.Titles.Prev) }
                <div className={ styles.content }>{`Page ${ active } of ${ total }`}</div>
                { this.renderLink(this.buildQuerySearch(active + 1), Paginator.Titles.Next) }
                { this.renderLink(this.buildQuerySearch(total), Paginator.Titles.Last) }
            </div>
        )
    }
}

export default Paginator;
