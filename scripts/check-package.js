const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')

const { loadManifest, toPublicMetadata } = require('./manifest.js')

const rootDir = path.join(__dirname, '..')
const packageJson = require(path.join(rootDir, 'package.json'))
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

assert(packageJson.version === '0.2.0', 'package.json must be version 0.2.0')
assert(packageJson.private !== true, 'The package is marked private and cannot be published')
assert(packageJson.sideEffects === false, 'sideEffects must remain false for tree-shaking')
assert(packageJson.peerDependencies.react === '>=17.0.0', 'React peer dependency must remain >=17.0.0')
assert(!fs.existsSync(path.join(rootDir, '.babelrc')), 'The obsolete .babelrc file must not exist')
assert(!fs.existsSync(path.join(rootDir, 'src', 'index.js')), 'src/index.js must be generated, not hand-maintained')
assert(!fs.existsSync(path.join(rootDir, 'src', 'LoadLogo.jsx')), 'src/LoadLogo.jsx must be generated, not hand-maintained')

for (const requiredFile of [
    packageJson.main,
    packageJson.module,
    packageJson.types,
    'BRAND_ASSETS.md',
    'README.md',
    'icons.json',
    'icons.schema.json',
    'dist/metadata.d.ts',
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
        `dist/types/icons/${icon.exportName}.d.ts`
    ]) {
        assertFile(requiredFile)
    }
}

assert(packageJson.exports['./icons/*'].types === './dist/types/icons/*.d.ts', 'Per-icon type exports are incorrect')
assert(packageJson.exports['./metadata'], 'The metadata JavaScript export is missing')
assert(packageJson.exports['./metadata.json'] === './dist/metadata.json', 'The metadata JSON export is missing')

const expectedMetadata = {
    schemaVersion: manifest.schemaVersion,
    icons: icons.map(toPublicMetadata)
}
const generatedMetadata = JSON.parse(fs.readFileSync(path.join(rootDir, 'dist', 'metadata.json'), 'utf8'))
assert(JSON.stringify(generatedMetadata) === JSON.stringify(expectedMetadata), 'Generated metadata differs from icons.json')

const declarationText = fs.readFileSync(path.join(rootDir, 'dist', 'index.d.ts'), 'utf8')
const esmIndexText = fs.readFileSync(path.join(rootDir, 'dist', 'esm', 'index.js'), 'utf8')
const cjsIndexText = fs.readFileSync(path.join(rootDir, 'dist', 'cjs', 'index.js'), 'utf8')
const readme = fs.readFileSync(path.join(rootDir, 'README.md'), 'utf8')
for (const icon of icons) {
    assert(declarationText.includes(`const ${icon.exportName}: LogoComponent`), `Missing declaration for ${icon.exportName}`)
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
const [packed] = JSON.parse(packOutput)
assert(packed, 'npm pack dry-run did not return package metadata')
for (const requiredPackedFile of [
    'BRAND_ASSETS.md',
    'README.md',
    'icons.json',
    'icons.schema.json',
    'dist/metadata.json',
    'dist/esm/index.js',
    'dist/cjs/index.js'
]) {
    assert(packed.files.some((entry) => entry.path === requiredPackedFile), `${requiredPackedFile} is not included in the package`)
}

console.log(`Verified ${icons.length} icon exports, metadata records, entry points, declarations, and package contents.`)
