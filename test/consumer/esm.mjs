import assert from 'node:assert/strict'
import LoadLogo, {
    ACP,
    GitHub,
    Grok,
    GrokKFull,
    Npm,
    Ranteater,
    getIconMetadata,
    iconMetadata,
    iconMetadataBySlug,
    logoNames,
    logoSlugs
} from '@techbykyle/svg-logo'

assert.ok(LoadLogo)
assert.ok(ACP)
assert.ok(GitHub)
assert.ok(Grok)
assert.ok(GrokKFull)
assert.ok(Npm)
assert.ok(Ranteater)
assert.equal(Grok.metadata.exportName, 'Grok')
assert.equal(ACP.metadata.slug, 'acp')
assert.equal(GrokKFull.metadata.slug, 'grok-full')
assert.equal(Npm.metadata.slug, 'npm')
assert.equal(Ranteater.metadata.colorMode, 'fixed-color')
assert.equal(iconMetadata.Grok, Grok.metadata)
assert.equal(iconMetadataBySlug.grok, Grok.metadata)
assert.equal(getIconMetadata('Grok'), Grok.metadata)
assert.equal(getIconMetadata('grok'), Grok.metadata)
assert.equal(getIconMetadata('missing'), null)
assert.ok(logoNames.includes('Ranteater'))
assert.ok(logoSlugs.includes('ranteater'))
