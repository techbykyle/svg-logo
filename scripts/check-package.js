const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')

const { loadManifest, toPublicMetadata } = require('./manifest.js')

const rootDir = path.join(__dirname, '..')
const packageJson = require(path.join(rootDir, 'package.json'))
const packageLock = require(path.join(rootDir, 'package-lock.json'))
const manifest = loadManifest(rootDir)
const icons = manifest.icons

function assert(condition, message) {
    if (!condition) {
        throw new Error(message)
    }
}

function assertFile(relativePath) {
    assert(fs.existsSync(path.join(rootDir, relativePath)), `Missing package file: ${relativePath}`)
}

function assertConditionalExport(exportName, expected) {
    const definition = packageJson.exports[exportName]
    assert(definition, `Missing package export: ${exportName}`)

    for (const condition of ['import', 'require']) {
        assert(definition[condition], `Missing ${condition} condition for ${exportName}`)
        assert(
            Object.keys(definition[condition])[0] === 'types',
            `The types condition must come first for ${exportName} ${condition}`
        )
        assert(
            definition[condition].types === expected[condition].types,
            `Incorrect ${condition} types target for ${exportName}`
        )
        assert(
            definition[condition].default === expected[condition].default,
            `Incorrect ${condition} runtime target for ${exportName}`
        )
    }
}

assert(
    typeof packageJson.version === 'string' &&
        packageJson.version.length > 0,
    'package.json must define a version'
)

assert(
    packageLock.version === packageJson.version,
    `package-lock.json version (${packageLock.version}) must match ` +
        `package.json version (${packageJson.version})`
)

assert(
    packageLock.packages?.['']?.version === packageJson.version,
    `package-lock.json root package version ` +
        `(${packageLock.packages?.['']?.version}) must match ` +
        `package.json version (${packageJson.version})`
)

assert(packageJson.private !== true, 'The package is marked private and cannot be published')
assert(packageJson.sideEffects === false, 'sideEffects must remain false for tree-shaking')
assert(packageJson.peerDependencies.react === '>=17.0.0', 'React peer dependency must remain >=17.0.0')
assert(
    packageJson.scripts.build === 'node build.js && node scripts/build-types.js',
    'The build must generate runtime output followed by dual-module declarations'
)
assertFile('scripts/build-types.js')
assert(!fs.existsSync(path.join(rootDir, '.babelrc')), 'The obsolete .babelrc file must not exist')
assert(!fs.existsSync(path.join(rootDir, 'src', 'index.js')), 'src/index.js must be generated, not hand-maintained')
assert(!fs.existsSync(path.join(rootDir, 'src', 'LoadLogo.jsx')), 'src/LoadLogo.jsx must be generated, not hand-maintained')

assertConditionalExport('.', {
    import: {
        types: './dist/index.d.mts',
        default: './dist/esm/index.js'
    },
    require: {
        types: './dist/index.d.cts',
        default: './dist/cjs/index.js'
    }
})
assertConditionalExport('./icons/*', {
    import: {
        types: './dist/types/icons/*.d.mts',
        default: './dist/esm/icons/*.js'
    },
    require: {
        types: './dist/types/icons/*.d.cts',
        default: './dist/cjs/icons/*.js'
    }
})
assertConditionalExport('./metadata', {
    import: {
        types: './dist/metadata.d.mts',
        default: './dist/esm/metadata.js'
    },
    require: {
        types: './dist/metadata.d.cts',
        default: './dist/cjs/metadata.js'
    }
})
assert(packageJson.exports['./metadata.json'] === './dist/metadata.json', 'The metadata JSON export is missing')

for (const requiredFile of [
    packageJson.main,
    packageJson.module,
    packageJson.types,
    'BRAND_ASSETS.md',
    'README.md',
    'icons.json',
    'icons.schema.json',
    'dist/index.d.mts',
    'dist/index.d.cts',
    'dist/metadata.d.ts',
    'dist/metadata.d.mts',
    'dist/metadata.d.cts',
    'dist/metadata.json',
    'dist/cjs/LoadLogo.js',
    'dist/cjs/metadata.js',
    'dist/cjs/runtime.js',
    'dist/esm/LoadLogo.js',
    'dist/esm/metadata.js',
    'dist/esm/runtime.js'
]) {
    assertFile(requiredFile)
}

for (const icon of icons) {
    for (const requiredFile of [
        `dist/cjs/Logo/${icon.fileName}.js`,
        `dist/cjs/icons/${icon.exportName}.js`,
        `dist/esm/Logo/${icon.fileName}.js`,
        `dist/esm/icons/${icon.exportName}.js`,
        `dist/types/icons/${icon.exportName}.d.ts`,
        `dist/types/icons/${icon.exportName}.d.mts`,
        `dist/types/icons/${icon.exportName}.d.cts`
    ]) {
        assertFile(requiredFile)
    }
}

const expectedMetadata = {
    schemaVersion: manifest.schemaVersion,
    icons: icons.map(toPublicMetadata)
}
const generatedMetadata = JSON.parse(fs.readFileSync(path.join(rootDir, 'dist', 'metadata.json'), 'utf8'))
assert(JSON.stringify(generatedMetadata) === JSON.stringify(expectedMetadata), 'Generated metadata differs from icons.json')

const fallbackDeclarationText = fs.readFileSync(path.join(rootDir, 'dist', 'index.d.ts'), 'utf8')
const esmDeclarationText = fs.readFileSync(path.join(rootDir, 'dist', 'index.d.mts'), 'utf8')
const cjsDeclarationText = fs.readFileSync(path.join(rootDir, 'dist', 'index.d.cts'), 'utf8')
const esmIndexText = fs.readFileSync(path.join(rootDir, 'dist', 'esm', 'index.js'), 'utf8')
const cjsIndexText = fs.readFileSync(path.join(rootDir, 'dist', 'cjs', 'index.js'), 'utf8')
const readme = fs.readFileSync(path.join(rootDir, 'README.md'), 'utf8')

assert(esmDeclarationText.includes('export default LoadLogo'), 'ESM declaration is missing its default export')
assert(cjsDeclarationText.includes('export = LoadLogo'), 'CommonJS declaration is missing export = LoadLogo')
assert(cjsDeclarationText.includes('declare namespace LoadLogo'), 'CommonJS declaration is missing its type namespace')
assert(
    fallbackDeclarationText === esmDeclarationText,
    'The legacy declaration fallback must match the ESM declaration surface'
)

for (const icon of icons) {
    assert(
        esmDeclarationText.includes(`const ${icon.exportName}: LogoComponent`),
        `Missing ESM declaration for ${icon.exportName}`
    )
    assert(
        cjsDeclarationText.includes(`readonly ${icon.exportName}: LogoComponent`),
        `Missing CommonJS declaration for ${icon.exportName}`
    )
    assert(esmIndexText.includes(icon.exportName), `Missing ESM export for ${icon.exportName}`)
    assert(cjsIndexText.includes(icon.exportName), `Missing CommonJS export for ${icon.exportName}`)
    assert(readme.includes(`\`${icon.exportName}\``), `README catalog is missing ${icon.exportName}`)
}

for (const format of ['cjs', 'esm']) {
    const stack = [path.join(rootDir, 'dist', format)]
    while (stack.length > 0) {
        const current = stack.pop()
        for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
            const entryPath = path.join(current, entry.name)
            if (entry.isDirectory()) {
                stack.push(entryPath)
            } else if (entry.name.endsWith('.js')) {
                childProcess.execFileSync(process.execPath, ['--check', entryPath], {
                    cwd: rootDir,
                    stdio: 'pipe'
                })
            }
        }
    }
}

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const packOutput = childProcess.execFileSync(
    npmCommand,
    ['pack', '--dry-run', '--ignore-scripts', '--json'],
    { cwd: rootDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
)
const packResult = JSON.parse(packOutput)
const packed = Array.isArray(packResult) ? packResult[0] : packResult
assert(packed, 'npm pack dry-run did not return package metadata')
for (const requiredPackedFile of [
    'BRAND_ASSETS.md',
    'README.md',
    'icons.json',
    'icons.schema.json',
    'dist/index.d.mts',
    'dist/index.d.cts',
    'dist/metadata.d.mts',
    'dist/metadata.d.cts',
    'dist/metadata.json',
    'dist/types/icons/Grok.d.mts',
    'dist/types/icons/Grok.d.cts',
    'dist/esm/index.js',
    'dist/cjs/index.js'
]) {
    assert(
        packed.files.some((entry) => entry.path === requiredPackedFile),
        `${requiredPackedFile} is not included in the package`
    )
}

console.log(
    `Verified ${icons.length} icon exports, metadata records, dual-module declarations, entry points, and package contents.`
)
