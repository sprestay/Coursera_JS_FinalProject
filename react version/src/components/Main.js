import React, { Component } from 'react';
import Map from './Map';

class Main extends Component {
    render() {
        return (
            <div>
                <header className="header">
                    <h3 className='title'>Memoji</h3>
                </header>
                <Map />
            </div>
        );
    }
}

export default Main;