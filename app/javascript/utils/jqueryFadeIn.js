import * as $ from 'jquery';

const jqueryFadeIn = (id, msg) => {
    document.getElementById(id).innerHTML = msg;
    $("#" + id).fadeIn();
    setTimeout(()=>{
        $("#" + id).fadeOut();
    }, 3000);
}

export default jqueryFadeIn