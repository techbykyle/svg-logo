const babel = require('@babel/core')
const fs = require('fs')
const path = require('path')

const rootDir = __dirname
const srcDir = path.join(rootDir, 'src')
const distDir = path.join(rootDir, 'dist')
const iconDir = path.join(srcDir, 'Logo')
const iconNames = fs.readdirSync(iconDir)
    .filter((file) => file.endsWith('.jsx'))
    .map((file) => path.basename(file, '.jsx'))
    .sort()

function transpileFile(srcPath, distPath, modules) {
    const code = fs.readFileSync(srcPath, 'utf8')
    const result = babel.transformSync(code, {
        filename: srcPath,
        babelrc: false,
        configFile: false,
        presets: [
            ['@babel/preset-env', { modules }],
            ['@babel/preset-react', { runtime: 'automatic' }]
        ]
    })

    fs.mkdirSync(path.dirname(distPath), { recursive: true })
    fs.writeFileSync(distPath, `${result.code}\n`)
}

function transpileDir(src, dist, modules) {
    fs.readdirSync(src).forEach(file => {
        const srcPath = path.join(src, file)
        const stat = fs.statSync(srcPath)

        if (stat.isDirectory()) {
            transpileDir(srcPath, path.join(dist, file), modules)
        } else if (/\.(js|jsx)$/.test(file)) {
            const distPath = path.join(dist, file.replace(/\.jsx$/, '.js'))
            transpileFile(srcPath, distPath, modules)
        }
    })
}

function writeTypeDeclarations() {
    const typeDir = path.join(distDir, 'types', 'Logo')
    fs.mkdirSync(typeDir, { recursive: true })

    const iconNameType = iconNames.map((name) => `'${name}'`).join(' | ')
    const namedDeclarations = iconNames
        .map((name) => `export declare const ${name}: ComponentType<LogoProps>`)
        .join('\n')
    const indexTypes = `import type { ComponentType, CSSProperties } from 'react'

export interface LogoProps {
    /** CSS styles applied to the root SVG element. Kept as \"fill\" for API compatibility. */
    fill?: CSSProperties
    w?: number | string
    h?: number | string
    title?: string
}

export type IconName = ${iconNameType}

export interface LoadLogoProps extends LogoProps {
    iconPath: IconName
}

export declare const logoNames: readonly IconName[]
export declare const LoadLogo: ComponentType<LoadLogoProps>
${namedDeclarations}
export default LoadLogo
`

    fs.writeFileSync(path.join(distDir, 'index.d.ts'), indexTypes)
    iconNames.forEach((name) => {
        fs.writeFileSync(
            path.join(typeDir, `${name}.d.ts`),
            `import type { ComponentType } from 'react'\nimport type { LogoProps } from '../../index.js'\ndeclare const ${name}: ComponentType<LogoProps>\nexport default ${name}\n`
        )
    })
}

fs.rmSync(distDir, { recursive: true, force: true })
transpileDir(srcDir, path.join(distDir, 'cjs'), 'commonjs')
transpileDir(srcDir, path.join(distDir, 'esm'), false)
writeTypeDeclarations()

fs.writeFileSync(path.join(distDir, 'esm', 'package.json'), '{"type":"module"}\n')
fs.writeFileSync(path.join(distDir, 'cjs', 'package.json'), '{"type":"commonjs"}\n')

console.log(`Built ${iconNames.length} icons for CommonJS and ES modules.`)
