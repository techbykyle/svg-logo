const fs = require('fs')
const path = require('path')

const { loadManifest } = require('./manifest.js')

const rootDir = path.join(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const icons = loadManifest(rootDir).icons

function write(relativePath, content) {
    const destination = path.join(distDir, relativePath)
    fs.mkdirSync(path.dirname(destination), { recursive: true })
    fs.writeFileSync(destination, `${content.trimEnd()}\n`)
}

function foundation(exported) {
    const keyword = exported ? 'export ' : ''
    const names = icons.map((icon) => JSON.stringify(icon.exportName)).join(' | ')
    const slugs = icons.map((icon) => JSON.stringify(icon.slug)).join(' | ')

    return `${keyword}type IconName = ${names}\n` +
        `${keyword}type IconSlug = ${slugs}\n` +
        `${keyword}type IconIdentifier = IconName | IconSlug\n` +
        `${keyword}type IconColorMode = 'monochrome' | 'duotone' | 'multicolor' | 'fixed-color'\n` +
        `${keyword}type IconVariant = 'logo' | 'logomark' | 'wordmark' | 'combination-mark' | 'emblem'\n` +
        `${keyword}type IconAssetLicense = 'trademark' | 'project-owned' | 'open-source' | 'unknown'\n\n` +
        `${keyword}interface IconMetadata {\n` +
        `    readonly exportName: IconName\n` +
        `    readonly slug: IconSlug\n` +
        `    readonly title: string\n` +
        `    readonly source: string\n` +
        `    readonly sourceUrl: string | null\n` +
        `    readonly guidelinesUrl: string | null\n` +
        `    readonly assetLicense: IconAssetLicense\n` +
        `    readonly colorMode: IconColorMode\n` +
        `    readonly variant: IconVariant\n` +
        `}\n\n` +
        `${keyword}type LogoStyle = CSSProperties & {\n` +
        `    [customProperty: \`--\${string}\`]: string | number | undefined\n` +
        `}\n\n` +
        `${keyword}interface LogoProps extends Omit<\n` +
        `    SVGProps<SVGSVGElement>,\n` +
        `    'children' | 'dangerouslySetInnerHTML' | 'fill' | 'height' | 'style' | 'title' | 'width'\n` +
        `> {\n` +
        `    size?: number | string\n` +
        `    width?: number | string\n` +
        `    height?: number | string\n` +
        `    /** @deprecated Use width or size. */\n` +
        `    w?: number | string\n` +
        `    /** @deprecated Use height or size. */\n` +
        `    h?: number | string\n` +
        `    /** Standard SVG fill, or the deprecated style-object compatibility form. */\n` +
        `    fill?: SVGProps<SVGSVGElement>['fill'] | CSSProperties\n` +
        `    style?: LogoStyle\n` +
        `    /** Adds an SVG title and exposes the icon as semantic content. */\n` +
        `    title?: string\n` +
        `    /** Compatibility alias for MUI SvgIcon titleAccess. */\n` +
        `    titleAccess?: string\n` +
        `}\n\n` +
        `${keyword}type LogoComponent = ForwardRefExoticComponent<LogoProps & RefAttributes<SVGSVGElement>> & {\n` +
        `    readonly metadata: Readonly<IconMetadata>\n` +
        `}\n\n` +
        `${keyword}interface LoadLogoProps extends LogoProps {\n` +
        `    iconPath: IconIdentifier\n` +
        `}\n\n` +
        `${keyword}type LoadLogoComponent = ForwardRefExoticComponent<LoadLogoProps & RefAttributes<SVGSVGElement>>\n`
}

function esmDeclarations() {
    const iconDeclarations = icons
        .map((icon) => `export declare const ${icon.exportName}: LogoComponent`)
        .join('\n')

    return `import type { CSSProperties, ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'\n\n` +
        foundation(true) + `\n` +
        `export declare const logoNames: readonly IconName[]\n` +
        `export declare const logoSlugs: readonly IconSlug[]\n` +
        `export declare const iconMetadata: Readonly<Record<IconName, Readonly<IconMetadata>>>\n` +
        `export declare const iconMetadataBySlug: Readonly<Record<IconSlug, Readonly<IconMetadata>>>\n` +
        `export declare function getIconMetadata(identifier: IconIdentifier | string): Readonly<IconMetadata> | null\n` +
        `export declare const LoadLogo: LoadLogoComponent\n` +
        iconDeclarations + `\n` +
        `export default LoadLogo`
}

function cjsDeclarations() {
    const iconProperties = icons
        .map((icon) => `    readonly ${icon.exportName}: LogoComponent`)
        .join('\n')
    const exportedTypes = [
        'IconAssetLicense',
        'IconColorMode',
        'IconIdentifier',
        'IconMetadata',
        'IconName',
        'IconSlug',
        'IconVariant',
        'LoadLogoComponent',
        'LoadLogoProps',
        'LogoComponent',
        'LogoProps',
        'LogoStyle'
    ].join(', ')

    return `import type { CSSProperties, ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'\n\n` +
        foundation(false) + `\n` +
        `declare const logoNames: readonly IconName[]\n` +
        `declare const logoSlugs: readonly IconSlug[]\n` +
        `declare const iconMetadata: Readonly<Record<IconName, Readonly<IconMetadata>>>\n` +
        `declare const iconMetadataBySlug: Readonly<Record<IconSlug, Readonly<IconMetadata>>>\n` +
        `declare function getIconMetadata(identifier: IconIdentifier | string): Readonly<IconMetadata> | null\n\n` +
        `declare var LoadLogo: LoadLogoComponent & {\n` +
        `    readonly default: LoadLogoComponent\n` +
        `    readonly LoadLogo: LoadLogoComponent\n` +
        `    readonly getIconMetadata: typeof getIconMetadata\n` +
        `    readonly iconMetadata: typeof iconMetadata\n` +
        `    readonly iconMetadataBySlug: typeof iconMetadataBySlug\n` +
        `    readonly logoNames: typeof logoNames\n` +
        `    readonly logoSlugs: typeof logoSlugs\n` +
        iconProperties + `\n` +
        `}\n\n` +
        `declare namespace LoadLogo {\n` +
        `    export { ${exportedTypes} }\n` +
        `}\n\n` +
        `export = LoadLogo`
}

function esmMetadata(extension) {
    return `export { getIconMetadata, iconMetadata, iconMetadataBySlug, logoNames, logoSlugs } from './index.${extension}'\n` +
        `export type { IconAssetLicense, IconColorMode, IconIdentifier, IconMetadata, IconName, IconSlug, IconVariant } from './index.${extension}'`
}

function cjsMetadata() {
    return `import svgLogo = require('./index.cjs')\n\n` +
        `declare const metadata: {\n` +
        `    readonly getIconMetadata: typeof svgLogo.getIconMetadata\n` +
        `    readonly iconMetadata: typeof svgLogo.iconMetadata\n` +
        `    readonly iconMetadataBySlug: typeof svgLogo.iconMetadataBySlug\n` +
        `    readonly logoNames: typeof svgLogo.logoNames\n` +
        `    readonly logoSlugs: typeof svgLogo.logoSlugs\n` +
        `}\n\n` +
        `export = metadata`
}

function esmIcon(icon, extension) {
    return `import type { LogoComponent } from '../../index.${extension}'\n` +
        `declare const ${icon.exportName}: LogoComponent\n` +
        `export default ${icon.exportName}`
}

function cjsIcon(icon) {
    return `import svgLogo = require('../../index.cjs')\n` +
        `declare const ${icon.exportName}: svgLogo.LogoComponent\n` +
        `export = ${icon.exportName}`
}

const esmTypes = esmDeclarations()
write('index.d.ts', esmTypes)
write('index.d.mts', esmTypes)
write('index.d.cts', cjsDeclarations())
write('metadata.d.ts', esmMetadata('js'))
write('metadata.d.mts', esmMetadata('mjs'))
write('metadata.d.cts', cjsMetadata())

for (const icon of icons) {
    write(`types/icons/${icon.exportName}.d.ts`, esmIcon(icon, 'js'))
    write(`types/icons/${icon.exportName}.d.mts`, esmIcon(icon, 'mjs'))
    write(`types/icons/${icon.exportName}.d.cts`, cjsIcon(icon))
}

console.log(`Built dual ESM/CommonJS declarations for ${icons.length} icons.`)
