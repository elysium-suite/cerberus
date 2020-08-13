import React, { Component } from 'react'

export default class Settings extends Component {
    constructor(props){
        super(props);

        this.toggleDarkMode = this.toggleDarkMode.bind(this)
    }

    toggleDarkMode(evt){
        if (evt.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    render() {
        return (
            <div className="container">
                <h1 className="title">Settings</h1>

                <h2 className="titleSecondary">Dark Theme Toggle</h2>
                <label className="switch">
                    <input type="checkbox" onChange={this.toggleDarkMode}/>
                    <div>
                    <span />
                    </div>
                </label>
            </div>
        )
    }
}
