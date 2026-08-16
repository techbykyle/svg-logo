const childProcess = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { pathToFileURL } = require('url')

const rootDir = path.join(__dirname, '..')
const fixtureDir = path.join(rootDir, 'test', 'consumer')
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'svg-logo-consumer-'))
const packDir = path.join(tempDir, 'package')
const consumerDir = path.join(tempDir, 'consumer')

function run(command, args, cwd) {
    childProcess.execFileSync(command, args, { cwd, stdio: 'inherit' })
}

try {
    fs.mkdirSync(packDir, { recursive: true })
    fs.cpSync(fixtureDir, consumerDir, { recursive: true })

    run(npmCommand, ['run', 'build'], rootDir)
    run(npmCommand, ['run', 'check'], rootDir)

    const packOutput = childProcess.execFileSync(
        npmCommand,
        ['pack', '--ignore-scripts', '--json', '--pack-destination', packDir],
        { cwd: rootDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }
    )
    const [packed] = JSON.parse(packOutput)
    const tarballPath = path.join(packDir, packed.filename)

    fs.writeFileSync(
        path.join(consumerDir, 'package.json'),
        `${JSON.stringify({
            name: 'svg-logo-consumer-smoke-test',
            private: true,
            type: 'module',
            scripts: {
                test: 'node esm.mjs && node cjs.cjs && node subpath.mjs && node ssr.mjs && tsc -p tsconfig.json'
            },
            dependencies: {
                '@techbykyle/svg-logo': pathToFileURL(tarballPath).href,
                react: '18.3.1',
                'react-dom': '18.3.1'
            },
            devDependencies: {
                '@types/react': '^18.3.0',
                '@types/react-dom': '^18.3.0',
                typescript: '^5.7.3'
            }
        }, null, 2)}\n`
    )

    run(npmCommand, ['install', '--ignore-scripts', '--no-audit', '--no-fund', '--package-lock=false'], consumerDir)
    run(npmCommand, ['test'], consumerDir)
    console.log('Consumer smoke tests passed for ESM, CommonJS, subpaths, SSR, and declarations.')
} finally {
    fs.rmSync(tempDir, { recursive: true, force: true })
}
