import unzipper from 'unzipper';
import request from 'request';
import fs from 'fs';
import axios from 'axios';
import * as $ from 'jquery';

import jqueryFadeIn from '../utils/jqueryFadeIn';

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

const defaultScoringConf = `
name = "ubuntu-18-supercool"
title = "CoolCyberStuff Practice Round"
user = "coolUser"
os = "Ubuntu 18.04"
remote = "https://192.168.1.100"
password = "HackersArentReal"
local = "yes"
enddate = "2020/03/21 15:04:05 PDT"
nodestroy = "yes"
`

const defaultReadMe = `
<p>
Uncomplicated Firewall (UFW) is the only company
approved Firewall for use on Linux machines at this time.
</p>
<p><b>Critical Services:</b></p>
    <ul>
        <li>OpenSSH Server (sshd)</li>
    </ul>
<h2>Authorized Administrators and Users</h2>
<pre>
<b>Authorized Administrators:</b>
coolUser (you)
    password: coolPassword
bob
    password: bob
<b>Authorized Users:</b>
coolFriend
awesomeUser
radUser
coolGuy
niceUser
superCoolDude
</pre>
`

const setFileServer = (app, fileSysBase) => {
    $("#status").fadeOut();

    document.getElementById("setServer").onclick = () => {
        var url = app.fileServerData.fileServerURL;
        var password = app.fileServerData.fileServerPassword;
        var os = process.platform;

        if(url != "" && password != ""){
            if(validURL(url)){
                axios({
                    method: "GET",
                    url: url + `?os=${os}&pass=${password}`,
                }).then(function(response){
                    var aeacusDir = os == "win32" ? "C:\\aeacus\\" : "/opt/aeacus/";

                    request(url + `?os=${os}&pass=${password}`).pipe(unzipper.Extract({ path: os == "win32" ? "C:\\" : "/opt/" })).on('close', ()=>{
                        if(fs.existsSync(aeacusDir)){
                            fs.copyFileSync(aeacusDir + "scoring.conf", os == "win32" ? "C:\\aeacus-win32\\scoring.conf" : "/opt/aeacus-linux/scoring.conf")
                            fs.copyFileSync(aeacusDir + "ReadMe.conf", os == "win32" ? "C:\\aeacus-win32\\ReadMe.conf" : "/opt/aeacus-linux/ReadMe.conf")
                            fs.rmdirSync(aeacusDir, {recursive: true});

                            fs.renameSync(os == "win32" ? "C:\\aeacus-win32" : "/opt/aeacus-linux", aeacusDir);
                        }else{
                            fs.renameSync(os == "win32" ? "C:\\aeacus-win32" : "/opt/aeacus-linux", aeacusDir);
                            fs.writeFileSync(aeacusDir + "scoring.conf", defaultScoringConf);
                            fs.writeFileSync(aeacusDir + "ReadMe.conf", defaultReadMe);
                        }
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

export default setFileServer