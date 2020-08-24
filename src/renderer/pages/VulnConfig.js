/* eslint no-plusplus: ["error", {"allowForLoopAfterthoughts": true}] */

import React, { Component } from 'react'
import { Collapse } from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import fs from 'fs'
import tomlify from 'tomlify'
import { aeacusConfigFile } from '../configs'

import Vulnerability from '../components/Vulnerability'

import '../../stylesheets/vulnConfig.css'

export default class VulnConfig extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonClicked: false,
      configFileFound: false,
      checks: null,
    }

    this.updateChecks = this.updateChecks.bind(this)
  }

  componentDidMount() {
    if (this.props.configFile !== null) {
      this.setState({
        configFileFound: true,
      })

      for (let i = 0; i < this.props.configFile.check.length; i++) {
        this.props.configFile.check[i].opened = false
        this.props.configFile.check[i].message =
          this.props.configFile.check[i].message === undefined
            ? 'No vulnerability message'
            : this.props.configFile.check[i].message
      }

      this.setState({
        checks: this.props.configFile.check,
      })
    }
  }

  updateChecks(index, newCheck) {
    const tempObj = [...this.state.checks]
    tempObj[index] = newCheck
    this.setState({ checks: tempObj })

    const newConfigFile = this.props.configFile
    const tempChecks = tempObj

    for (let i = 0; i < tempChecks.length; i++) {
      delete tempChecks[i].opened
    }

    newConfigFile.check = tempChecks
    this.props.setData('config', newConfigFile)

    fs.writeFileSync(aeacusConfigFile, tomlify(newConfigFile))
  }

  render() {
    if (this.state.configFileFound) {
      const checks = []

      this.state.checks.map((checkObj, index) => {
        checks.push(
          <div className="check" key={index}>
            <button
              className="vulnConfigButton"
              onClick={() => {
                const tempObj = [...this.state.checks]
                tempObj[index].opened = !tempObj[index].opened
                this.setState({ checks: tempObj })
              }}
            >
              {checkObj.message}
            </button>
            <Collapse isOpen={checkObj.opened}>
              <Vulnerability
                message={checkObj.message}
                points={checkObj.points}
                pass={checkObj.pass}
                index={index}
                updateChecks={this.updateChecks}
              />
            </Collapse>
          </div>
        )

        return null
      })

      return (
        <div className="container" style={{ maxWidth: '90vw' }}>
          <PerfectScrollbar>
            <h1 className="title">Vulnerability Config</h1>
            <div className="checksContainer">{checks}</div>
          </PerfectScrollbar>
        </div>
      )
    }
    return (
      <div className="container" style={{ maxWidth: '90vw' }}>
        <h1 className="title">Vulnerability Config</h1>
        <h2 className="errorMessage">Configuration file not found</h2>
      </div>
    )
  }
}
