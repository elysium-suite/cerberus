import process from 'process';

export const defaultScoringConf = `
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

export const defaultReadMe = `
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

export const aeacusDir = process.platform == "win32" ? "C:\\aeacus\\" : "/opt/aeacus/";

export const currentOS = process.platform

export const aeacusConfigFile = aeacusDir + "scoring.conf"

export const aeacusReadMeFile = aeacusDir + "ReadMe.conf"