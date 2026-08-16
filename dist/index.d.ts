import type { ComponentType, CSSProperties } from 'react'

export interface LogoProps {
    /** CSS styles applied to the root SVG element. Kept as "fill" for API compatibility. */
    fill?: CSSProperties
    w?: number | string
    h?: number | string
    title?: string
}

export type IconName = 'Amazon' | 'Apple' | 'Aqara' | 'Cisco' | 'GLiNet' | 'GitHub' | 'GitLab' | 'Gitea' | 'Google' | 'HomeAssistant' | 'HomeDepot' | 'MSI' | 'Microsoft' | 'Mqtt' | 'Netgate' | 'Netgear' | 'NewEgg' | 'OpenAi' | 'Opensource' | 'Reolink' | 'Samsung' | 'Shelly' | 'Ubiquiti' | 'VsCode' | 'Wellcube' | 'Xiaomi'

export interface LoadLogoProps extends LogoProps {
    iconPath: IconName
}

export declare const logoNames: readonly IconName[]
export declare const LoadLogo: ComponentType<LoadLogoProps>
export declare const Amazon: ComponentType<LogoProps>
export declare const Apple: ComponentType<LogoProps>
export declare const Aqara: ComponentType<LogoProps>
export declare const Cisco: ComponentType<LogoProps>
export declare const GLiNet: ComponentType<LogoProps>
export declare const GitHub: ComponentType<LogoProps>
export declare const GitLab: ComponentType<LogoProps>
export declare const Gitea: ComponentType<LogoProps>
export declare const Google: ComponentType<LogoProps>
export declare const HomeAssistant: ComponentType<LogoProps>
export declare const HomeDepot: ComponentType<LogoProps>
export declare const MSI: ComponentType<LogoProps>
export declare const Microsoft: ComponentType<LogoProps>
export declare const Mqtt: ComponentType<LogoProps>
export declare const Netgate: ComponentType<LogoProps>
export declare const Netgear: ComponentType<LogoProps>
export declare const NewEgg: ComponentType<LogoProps>
export declare const OpenAi: ComponentType<LogoProps>
export declare const Opensource: ComponentType<LogoProps>
export declare const Reolink: ComponentType<LogoProps>
export declare const Samsung: ComponentType<LogoProps>
export declare const Shelly: ComponentType<LogoProps>
export declare const Ubiquiti: ComponentType<LogoProps>
export declare const VsCode: ComponentType<LogoProps>
export declare const Wellcube: ComponentType<LogoProps>
export declare const Xiaomi: ComponentType<LogoProps>
export default LoadLogo
