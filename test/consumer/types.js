// @ts-check

import React from 'react'
import LoadLogo, {
    Grok,
    Ranteater,
    getIconMetadata,
    iconMetadata
} from '@techbykyle/svg-logo'

React.createElement(Grok, {
    size: 24,
    title: 'Grok',
    fill: 'currentColor',
    className: 'icon'
})
React.createElement(Ranteater, {
    w: 24,
    h: 24,
    fill: { fill: '#fff' },
    style: { '--svg-logo-ranteater-disc': '#123456' }
})
/** @type {import('@techbykyle/svg-logo').LoadLogoProps} */
const slugProps = { iconPath: 'grok', size: 24 }
/** @type {import('@techbykyle/svg-logo').LoadLogoProps} */
const nameProps = { iconPath: 'GrokKFull', width: 64, height: 25 }
React.createElement(LoadLogo, slugProps)
React.createElement(LoadLogo, nameProps)

getIconMetadata('ranteater')
iconMetadata.Ranteater.colorMode

/** @type {import('@techbykyle/svg-logo').LoadLogoProps} */
const invalidProps = {
    // @ts-expect-error Unknown identifiers must be rejected.
    iconPath: 'does-not-exist'
}
void invalidProps
