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

    main();
}

const main = () => {
    //Example transition
    document.getElementById("testBtn").onclick = () => {
        app.currentView = "releasePage";
    }
}