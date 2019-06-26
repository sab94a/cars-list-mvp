//@flow

import React from 'react';

type Props = {
    fetchCars: () => void
}

class Main extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchCars();
    };

    render() {
        return (
            <div>Main</div>
        )
    };
}

export default Main;
