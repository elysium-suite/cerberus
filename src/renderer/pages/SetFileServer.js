import React, { Component } from 'react'
import unzipper from 'unzipper';
import request from 'request';
import fs from 'fs';
import axios from 'axios';
import toml from 'toml';
import {aeacusDir, defaultReadMe, defaultScoringConf, currentOS, aeacusConfigFile, aeacusReadMeFile} from '../configs';

import "../../stylesheets/fileServer.css";
import "../..//stylesheets/status.css";

import LoadingOverlay from '../components/LoadingOverlay';

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

export default class SetFileServer extends Component {
    constructor(props){
        super(props);

        this.state = {
            fileServerURL: "",
            fileServerPassword: "",
            buttonClicked: false,
            statusVisible: false
        }

        this.handleStatus = this.handleStatus.bind(this)
        this.updateInput = this.updateInput.bind(this)
        this.getAeacus = this.getAeacus.bind(this)
    }

    updateInput(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleStatus(message){
        document.getElementsByClassName("status")[0].innerHTML = message;

        this.setState({
            statusVisible: true
        })
        setTimeout(()=>{
            this.setState({
                statusVisible: false
            })
        }, 5000)
    }

    getAeacus(){
        this.setState({
            buttonClicked: true
        })

        if(this.state.fileServerURL != "" && this.state.fileServerPassword != ""){
            if(validURL(this.state.fileServerURL)){
                console.log(this.state.fileServerURL + `?os=${currentOS}&pass=${this.state.fileServerPassword}`)
                axios({
                    method: "GET",
                    url: this.state.fileServerURL + `?os=${currentOS}&pass=${this.state.fileServerPassword}`,
                })
                .then(() => {
                    request(this.state.fileServerURL + `?os=${currentOS}&pass=${this.state.fileServerPassword}`).pipe(unzipper.Extract({ path: currentOS == "win32" ? "C:\\" : "/opt/" })).on('close', ()=>{
                        if(fs.existsSync(aeacusDir)){
                            fs.copyFileSync(aeacusConfigFile, currentOS == "win32" ? "C:\\aeacus-win32\\scoring.conf" : "/opt/aeacus-linux/scoring.conf")
                            fs.copyFileSync(aeacusReadMeFile, currentOS == "win32" ? "C:\\aeacus-win32\\ReadMe.conf" : "/opt/aeacus-linux/ReadMe.conf")
                            fs.rmdirSync(aeacusDir, {recursive: true});

                            fs.renameSync(currentOS == "win32" ? "C:\\aeacus-win32" : "/opt/aeacus-linux", aeacusDir);

                            this.props.setData("configFile", toml.parse(fs.readFileSync(aeacusConfigFile)))
                            this.props.setData("readme", fs.readFileSync(aeacusReadMeFile, "utf-8"))
                            this.props.changeView("imageConfig")

                            this.setState({
                                buttonClicked: false
                            })
                        }else{
                            fs.renameSync(currentOS == "win32" ? "C:\\aeacus-win32" : "/opt/aeacus-linux", aeacusDir);
                            fs.writeFileSync(aeacusConfigFile, defaultScoringConf);
                            fs.writeFileSync(aeacusReadMeFile, defaultReadMe);

                            this.props.setData("configFile", toml.parse(fs.readFileSync(aeacusConfigFile)))
                            this.props.setData("readme", fs.readFileSync(aeacusReadMeFile, "utf-8"))
                            this.props.changeView("imageConfig")

                            this.setState({
                                buttonClicked: false
                            })
                        }
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    this.handleStatus('Invalid Password')
                    this.setState({
                        buttonClicked: false
                    })
                })
            }else{
                this.handleStatus("URL is not valid")
                this.setState({
                    buttonClicked: false
                })
            }
        }else{
            this.handleStatus("One or more forms are empty")
            this.setState({
                buttonClicked: false
            })
        }
    }

    render() {
        return (
            <div className="container">
                <h1 className="title">Set File Server</h1>
                <input className="input-server" placeholder="File Server URL" name="fileServerURL" type="text" onChange={this.updateInput}/>
                <br />
                <input className="input-server" placeholder="Password" name="fileServerPassword" type="password" onChange={this.updateInput}/>
                <br />
                <button className="server-button" type="submit" onClick={this.getAeacus}>Get Aeacus</button>
                <h3 className={this.state.statusVisible ? "fadeInStatus status" : "fadeOutStatus status"} />

                <LoadingOverlay visible={this.state.buttonClicked} message="Retrieving Aeacus"/>
            </div>
        )
    }
}
