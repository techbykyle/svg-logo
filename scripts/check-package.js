const fs = require('fs')
const path = require('path')

const rootDir = path.join(__dirname, '..')
const packageJson = require(path.join(rootDir, 'package.json'))
const iconDir = path.join(rootDir, 'src', 'Logo')
const iconNames = fs.readdirSync(iconDir)
    .filter((file) => file.endsWith('.jsx'))
    .map((file) => path.basename(file, '.jsx'))

const requiredFiles = [
    packageJson.main,
    packageJson.module,
    packageJson.types,
    ...iconNames.flatMap((name) => [
        `dist/cjs/Logo/${name}.js`,
        `dist/esm/Logo/${name}.js`,
        `dist/types/Logo/${name}.d.ts`
    ])
]

const missingFiles = requiredFiles.filter((file) => !fs.existsSync(path.join(rootDir, file)))

if (missingFiles.length > 0) {
    throw new Error(`Missing package files:\n${missingFiles.join('\n')}`)
}

if (packageJson.private) {
    throw new Error('The package is marked private and cannot be published.')
}

console.log(`Verified package entry points and ${iconNames.length} icon exports.`)
