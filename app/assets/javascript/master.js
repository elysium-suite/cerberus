import Vue from "./libs/vue";

import "../stylesheets/master.css";
import "../stylesheets/nav.css"

var app;

window.onload = () => {
  app = new Vue({
    el: "#app",
    data: {
      currentView: "setFileServer"
    },
  });
    win.setIcon(path.join(__dirname, '/src/assets/logo-small.png'));
    setFileServer();
    navBar();
}

const setFileServer = () => {
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
