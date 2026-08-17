const fs = require('fs')
const path = require('path')

const rootDir = path.join(__dirname, '..')
const logoDir = path.join(rootDir, 'src', 'Logo')
const manifest = require(path.join(rootDir, 'icons.json'))

function assert(condition, message) {
    if (!condition) {
        throw new Error(message)
    }
}

function readLogo(name) {
    return fs.readFileSync(path.join(logoDir, `${name}.jsx`), 'utf8')
}

function extractViewBox(source, name) {
    const match = source.match(/<svg\b[^>]*\bviewBox="([^"]+)"/s)
    assert(match, `${name} is missing a root SVG viewBox`)
    return match[1]
}

function extractPathTags(source) {
    return [...source.matchAll(/<path\b[^>]*>/gs)].map((match) => match[0])
}

function extractPathData(source, name) {
    const paths = extractPathTags(source).map((tag) => {
        const match = tag.match(/\bd="([^"]+)"/s)
        assert(match, `${name} contains a path without d data`)
        return match[1].replace(/\s+/g, ' ').trim()
    })
    assert(paths.length > 0, `${name} must contain at least one path`)
    return paths
}

function countElements(source, elementName) {
    return [...source.matchAll(new RegExp(`<${elementName}\\b`, 'g'))].length
}

function assertSameGeometry(officialName, variantName) {
    const official = readLogo(officialName)
    const variant = readLogo(variantName)

    assert(
        extractViewBox(official, officialName) === extractViewBox(variant, variantName),
        `${variantName} must retain the ${officialName} viewBox`
    )
    assert(
        JSON.stringify(extractPathData(official, officialName)) ===
            JSON.stringify(extractPathData(variant, variantName)),
        `${variantName} path geometry must match ${officialName}`
    )

    return { official, variant }
}

function findMetadata(exportName) {
    return manifest.icons.find((icon) => icon.exportName === exportName)
}

const claude = assertSameGeometry('ClaudeCode', 'ClaudeCodeMonochrome')
assert(
    extractPathTags(claude.official).some((tag) => /\bfill="#D97757"/.test(tag)),
    'ClaudeCode must retain the official Clay fill'
)
assert(
    extractPathTags(claude.variant).every((tag) => !/\bfill=/.test(tag)),
    'ClaudeCodeMonochrome paths must inherit currentColor'
)

const openCode = assertSameGeometry('OpenCode', 'OpenCodeMonochrome')
assert(countElements(openCode.official, 'rect') === 1, 'OpenCode must retain its official background rectangle')
assert(countElements(openCode.variant, 'rect') === 0, 'OpenCodeMonochrome must omit the background rectangle')
assert(
    extractPathTags(openCode.variant).every((tag) => !/\bfill=/.test(tag)),
    'OpenCodeMonochrome paths must inherit currentColor'
)

const xai = assertSameGeometry('XAI', 'XAISquareTransparent')
assert(countElements(xai.official, 'rect') === 2, 'XAI must retain its visible background and clip rectangles')
assert(
    countElements(xai.variant, 'rect') === 1,
    'XAISquareTransparent must omit only the visible white background rectangle'
)
assert(
    extractPathTags(xai.variant).every((tag) => /\bfill="black"/.test(tag)),
    'XAISquareTransparent must retain the official black path fills'
)
assert(
    /<clipPath\b/.test(xai.variant),
    'XAISquareTransparent must retain the official square clipping boundary'
)

for (const [exportName, colorMode] of [
    ['ClaudeCodeMonochrome', 'monochrome'],
    ['OpenCodeMonochrome', 'monochrome'],
    ['XAISquareTransparent', 'fixed-color']
]) {
    const metadata = findMetadata(exportName)
    assert(metadata, `${exportName} is missing from icons.json`)
    assert(metadata.colorMode === colorMode, `${exportName} must use colorMode ${colorMode}`)
    assert(metadata.variant === 'logomark', `${exportName} must remain a logomark`)
}

console.log('Verified normalized Claude Code, OpenCode, and xAI variants against their official source exports.')
