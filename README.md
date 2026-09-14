# @techbykyle/svg-logo

A lightweight, tree-shakeable React library of curated SVG brand logos. It is designed to complement broad catalogs such as Simple Icons with project-specific, missing, alternate, and full-wordmark assets.

## Install

```bash
npm install @techbykyle/svg-logo
```

React 17 or newer is required.

## Recommended usage

Import a single icon through its package subpath when the icon is known at build time:

```jsx
import Grok from '@techbykyle/svg-logo/icons/Grok'

export function ProviderLogo() {
    return <Grok size={32} title="Grok" />
}
```

Named imports are also supported and remain tree-shakeable in bundlers that honor ESM and `sideEffects: false`:

```jsx
import { Anthropic, ClaudeCode, ClaudeCodeMonochrome, GitHubCopilot, OpenCode, OpenCodeMonochrome, XAI, XAISquareTransparent } from '@techbykyle/svg-logo'
```

## Dynamic loading

Use `LoadLogo` when an icon identifier is selected at runtime. It accepts the exported component name or stable lowercase slug:

```jsx
import LoadLogo from '@techbykyle/svg-logo'

export function BrandLogo({ brand }) {
    return <LoadLogo iconPath={brand} size={48} />
}
```

```jsx
<LoadLogo iconPath="GrokKFull" width={160} height={63} title="Grok" />
<LoadLogo iconPath="grok-full" width={160} height={63} title="Grok" />
```

`LoadLogo` contains the complete runtime map. Prefer direct or named imports when only a fixed subset is needed.

## Component API

Every icon forwards its ref to the root `<svg>` and accepts standard SVG properties, including `width`, `height`, `fill`, `color`, `className`, `style`, ARIA attributes, event handlers, and `data-*` attributes. `size` sets both dimensions unless one is supplied explicitly.

Icons are decorative by default and render with `aria-hidden="true"`. Supply `title`, `titleAccess`, `aria-label`, `aria-labelledby`, `role="img"`, or `aria-hidden={false}` when the SVG itself conveys meaning:

```jsx
<GitHub size={24} />
<GitHub size={24} title="GitHub" />
<GitHub size={24} aria-label="GitHub repository" />
```

The standard prop forwarding also permits direct use as a custom MUI `SvgIcon` component with `inheritViewBox`.

The version 0.1 compatibility API remains available:

```jsx
<GitHub w={32} h={32} fill={{ fill: '#181717' }} />
```

`w`, `h`, and the style-object form of `fill` are deprecated. New code should use `size`, `width`, `height`, standard string `fill`, and `style`.

## Colors

Monochrome icons inherit `currentColor` by default:

```jsx
<Grok size={28} style={{ color: '#111' }} />
```

`Anthropic`, `ClaudeCodeMonochrome`, `GitHubCopilot`, and `OpenCodeMonochrome` are monochrome and inherit `currentColor`. `ClaudeCode` retains Anthropic's official Clay fill, while `OpenCode` retains the fixed colors from its official app icon. `XAI` preserves the official black-on-white squared treatment. `XAISquareTransparent` keeps the official black symbol and clipping geometry while omitting only the visible white square background; both xAI exports remain fixed-color.

`Ranteater` uses a square view box and a flattened, gradient-free palette. The palette can be adjusted without changing the component:

```jsx
<Ranteater
    size={64}
    title="Ranteater"
    style={{
        '--svg-logo-ranteater-shadow': '#05080e',
        '--svg-logo-ranteater-disc': '#70798c',
        '--svg-logo-ranteater-stroke': '#252b36',
        '--svg-logo-ranteater-dark': '#060b0f',
        '--svg-logo-ranteater-body': '#efedeb',
        '--svg-logo-ranteater-highlight': '#f2efed',
        '--svg-logo-ranteater-detail': '#292f3a'
    }}
/>
```

Some legacy assets contain fixed internal colors. Consult `colorMode` metadata before assuming a root fill will recolor every path.

## Metadata

The manifest is generated into JavaScript, declarations, and JSON during the build:

```jsx
import {
    getIconMetadata,
    iconMetadata,
    iconMetadataBySlug,
    logoNames,
    logoSlugs
} from '@techbykyle/svg-logo/metadata'

console.log(iconMetadata.Grok.variant)
console.log(iconMetadataBySlug['grok-full'].exportName)
console.log(getIconMetadata('ranteater'))
```

Raw metadata is available at `@techbykyle/svg-logo/metadata.json`. Every icon component also exposes the same frozen record through `Icon.metadata`.

## Available icons

| Export | Slug | Variant | Color mode | Asset classification |
| --- | --- | --- | --- | --- |
| `ACP` | `acp` | logo | monochrome | unknown |
| `Amazon` | `amazon` | logo | monochrome | trademark |
| `Anthropic` | `anthropic` | logomark | monochrome | trademark |
| `Apple` | `apple` | logo | monochrome | trademark |
| `Aqara` | `aqara` | logo | monochrome | trademark |
| `Cisco` | `cisco` | logo | monochrome | trademark |
| `ClaudeCode` | `claude-code` | logomark | fixed-color | trademark |
| `ClaudeCodeMonochrome` | `claude-code-monochrome` | logomark | monochrome | trademark |
| `Gitea` | `gitea` | logo | monochrome | trademark |
| `GitHub` | `github` | logo | monochrome | trademark |
| `GitHubCopilot` | `github-copilot` | logomark | monochrome | trademark |
| `GitLab` | `gitlab` | logo | monochrome | trademark |
| `GLiNet` | `glinet` | logo | monochrome | trademark |
| `Google` | `google` | logo | monochrome | trademark |
| `Grok` | `grok` | logomark | monochrome | trademark |
| `GrokKFull` | `grok-full` | combination-mark | monochrome | trademark |
| `HomeAssistant` | `home-assistant` | logo | monochrome | trademark |
| `HomeDepot` | `home-depot` | logo | duotone | trademark |
| `LinkedIn` | `linkedin` | logo | monochrome | trademark |
| `Microsoft` | `microsoft` | logo | monochrome | trademark |
| `Mqtt` | `mqtt` | logo | monochrome | trademark |
| `MSI` | `msi` | logo | monochrome | trademark |
| `Netgate` | `netgate` | logo | duotone | trademark |
| `Netgear` | `netgear` | logo | monochrome | trademark |
| `NewEgg` | `newegg` | logo | monochrome | trademark |
| `Npm` | `npm` | logo | monochrome | trademark |
| `OpenAi` | `openai` | logo | monochrome | trademark |
| `OpenCode` | `opencode` | logomark | fixed-color | trademark |
| `OpenCodeMonochrome` | `opencode-monochrome` | logomark | monochrome | trademark |
| `Opensource` | `open-source` | logo | monochrome | unknown |
| `Ranteater` | `ranteater` | emblem | fixed-color | project-owned |
| `Reolink` | `reolink` | logo | monochrome | trademark |
| `Samsung` | `samsung` | logo | monochrome | trademark |
| `Shelly` | `shelly` | logo | monochrome | trademark |
| `Ubiquiti` | `ubiquiti` | logo | monochrome | trademark |
| `VsCode` | `visual-studio-code` | logo | monochrome | trademark |
| `Wellcube` | `wellcube` | logo | monochrome | trademark |
| `XAI` | `xai` | logomark | fixed-color | trademark |
| `XAISquareTransparent` | `xai-square-transparent` | logomark | fixed-color | trademark |
| `Xiaomi` | `xiaomi` | logo | monochrome | trademark |

`Grok` is the standalone mark. The full supplied mark is exported with the exact requested name `GrokKFull`.

`ClaudeCode` uses Anthropic's official Claude Spark (Clay) press-kit asset as the Claude Code product identifier; it is not a separate Claude Code wordmark.

`ClaudeCodeMonochrome` preserves the same Claude Spark view box and path geometry while inheriting `currentColor` for uniform provider-icon systems.

`OpenCodeMonochrome` preserves the two official OpenCode logo paths, removes the fixed background rectangle, and lets both paths inherit `currentColor`.

`XAI` preserves the official squared black-on-white media-kit asset exactly as provided. `XAISquareTransparent` is a package-provided UI variant that preserves the same 600×600 view box, clipping boundary, and black symbol paths while omitting only the visible white background rectangle. Neither xAI export inherits `currentColor`.

## Development

```bash
npm install
npm run build
npm run check
npm test
npm pack --dry-run
```

`icons.json` is the catalog source of truth. `icons.schema.json` defines its structure, and the build validates the manifest against that schema plus uniqueness, sort order, and source-file parity. The build then generates:

- ESM and CommonJS entry points
- per-icon wrappers
- the dynamic `LoadLogo` maps
- metadata exports and JSON
- TypeScript declarations

Generated `dist` output is intentionally ignored by Git. `prepack` rebuilds and validates it before npm publication, preventing stale generated files from being published.

The committed consumer tests pack the library and exercise clean ESM, CommonJS, per-icon subpath, server-rendering, MUI-compatible title forwarding, and declaration consumers. No CI workflow is included.

## Version 0.2 migration

Version 0.2 preserves named, default, dynamic, and per-icon imports. Existing `w`, `h`, and style-object `fill` calls continue to render. Icons no longer receive a default accessible title; this intentionally makes them decorative unless the caller supplies accessible semantics.

## Code and asset licensing

The package code, build tooling, tests, and original software documentation are available under the MIT License. **Individual brand assets are not necessarily covered by the MIT License.** Brand names and logos may remain subject to their owners' copyright, trademark, and brand-usage policies. Inclusion does not imply affiliation, sponsorship, or endorsement.

See [BRAND_ASSETS.md](./BRAND_ASSETS.md) and the generated metadata for provenance and classification details.
