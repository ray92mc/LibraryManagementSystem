import React, { Component } from 'react';

class HeaderComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
        }
    }
    componentDidMount(){
    }
    render() {
        return (
            <div>
                <header>
                    <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                        <div><a href="google.ie" className='navbar-brand'>Library Management Application</a></div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;