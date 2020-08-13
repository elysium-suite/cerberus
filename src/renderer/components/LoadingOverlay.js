import React, { Component } from 'react'
import { css } from '@emotion/core'
import BeatLoader from "react-spinners/BeatLoader"

export default class LoadingOverlay extends Component {
    render() {
        return (
            <div className={this.props.visible? "fullScreenLoaderContainerFadeIn" : "fullScreenLoaderContainerFadeOut"}>
                <div className="FullScreenLoader">
                    <BeatLoader size={18} color={getComputedStyle(document.documentElement).getPropertyValue("--primary")} loading={true}/>
                    <h1 className="fullScreenLoaderText">{this.props.message}</h1>
                </div>
            </div>
        )
    }
}
