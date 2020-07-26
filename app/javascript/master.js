import Vue from "./libs/vue";

import "../stylesheets/master.css";

var app;

window.onload = () => {
  app = new Vue({
    el: "#app",
    data: {
      currentView: "setFileServer",
    },
  });

  main();
};

const main = () => {
  document.getElementById("setFileServer").onclick = () => {
    app.currentView = "setFileServer";
  };

  document.getElementById("releasePage").onclick = () => {
    app.currentView = "releasePage";
  };

  document.getElementById("imageConfig").onclick = () => {
    app.currentView = "imageConfig";
  };

  document.getElementById("vulnConfig").onclick = () => {
    app.currentView = "vulnConfig";
  };
};
