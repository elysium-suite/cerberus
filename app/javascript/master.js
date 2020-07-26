import Vue from "./libs/vue";
import axios from 'axios';
import * as $ from 'jquery';

import "../stylesheets/master.css";
import "../stylesheets/nav.css"

var app;

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

        if(url != "" && password != ""){
            axios.post(url, {
                password: password
            })
            .then(() => {
                console.log("hey")
            })
            .catch(() => {
                jqueryFadeIn("status", "Error posting to server")
            })
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
