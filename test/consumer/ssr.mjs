import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import LoadLogo, { Grok, Ranteater } from '@techbykyle/svg-logo'

const semantic = renderToStaticMarkup(
    React.createElement(Grok, {
        size: 32,
        title: 'Grok',
        className: 'brand-icon',
        'data-testid': 'grok'
    })
)
assert.match(semantic, /^<svg/)
assert.match(semantic, /width="32"/)
assert.match(semantic, /height="32"/)
assert.match(semantic, /fill="currentColor"/)
assert.match(semantic, /role="img"/)
assert.match(semantic, /aria-label="Grok"/)
assert.match(semantic, /<title>Grok<\/title>/)
assert.match(semantic, /class="brand-icon"/)
assert.match(semantic, /data-testid="grok"/)
assert.doesNotMatch(semantic, /aria-hidden="true"/)

const muiTitle = renderToStaticMarkup(
    React.createElement(Grok, {
        size: 24,
        role: 'img',
        children: React.createElement('title', null, 'Grok through MUI')
    })
)
assert.match(muiTitle, /<title>Grok through MUI<\/title>/)

const decorative = renderToStaticMarkup(
    React.createElement(Ranteater, {
        size: 24,
        style: { '--svg-logo-ranteater-disc': '#123456' }
    })
)
assert.match(decorative, /aria-hidden="true"/)
assert.doesNotMatch(decorative, /<title>/)
assert.match(decorative, /--svg-logo-ranteater-disc:#123456/)
assert.doesNotMatch(decorative, /linearGradient/)

const compatible = renderToStaticMarkup(
    React.createElement(Grok, { w: 20, h: 21, fill: { fill: '#fff' } })
)
assert.match(compatible, /width="20"/)
assert.match(compatible, /height="21"/)
assert.match(compatible, /style="fill:#fff"/)

const dynamic = renderToStaticMarkup(
    React.createElement(LoadLogo, { iconPath: 'grok', size: 18, title: 'Grok dynamic' })
)
assert.match(dynamic, /width="18"/)
assert.match(dynamic, /<title>Grok dynamic<\/title>/)
assert.equal(renderToStaticMarkup(React.createElement(LoadLogo, { iconPath: 'missing' })), '')
