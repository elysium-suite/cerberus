import Vue from "./libs/vue";

import setFileServer from './pages/fileServer';

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
        setFileServer(app, fileSysBase);
    }, 500);

    navBar(app);
}

const navBar = () => {
    var currentTransition;

    document.getElementById("setFileServer").onclick = () => {
        app.currentView = "";

        clearTimeout(currentTransition);
        currentTransition = setTimeout(()=>{
            app.currentView = "setFileServer";
            setFileServer(app, fileSysBase);
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
