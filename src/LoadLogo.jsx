import React from 'react'

import Amazon from './Logo/Amazon.js'
import Apple from './Logo/Apple.js'
import Aqara from './Logo/Aqara.js'
import Cisco from './Logo/Cisco.js'
import Gitea from './Logo/Gitea.js'
import GitHub from './Logo/GitHub.js'
import GitLab from './Logo/GitLab.js'
import GLiNet from './Logo/GLiNet.js'
import Google from './Logo/Google.js'
import HomeAssistant from './Logo/HomeAssistant.js'
import HomeDepot from './Logo/HomeDepot.js'
import Microsoft from './Logo/Microsoft.js'
import Mqtt from './Logo/Mqtt.js'
import MSI from './Logo/MSI.js'
import Netgate from './Logo/Netgate.js'
import Netgear from './Logo/Netgear.js'
import NewEgg from './Logo/NewEgg.js'
import OpenAi from './Logo/OpenAi.js'
import Opensource from './Logo/Opensource.js'
import Reolink from './Logo/Reolink.js'
import Samsung from './Logo/Samsung.js'
import Shelly from './Logo/Shelly.js'
import Ubiquiti from './Logo/Ubiquiti.js'
import VsCode from './Logo/VsCode.js'
import Wellcube from './Logo/Wellcube.js'
import Xiaomi from './Logo/Xiaomi.js'

const svgMap = {
    Amazon,
    Apple,
    Aqara,
    Cisco,
    Gitea,
    GitHub,
    GitLab,
    GLiNet,
    Google,
    HomeAssistant,
    HomeDepot,
    Microsoft,
    Mqtt,
    MSI,
    Netgate,
    Netgear,
    NewEgg,
    OpenAi,
    Opensource,
    Reolink,
    Samsung,
    Shelly,
    Ubiquiti,
    VsCode,
    Wellcube,
    Xiaomi
}

export const logoNames = Object.freeze(Object.keys(svgMap))

const LoadLogo = ({ iconPath, w, h, fill, title }) => {

    const Icon = svgMap[iconPath]

    if(!Icon) {
        return null
    }

    return <Icon w={w} h={h} fill={fill} title={title} />
}

export default LoadLogo
