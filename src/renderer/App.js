import React, { Component } from 'react'
import fs from 'fs'
import toml from 'toml'
import { aeacusConfigFile, aeacusReadMeFile, aeacusDir } from './configs'

import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/master.css'
import '../stylesheets/page.css'
import '../stylesheets/fadeAnimation.css'

import DragBar from './components/DragBar'
import NavBar from './components/NavBar'

import SetFileServer from './pages/SetFileServer'
import ReleasePage from './pages/ReleasePage'
import ImageConfig from './pages/ImageConfig'
import VulnConfig from './pages/VulnConfig'
import Settings from './pages/Settings'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageView: '',
      visible: true,
      configFile: null,
      readMeFile: null,
    }

    this.currentTransition = null
    this.changeView = this.changeView.bind(this)
    this.setData = this.setData.bind(this)
  }

  componentDidMount() {
    if (
      fs.existsSync(aeacusDir) &&
      fs.existsSync(aeacusConfigFile) &&
      fs.existsSync(aeacusReadMeFile)
    ) {
      this.setData('configFile', toml.parse(fs.readFileSync(aeacusConfigFile)))
      this.setData('readme', fs.readFileSync(aeacusReadMeFile, 'utf-8'))
      this.changeView('imageConfig')
    } else {
      this.changeView('setFileServer')
    }
  }

  changeView(newView) {
    this.setState({
      visible: false,
    })

    clearTimeout(this.currentTransition)
    this.currentTransition = setTimeout(() => {
      this.setState({
        pageView: newView,
        visible: true,
      })
    }, 500)
  }

  setData(type, data) {
    if (type === 'readme') {
      this.setState({
        readMeFile: data,
      })
    } else {
      this.setState({
        configFile: data,
      })
    }
  }

  render() {
    let currentView = ''

    switch (this.state.pageView) {
      case 'setFileServer':
        currentView = (
          <SetFileServer
            key="setFileServer"
            setData={this.setData.bind(this)}
            changeView={this.changeView.bind(this)}
          />
        )
        break

      case 'imageConfig':
        currentView = (
          <ImageConfig
            key="imageConfig"
            setData={this.setData.bind(this)}
            configFile={this.state.configFile}
            readMeFile={this.state.readMeFile}
          />
        )
        break

      case 'releasePage':
        currentView = <ReleasePage key="releasePage" />
        break

      case 'vulnConfig':
        currentView = <VulnConfig key="vulnConfig" />
        break

      case 'settings':
        currentView = <Settings key="settings" />
        break

      default:
        currentView = <div></div>
        break
    }

    return (
      <div className="appContainer">
        <DragBar />
        <NavBar changeView={this.changeView.bind(this)} />

        <div
          className={
            this.state.visible
              ? 'transitionDiv fadeInView'
              : 'transitionDiv fadeOutView'
          }
        >
          {currentView}
        </div>
      </div>
    )
  }
}
