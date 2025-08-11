import Apple from './Logo/Apple'
import Google from './Logo/Google'
import Amazon from './Logo/Amazon'
import HomeAssistant from './Logo/HomeAssistant'
import HomeDepot from './Logo/HomeDepot'
import Microsoft from './Logo/Microsoft'
import NewEgg from './Logo/NewEgg'
import Samsung from './Logo/Samsung'
import Shelly from './Logo/Shelly'
import Aqara from './Logo/Aqara'
import Xiaomi from './Logo/Xiaomi'
import Ubiquiti from './Logo/Ubiquiti'
import Cisco from './Logo/Cisco'
import Netgear from './Logo/Netgear'
import Netgate from './Logo/Netgate'
import MSI from './Logo/MSI'
import GLiNet from './Logo/GLiNet'
import Reolink from './Logo/Reolink'

const svgMap = {
    Apple,
    Google,
    Amazon,
    HomeAssistant,
    HomeDepot,
    Microsoft,
    NewEgg,
    Samsung,
    Shelly,
    Aqara,
    Xiaomi,
    Ubiquiti,
    Cisco,
    Netgear,
    Netgate,
    MSI,
    GLiNet,
    Reolink
}

const LoadLogo = ({ iconPath, w, h, fill }) => {

    const Icon = svgMap[iconPath]

    if(!Icon) {
        return null
    }

    return <Icon w={w} h={h} fill={fill} />
}

export default LoadLogo