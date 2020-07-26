import Vue from './libs/vue';

import '../stylesheets/master.css';

var app;

window.onload = () => {
    app = new Vue({
        el: "#app",
        data: {
            "currentView": "setFileServer"
        }
    })

    setFileServer();
    navBar();
}

const setFileServer = () => {
}

const releasePage = () => {
}

const navBar = () => {
    document.getElementById("testBtn").onclick = () => {
        app.currentView = "releasePage";

        setTimeout(() => {
            navBar();
        }, 500);
    }

    document.getElementById("testBtn1").onclick = () => {
        app.currentView = "setFileServer";

        setTimeout(() => {
            navBar();
        }, 500);
    }
}