const fs = require('fs')
const path = require('path')

function fail(location, message) {
    throw new Error(`${location}: ${message}`)
}

function matchesType(value, expectedType) {
    switch (expectedType) {
        case 'null':
            return value === null
        case 'array':
            return Array.isArray(value)
        case 'object':
            return value !== null && typeof value === 'object' && !Array.isArray(value)
        case 'integer':
            return Number.isInteger(value)
        default:
            return typeof value === expectedType
    }
}

function validateSchemaValue(value, schema, location = '$') {
    if (Object.prototype.hasOwnProperty.call(schema, 'const') && value !== schema.const) {
        fail(location, `must equal ${JSON.stringify(schema.const)}`)
    }

    if (schema.enum && !schema.enum.some((candidate) => Object.is(candidate, value))) {
        fail(location, `must be one of ${schema.enum.map(JSON.stringify).join(', ')}`)
    }

    if (schema.type) {
        const expectedTypes = Array.isArray(schema.type) ? schema.type : [schema.type]
        if (!expectedTypes.some((expectedType) => matchesType(value, expectedType))) {
            fail(location, `must be of type ${expectedTypes.join(' or ')}`)
        }
    }

    if (typeof value === 'string') {
        if (schema.minLength !== undefined && value.length < schema.minLength) {
            fail(location, `must contain at least ${schema.minLength} character(s)`)
        }
        if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
            fail(location, `must match ${schema.pattern}`)
        }
        if (schema.format === 'uri') {
            try {
                new URL(value)
            } catch {
                fail(location, 'must be an absolute URI')
            }
        }
    }

    if (Array.isArray(value)) {
        if (schema.minItems !== undefined && value.length < schema.minItems) {
            fail(location, `must contain at least ${schema.minItems} item(s)`)
        }
        if (schema.items) {
            value.forEach((item, index) => validateSchemaValue(item, schema.items, `${location}[${index}]`))
        }
    }

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        const properties = schema.properties || {}
        for (const requiredName of schema.required || []) {
            if (!Object.prototype.hasOwnProperty.call(value, requiredName)) {
                fail(location, `is missing required property ${requiredName}`)
            }
        }
        if (schema.additionalProperties === false) {
            const unexpected = Object.keys(value).filter((name) => !Object.prototype.hasOwnProperty.call(properties, name))
            if (unexpected.length > 0) {
                fail(location, `contains unsupported properties: ${unexpected.join(', ')}`)
            }
        }
        for (const [name, propertySchema] of Object.entries(properties)) {
            if (Object.prototype.hasOwnProperty.call(value, name)) {
                validateSchemaValue(value[name], propertySchema, `${location}.${name}`)
            }
        }
    }
}

function loadManifest(rootDir) {
    const manifest = JSON.parse(fs.readFileSync(path.join(rootDir, 'icons.json'), 'utf8'))
    const schema = JSON.parse(fs.readFileSync(path.join(rootDir, 'icons.schema.json'), 'utf8'))
    validateSchemaValue(manifest, schema)

    const exportNames = new Set()
    const fileNames = new Set()
    const slugs = new Set()

    for (const icon of manifest.icons) {
        if (exportNames.has(icon.exportName)) {
            fail('$.icons', `duplicate exportName ${icon.exportName}`)
        }
        if (fileNames.has(icon.fileName)) {
            fail('$.icons', `duplicate fileName ${icon.fileName}`)
        }
        if (slugs.has(icon.slug)) {
            fail('$.icons', `duplicate slug ${icon.slug}`)
        }
        exportNames.add(icon.exportName)
        fileNames.add(icon.fileName)
        slugs.add(icon.slug)
    }

    const sortedNames = [...exportNames].sort((left, right) =>
        left.localeCompare(right, 'en', { sensitivity: 'base' })
    )
    const manifestNames = manifest.icons.map((icon) => icon.exportName)
    if (JSON.stringify(manifestNames) !== JSON.stringify(sortedNames)) {
        fail('$.icons', 'entries must remain sorted by exportName')
    }

    const sourceDir = path.join(rootDir, 'src', 'Logo')
    const actualSourceNames = fs.readdirSync(sourceDir)
        .filter((file) => file.endsWith('.jsx'))
        .map((file) => path.basename(file, '.jsx'))
        .sort()
    const expectedSourceNames = manifest.icons.map((icon) => icon.fileName).sort()
    const missingSources = expectedSourceNames.filter((name) => !actualSourceNames.includes(name))
    const unregisteredSources = actualSourceNames.filter((name) => !expectedSourceNames.includes(name))

    if (missingSources.length > 0) {
        fail('src/Logo', `missing icon source files: ${missingSources.join(', ')}`)
    }
    if (unregisteredSources.length > 0) {
        fail('src/Logo', `unregistered icon source files: ${unregisteredSources.join(', ')}`)
    }

    return Object.freeze({
        schemaVersion: manifest.schemaVersion,
        icons: Object.freeze(manifest.icons.map((icon) => Object.freeze({ ...icon })))
    })
}

function toPublicMetadata(icon) {
    const {
        exportName,
        slug,
        title,
        source,
        sourceUrl,
        guidelinesUrl,
        assetLicense,
        colorMode,
        variant
    } = icon

    return {
        exportName,
        slug,
        title,
        source,
        sourceUrl,
        guidelinesUrl,
        assetLicense,
        colorMode,
        variant
    }
}

module.exports = {
    loadManifest,
    toPublicMetadata,
    validateSchemaValue
}
