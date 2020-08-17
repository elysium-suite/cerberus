import React, { Component } from 'react'

import '../../stylesheets/settings.css'

export default class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDarkMode: false,
    }

    this.toggleDarkMode = this.toggleDarkMode.bind(this)
  }

  componentDidMount() {
    if (sessionStorage.getItem('settingsState') !== null) {
      this.setState(JSON.parse(sessionStorage.getItem('settingsState')))
    }
  }

  componentWillUnmount() {
    sessionStorage.setItem('settingsState', JSON.stringify(this.state))
  }

  toggleDarkMode() {
    if (!this.state.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
      this.setState({
        isDarkMode: true,
      })
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      this.setState({
        isDarkMode: false,
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Settings</h1>

        <h2 className="titleSecondary">Dark Theme Toggle</h2>
        <label className="switch">
          <input
            type="checkbox"
            onChange={this.toggleDarkMode}
            checked={this.state.isDarkMode}
          />
          <div>
            <span />
          </div>
        </label>
      </div>
    )
  }
}
