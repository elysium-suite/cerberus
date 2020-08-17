import React, { Component } from 'react'

import '../../stylesheets/nav.css'

export default class NavBar extends Component {
  render() {
    return (
      <div className="nav">
        <ul>
          <li
            id="setFileServer"
            onClick={() => {
              this.props.changeView('setFileServer')
            }}
          >
            <p>File Server</p>
          </li>
          <li
            id="vulnConfig"
            onClick={() => {
              this.props.changeView('vulnConfig')
            }}
          >
            <p>Vulnerabilities</p>
          </li>
          <li
            id="imageConfig"
            onClick={() => {
              this.props.changeView('imageConfig')
            }}
          >
            <p>Image Configs</p>
          </li>
          <li
            id="releasePage"
            onClick={() => {
              this.props.changeView('releasePage')
            }}
          >
            <p>Release Image</p>
          </li>
          <li
            id="settings"
            onClick={() => {
              this.props.changeView('settings')
            }}
          >
            <p>Settings</p>
          </li>
        </ul>
        <hr />
      </div>
    )
  }
}
