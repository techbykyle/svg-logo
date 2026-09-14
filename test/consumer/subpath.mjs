import assert from 'node:assert/strict'
import ACP from '@techbykyle/svg-logo/icons/ACP'
import GitHub from '@techbykyle/svg-logo/icons/GitHub'
import Grok from '@techbykyle/svg-logo/icons/Grok'
import GrokKFull from '@techbykyle/svg-logo/icons/GrokKFull'
import LinkedIn from '@techbykyle/svg-logo/icons/LinkedIn'
import Npm from '@techbykyle/svg-logo/icons/Npm'
import Ranteater from '@techbykyle/svg-logo/icons/Ranteater'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const metadata = require('@techbykyle/svg-logo/metadata.json')

assert.equal(ACP.metadata.exportName, 'ACP')
assert.equal(GitHub.metadata.exportName, 'GitHub')
assert.equal(Grok.metadata.variant, 'logomark')
assert.equal(GrokKFull.metadata.variant, 'combination-mark')
assert.equal(LinkedIn.metadata.exportName, 'LinkedIn')
assert.equal(Npm.metadata.exportName, 'Npm')
assert.equal(Ranteater.metadata.assetLicense, 'project-owned')
assert.equal(metadata.schemaVersion, 1)
assert.ok(metadata.icons.some((icon) => icon.exportName === 'Ranteater'))
