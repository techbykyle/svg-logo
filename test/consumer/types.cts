import React = require('react')
import svgLogo = require('@techbykyle/svg-logo')
import Grok = require('@techbykyle/svg-logo/icons/Grok')
import metadata = require('@techbykyle/svg-logo/metadata')

const slugProps: svgLogo.LoadLogoProps = {
    iconPath: 'grok',
    size: 24
}
const nameProps: svgLogo.LoadLogoProps = {
    iconPath: 'GrokKFull',
    width: 64,
    height: 25
}

React.createElement(svgLogo, slugProps)
React.createElement(svgLogo.LoadLogo, nameProps)
React.createElement(svgLogo.Grok, {
    size: 24,
    title: 'Grok'
})
React.createElement(Grok, {
    size: 24,
    title: 'Grok'
})

const directIcon: svgLogo.LogoComponent = Grok
const ranteaterMetadata: Readonly<svgLogo.IconMetadata> | null = metadata.getIconMetadata('ranteater')
void directIcon
void ranteaterMetadata

const invalidProps: svgLogo.LoadLogoProps = {
    // @ts-expect-error Unknown identifiers must be rejected.
    iconPath: 'does-not-exist'
}
void invalidProps
