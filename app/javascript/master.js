import Vue from "./libs/vue";
import axios from 'axios';
import * as $ from 'jquery';
import fs from 'fs';
import unzipper from 'unzipper';
import request from 'request';

import "../stylesheets/master.css";
import "../stylesheets/nav.css"

var app;
var fileSysBase;

if(process.env.DEV == 1){
    fileSysBase = process.cwd() + "/app/"
}else{
    fileSysBase = process.cwd() + "/resources/app/app/"
}

window.onload = () => {
  app = new Vue({
    el: "#app",
    data: {
      currentView: "setFileServer",
      fileServerData: {
        fileServerURL: "",
        fileServerPassword: ""
      }
    }
  });

    setTimeout(() => {
        setFileServer();
    }, 500);
    navBar();
}

const setFileServer = () => {
    $("#status").fadeOut();

    document.getElementById("setServer").onclick = () => {
        var url = app.fileServerData.fileServerURL;
        var password = app.fileServerData.fileServerPassword;
        var os = process.platform;

        if(url != "" && password != ""){
            if(true){
                axios({
                    method: "GET",
                    url: url + `?os=${os}&pass=${password}`,
                }).then(function(response){
                    request(url + `?os=${os}&pass=${password}`).pipe(unzipper.Extract({ path: os == "win32" ? "C:\\" : "/opt/" })).on('close', ()=>{
                        fs.renameSync(os == "win32" ? "C:\\aeacus-win32" : "/opt/aeacus-linux", os == "win32" ? "C:\\aeacus" : "/opt/aeacus")
                    })
                })
                .catch(()=>{
                    jqueryFadeIn("status", 'Invalid Password')
                })
            }else{
                jqueryFadeIn("status", "URL is not valid")
            }
        }else{
            jqueryFadeIn("status", "One or more forms are empty");
        }
    }
}

const releasePage = () => {
}

const navBar = () => {
    var currentTransition;

    document.getElementById("setFileServer").onclick = () => {
        app.currentView = "";

        clearTimeout(currentTransition);
        currentTransition = setTimeout(()=>{
            app.currentView = "setFileServer";
        }, 500)
    }

    document.getElementById("vulnConfig").onclick = () => {
        app.currentView = "";

        clearTimeout(currentTransition);
        currentTransition = setTimeout(()=>{
            app.currentView = "vulnConfig";
        }, 500)
    }

    document.getElementById("imageConfig").onclick = () => {
        app.currentView = "";

        clearTimeout(currentTransition);
        currentTransition = setTimeout(()=>{
            app.currentView = "imageConfig";
        }, 500)
    }

    document.getElementById("releasePage").onclick = () => {
        app.currentView = "";

        clearTimeout(currentTransition);
        currentTransition = setTimeout(()=>{
            app.currentView = "releasePage";
        }, 500)
    }
}

const jqueryFadeIn = (id, msg) => {
    document.getElementById(id).innerHTML = msg;
    $("#" + id).fadeIn();
    setTimeout(()=>{
        $("#" + id).fadeOut();
    }, 3000);
}
