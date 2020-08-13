import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/master.css";
import "../stylesheets/nav.css";
import "../stylesheets/fileServer.css";
import "../stylesheets/loadingOverlay.css";
import "../stylesheets/settings.css";

import DragBar from './components/DragBar';
import NavBar from './components/NavBar';

import SetFileServer from './components/SetFileServer';
import ReleasePage from './components/ReleasePage';
import ImageConfig from './components/ImageConfig';
import VulnConfig from './components/VulnConfig';
import Settings from './components/Settings';

export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            pageView: "setFileServer",
            visible: true,
            configFile: null,
            readMeFile: null
        }

        this.currentTransition = null
    }

    changeView(new_view){
        this.setState({
            visible: false
        })

        clearTimeout(this.currentTransition)
        this.currentTransition = setTimeout(()=>{
            this.setState({
                pageView: new_view,
                visible: true
            })
        }, 500);
    }

    setData(type, data){
        if(type == 'readme'){
            this.setState({
                readMeFile: data
            })
        }else{
            this.setState({
                configFile: data
            })
        }
    }

    render() {
        var currentView= "";

        switch (this.state.pageView) {
            case "setFileServer":
                currentView = <SetFileServer key="setFileServer" setData={this.setData.bind(this)}/>
                break;

            case "imageConfig":
                currentView = <ImageConfig key="imageConfig"/>
                break;

            case "releasePage":
                currentView = <ReleasePage key="releasePage"/>
                break;

            case "vulnConfig":
                currentView = <VulnConfig key="vulnConfig"/>
                break;

            case "settings":
                currentView = <Settings key="settings"/>
                break;

            default:
                currentView = <div></div>
                break;
        }

        return (
            <div className="appContainer">
                <DragBar/>
                <NavBar changeView={this.changeView.bind(this)}/>

                <div className={this.state.visible ? "transitionDiv fadeInView" : "transitionDiv fadeOutView"}>
                    {currentView}
                </div>
            </div>
        )
    }
}
