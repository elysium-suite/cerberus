import React, { Component } from 'react'
import {aeacusConfigFile} from '../configs';
import tomlify from 'tomlify';

import "../../stylesheets/imageConfig.css"
import 'react-perfect-scrollbar/dist/css/styles.css';

import PerfectScrollbar from 'react-perfect-scrollbar'
import LoadingOverlay from '../components/LoadingOverlay';

export default class ImageConfig extends Component {
    constructor(props){
        super(props);

        this.state = {
            buttonClicked: false,
            configFileFound: false
        }

        this.updateInput = this.updateInput.bind(this)
        this.saveImageConfigs = this.saveImageConfigs.bind(this)
    }

    componentDidMount(){
        if(this.props.configFile != null){
            this.setState({
                configFileFound: true
            })

            Object.keys(this.props.configFile).forEach((item, index) => {
                if(item !== 'check'){
                    this.setState({
                        [item]: this.props.configFile[item]
                    })
                }
            })
        }
    }

    updateInput(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    saveImageConfigs(){
        this.setState({buttonClicked: true})

        var oldConfig = {...this.props.configFile}
        var numItems = 0;

        Object.keys(oldConfig).forEach((item, index) => {
            numItems++;
            if(item !== 'check'){
                oldConfig[item] = this.state[item];
            }

            if(numItems === Object.keys(oldConfig).length){
                require('fs').writeFileSync(aeacusConfigFile, tomlify(oldConfig));
                this.props.setData("config", oldConfig);
                setTimeout(()=>{
                    this.setState({buttonClicked: false})
                }, 1000)
            }
        })
    }

    render() {
        if(this.state.configFileFound){
            var configInputs = [];

            Object.keys(this.props.configFile).forEach((item, index) => {
                if(item !== 'check'){
                    configInputs.push(
                        <div key={item}>
                            <label className="imageConfig-label">{item.replace(/^\w/, c => c.toUpperCase())}</label>
                            <input type="text" className="imageConfig-input" name={item} onChange={this.updateInput} value={this.state[item] || ''}/>
                        </div>
                    )
                }
            })

            return (
                <div className="container" style={{maxWidth: '90vw'}}>
                    <PerfectScrollbar>
                        <h1 className="title">Image Configs</h1>
                        {configInputs}
                        <input className="imageConfig-button" type="submit" value="Save Configs" onClick={this.saveImageConfigs}/>
                    </PerfectScrollbar>

                    <LoadingOverlay visible={this.state.buttonClicked} message="Writing config to file"/>
                </div>
            )
        }else{
            return(
                <div className="container" style={{maxWidth: '90vw'}}>
                    <h1 className="title">Image Configs</h1>
                    <h2 className="errorMessage">Configuration file not found</h2>
                </div>
            )
        }
    }
}
