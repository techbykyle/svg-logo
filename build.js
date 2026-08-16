const babel = require('@babel/core')
const fs = require('fs')
const path = require('path')

const { loadManifest, toPublicMetadata } = require('./scripts/manifest.js')

const rootDir = __dirname
const srcDir = path.join(rootDir, 'src')
const distDir = path.join(rootDir, 'dist')
const manifest = loadManifest(rootDir)
const icons = manifest.icons

function transform(code, filename, modules) {
    const result = babel.transformSync(code, {
        filename,
        babelrc: false,
        configFile: false,
        comments: true,
        presets: [
            ['@babel/preset-env', { modules }],
            ['@babel/preset-react', { runtime: 'automatic' }]
        ]
    })

    if (!result || typeof result.code !== 'string') {
        throw new Error(`Babel did not produce output for ${filename}`)
    }

    return result.code
}

function writeFile(relativePath, content) {
    const destination = path.join(distDir, relativePath)
    fs.mkdirSync(path.dirname(destination), { recursive: true })
    fs.writeFileSync(destination, `${content.trimEnd()}\n`)
}

function writeTranspiledSource(sourcePath, relativeOutputPath) {
    const code = fs.readFileSync(sourcePath, 'utf8')
    writeFile(path.join('esm', relativeOutputPath), transform(code, sourcePath, false))
    writeFile(path.join('cjs', relativeOutputPath), transform(code, sourcePath, 'commonjs'))
}

function createMetadataModule(format) {
    const entries = icons.map(toPublicMetadata)
    const serializedEntries = JSON.stringify(entries, null, 4)
    const body = `const entries = ${serializedEntries}\n\n` +
        `const iconMetadata = Object.freeze(Object.fromEntries(\n` +
        `    entries.map((entry) => [entry.exportName, Object.freeze({ ...entry })])\n` +
        `))\n\n` +
        `const iconMetadataBySlug = Object.freeze(Object.fromEntries(\n` +
        `    entries.map((entry) => [entry.slug, iconMetadata[entry.exportName]])\n` +
        `))\n\n` +
        `const logoNames = Object.freeze(entries.map((entry) => entry.exportName))\n` +
        `const logoSlugs = Object.freeze(entries.map((entry) => entry.slug))\n\n` +
        `function getIconMetadata(identifier) {\n` +
        `    return iconMetadata[identifier] || iconMetadataBySlug[identifier] || null\n` +
        `}`

    if (format === 'esm') {
        return `${body}\n\nexport { getIconMetadata, iconMetadata, iconMetadataBySlug, logoNames, logoSlugs }`
    }

    return `'use strict'\n\n${body}\n\nmodule.exports = {\n` +
        `    getIconMetadata,\n` +
        `    iconMetadata,\n` +
        `    iconMetadataBySlug,\n` +
        `    logoNames,\n` +
        `    logoSlugs\n` +
        `}`
}

function createIconModule(icon, format) {
    if (format === 'esm') {
        return `import RawLogo from '../Logo/${icon.fileName}.js'\n` +
            `import { createLogoComponent } from '../runtime.js'\n` +
            `import { iconMetadata } from '../metadata.js'\n\n` +
            `const ${icon.exportName} = createLogoComponent(RawLogo, iconMetadata.${icon.exportName})\n\n` +
            `export default ${icon.exportName}`
    }

    return `'use strict'\n\n` +
        `const rawModule = require('../Logo/${icon.fileName}.js')\n` +
        `const { createLogoComponent } = require('../runtime.js')\n` +
        `const { iconMetadata } = require('../metadata.js')\n\n` +
        `const RawLogo = rawModule.default || rawModule\n` +
        `const ${icon.exportName} = createLogoComponent(RawLogo, iconMetadata.${icon.exportName})\n\n` +
        `module.exports = ${icon.exportName}\n` +
        `module.exports.default = ${icon.exportName}`
}

function createLoadLogoModule(format) {
    const imports = icons.map((icon) => format === 'esm'
        ? `import ${icon.exportName} from './icons/${icon.exportName}.js'`
        : `const ${icon.exportName} = require('./icons/${icon.exportName}.js')`
    ).join('\n')
    const nameEntries = icons.map((icon) => `    ${icon.exportName}`).join(',\n')
    const slugEntries = icons.map((icon) => `    ${JSON.stringify(icon.slug)}: ${icon.exportName}`).join(',\n')
    const body = `const iconMap = Object.freeze({\n${nameEntries}\n})\n\n` +
        `const iconMapBySlug = Object.freeze({\n${slugEntries}\n})\n\n` +
        `const LoadLogo = React.forwardRef(function LoadLogo({ iconPath, ...props } = {}, ref) {\n` +
        `    const Icon = iconMap[iconPath] || iconMapBySlug[iconPath]\n` +
        `    return Icon ? React.createElement(Icon, { ...props, ref }) : null\n` +
        `})\n\n` +
        `LoadLogo.displayName = 'LoadLogo'`

    if (format === 'esm') {
        return `import React from 'react'\n${imports}\n\n${body}\n\nexport default LoadLogo`
    }

    return `'use strict'\n\nconst React = require('react')\n${imports}\n\n${body}\n\n` +
        `module.exports = LoadLogo\n` +
        `module.exports.default = LoadLogo`
}

function createIndexModule(format) {
    if (format === 'esm') {
        const namedExports = icons
            .map((icon) => `export { default as ${icon.exportName} } from './icons/${icon.exportName}.js'`)
            .join('\n')
        return `export { default, default as LoadLogo } from './LoadLogo.js'\n` +
            `export { getIconMetadata, iconMetadata, iconMetadataBySlug, logoNames, logoSlugs } from './metadata.js'\n\n` +
            namedExports
    }

    const assignments = icons
        .map((icon) => `module.exports.${icon.exportName} = require('./icons/${icon.exportName}.js')`)
        .join('\n')
    return `'use strict'\n\n` +
        `const LoadLogo = require('./LoadLogo.js')\n` +
        `const metadata = require('./metadata.js')\n\n` +
        `module.exports = LoadLogo\n` +
        `module.exports.default = LoadLogo\n` +
        `module.exports.LoadLogo = LoadLogo\n` +
        `Object.assign(module.exports, metadata)\n` +
        assignments
}

function createTypeDeclarations() {
    const iconNames = icons.map((icon) => JSON.stringify(icon.exportName)).join(' | ')
    const iconSlugs = icons.map((icon) => JSON.stringify(icon.slug)).join(' | ')
    const declarations = icons
        .map((icon) => `export declare const ${icon.exportName}: LogoComponent`)
        .join('\n')

    return `import type { CSSProperties, ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'\n\n` +
        `export type IconName = ${iconNames}\n` +
        `export type IconSlug = ${iconSlugs}\n` +
        `export type IconIdentifier = IconName | IconSlug\n` +
        `export type IconColorMode = 'monochrome' | 'duotone' | 'multicolor' | 'fixed-color'\n` +
        `export type IconVariant = 'logo' | 'logomark' | 'wordmark' | 'combination-mark' | 'emblem'\n` +
        `export type IconAssetLicense = 'trademark' | 'project-owned' | 'open-source' | 'unknown'\n\n` +
        `export interface IconMetadata {\n` +
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
        `export type LogoStyle = CSSProperties & {\n` +
        `    [customProperty: \`--\${string}\`]: string | number | undefined\n` +
        `}\n\n` +
        `export interface LogoProps extends Omit<\n` +
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
        `export type LogoComponent = ForwardRefExoticComponent<LogoProps & RefAttributes<SVGSVGElement>> & {\n` +
        `    readonly metadata: Readonly<IconMetadata>\n` +
        `}\n\n` +
        `export interface LoadLogoProps extends LogoProps {\n` +
        `    iconPath: IconIdentifier\n` +
        `}\n\n` +
        `export declare const logoNames: readonly IconName[]\n` +
        `export declare const logoSlugs: readonly IconSlug[]\n` +
        `export declare const iconMetadata: Readonly<Record<IconName, Readonly<IconMetadata>>>\n` +
        `export declare const iconMetadataBySlug: Readonly<Record<IconSlug, Readonly<IconMetadata>>>\n` +
        `export declare function getIconMetadata(identifier: IconIdentifier | string): Readonly<IconMetadata> | null\n` +
        `export declare const LoadLogo: ForwardRefExoticComponent<LoadLogoProps & RefAttributes<SVGSVGElement>>\n` +
        declarations + `\n` +
        `export default LoadLogo\n`
}

fs.rmSync(distDir, { recursive: true, force: true })

for (const icon of icons) {
    writeTranspiledSource(
        path.join(srcDir, 'Logo', `${icon.fileName}.jsx`),
        path.join('Logo', `${icon.fileName}.js`)
    )
}
writeTranspiledSource(path.join(srcDir, 'runtime.js'), 'runtime.js')

for (const format of ['esm', 'cjs']) {
    writeFile(path.join(format, 'metadata.js'), createMetadataModule(format))
    writeFile(path.join(format, 'LoadLogo.js'), createLoadLogoModule(format))
    writeFile(path.join(format, 'index.js'), createIndexModule(format))
    for (const icon of icons) {
        writeFile(path.join(format, 'icons', `${icon.exportName}.js`), createIconModule(icon, format))
    }
}

writeFile('index.d.ts', createTypeDeclarations())
writeFile(
    'metadata.d.ts',
    `export { getIconMetadata, iconMetadata, iconMetadataBySlug, logoNames, logoSlugs } from './index.js'\n` +
    `export type { IconAssetLicense, IconColorMode, IconIdentifier, IconMetadata, IconName, IconSlug, IconVariant } from './index.js'`
)
for (const icon of icons) {
    writeFile(
        path.join('types', 'icons', `${icon.exportName}.d.ts`),
        `import type { LogoComponent } from '../../index.js'\n` +
        `declare const ${icon.exportName}: LogoComponent\n` +
        `export default ${icon.exportName}`
    )
}
writeFile(
    'metadata.json',
    JSON.stringify({
        schemaVersion: manifest.schemaVersion,
        icons: icons.map(toPublicMetadata)
    }, null, 2)
)
writeFile(path.join('esm', 'package.json'), '{"type":"module"}')
writeFile(path.join('cjs', 'package.json'), '{"type":"commonjs"}')

console.log(`Built ${icons.length} icons, metadata, ESM, CommonJS, and declarations.`)
