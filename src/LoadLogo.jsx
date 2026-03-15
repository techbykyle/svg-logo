import React from 'react'

import Amazon from './Logo/Amazon'
import Apple from './Logo/Apple'
import Aqara from './Logo/Aqara'
import Cisco from './Logo/Cisco'
import Gitea from './Logo/Gitea'
import GitHub from './Logo/GitHub'
import GitLab from './Logo/GitLab'
import GLiNet from './Logo/GLiNet'
import Google from './Logo/Google'
import HomeAssistant from './Logo/HomeAssistant'
import HomeDepot from './Logo/HomeDepot'
import Microsoft from './Logo/Microsoft'
import Mqtt from './Logo/Mqtt'
import MSI from './Logo/MSI'
import Netgate from './Logo/Netgate'
import Netgear from './Logo/Netgear'
import NewEgg from './Logo/NewEgg'
import OpenAi from './Logo/OpenAi'
import Opensource from './Logo/Opensource'
import Reolink from './Logo/Reolink'
import Samsung from './Logo/Samsung'
import Shelly from './Logo/Shelly'
import Ubiquiti from './Logo/Ubiquiti'
import Wellcube from './Logo/Wellcube'
import Xiaomi from './Logo/Xiaomi'

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
    Wellcube,
    Xiaomi
}

const LoadLogo = ({ iconPath, w, h, fill, title }) => {

    const Icon = svgMap[iconPath]

    if(!Icon) {
        return null
    }

    return <Icon w={w} h={h} fill={fill} title={title} />
}

export default LoadLogo
