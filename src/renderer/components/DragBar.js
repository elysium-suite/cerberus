import React, { Component } from 'react'

const { BrowserWindow } = require('electron').remote

export default class DragBar extends Component {
  constructor(props) {
    super(props)

    this.minControl = this.minControl.bind(this)
    this.maxControl = this.maxControl.bind(this)
    this.closeControl = this.closeControl.bind(this)
  }

  minControl() {
    const currentWindow = BrowserWindow.getFocusedWindow()
    currentWindow.minimize()
  }

  maxControl() {
    const currentWindow = BrowserWindow.getFocusedWindow()
    if (currentWindow.isMaximized()) {
      currentWindow.unmaximize()
    } else {
      currentWindow.maximize()
    }
  }

  closeControl() {
    const currentWindow = BrowserWindow.getFocusedWindow()
    currentWindow.close()
  }

  render() {
    return (
      <div className="appDragBar">
        <div className="windowControls" onClick={this.minControl}>
          <svg
            id="min"
            height={21}
            viewBox="0 0 21 21"
            width={21}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m5.029 10.429h14"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
            />
          </svg>
        </div>

        <div className="windowControls" onClick={this.maxControl}>
          <svg
            id="max"
            height={21}
            viewBox="0 0 21 21"
            width={21}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="matrix(-1 0 0 1 18 3)"
            >
              <path
                d="m9.5.5h-7c-1.1045695 0-2 .8954305-2 2v7c0 1.1045695.8954305 2 2 2h7c1.1045695 0 2-.8954305 2-2v-7c0-1.1045695-.8954305-2-2-2z"
                transform="matrix(0 1 -1 0 12 0)"
              />
              <path
                d="m11.5 15.5h2c1.1045695 0 2-.8954305 2-2v-7c0-1.1045695-.8954305-2-2-2h-7c-1.1045695 0-2 .8954305-2 2v2"
                transform="matrix(0 1 -1 0 20 0)"
              />
            </g>
          </svg>
        </div>

        <div className="windowControls" onClick={this.closeControl}>
          <svg
            id="close"
            height={21}
            viewBox="0 0 21 21"
            width={21}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(5 5)"
            >
              <path d="m.5 10.5 10-10" strokeWidth="1.3" />
              <path d="m10.5 10.5-10-10z" strokeWidth="1.3" />
            </g>
          </svg>
        </div>
      </div>
    )
  }
}
