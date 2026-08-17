# Brand assets, provenance, and usage

The MIT License in this repository applies to package code, build scripts, tests, and original software documentation. It does not grant rights in third-party names, logos, trademarks, trade dress, or other brand assets merely because those assets are distributed by the package.

`icons.json` is the source of truth for the catalog. The published package exposes the same public records through `@techbykyle/svg-logo/metadata` and `@techbykyle/svg-logo/metadata.json`. Each record contains the known source, optional source and guidelines URLs, asset-license classification, visual variant, and color mode.

Records classified as `trademark` should be treated as identification assets belonging to their respective owners. Use them only to identify the corresponding product, company, service, or integration; do not imply affiliation, sponsorship, or endorsement. Consult the owner's current brand guidelines before public or commercial use.

Records classified as `project-owned` identify artwork controlled by the package maintainer or the named project. Their inclusion does not transfer ownership or create a separate trademark license.

## Newly added in 0.2.5

| Export | Source basis | Treatment | Classification |
| --- | --- | --- | --- |
| `Anthropic` | Anthropic press kit, `Anthropic symbol - Slate.svg` | Original view box and vector paths retained; the single Slate fill was removed so the mark inherits `currentColor`. | `trademark` |
| `ClaudeCode` | Anthropic press kit, `Claude Spark - Clay.svg` | Original view box, vector path, and Clay `#D97757` fill retained. Exported as the Claude Code identifier rather than claiming a separate Claude Code wordmark. | `trademark` |
| `GitHubCopilot` | GitHub Primer Octicons, `copilot-24.svg` | Official 24px vector paths retained without fixed fills so the mark inherits `currentColor`. | `trademark` |
| `OpenCode` | OpenCode official repository, `favicon-v3.svg` | Redundant nested SVG and media-query wrapper removed; official view box, geometry, and fixed three-color palette retained. | `trademark` |
| `XAI` | xAI/SpaceXAI media kit, `spacexai - symbol - black - squared.svg` | Official 600×600 view box, clipping, white square background, and black vector paths retained exactly; only SVG-to-JSX attribute syntax was changed. | `trademark` |

`XAI` remains fixed-color because xAI's brand guidelines require its logos to be used exactly as provided, without alteration or adjustment.

## Newly added in 0.2.0

| Export | Source basis | Treatment | Classification |
| --- | --- | --- | --- |
| `Grok` | User-supplied `Grok_Logomark_Dark.svg` | Original vector paths retained; fixed black fills removed so the mark inherits `currentColor`. | `trademark` |
| `GrokKFull` | User-supplied `Grok_Full_Logomark_Dark(1).svg` | Original vector paths and wide view box retained; fixed black fills removed so the mark inherits `currentColor`. | `trademark` |
| `Ranteater` | Ranteater project artwork | Original gradients flattened into a stable palette, the 336×333 canvas centered in a square 336×336 view box, and palette values exposed through CSS custom properties. | `project-owned` |

Some legacy assets predate the metadata manifest and have no verified source URL recorded. A null source or guidelines URL means the repository does not currently document that provenance; it is not a representation that the asset is unrestricted.

Corrections to provenance, licensing classification, official geometry, or brand-guideline links should be made in `icons.json` before expanding use of an affected asset.
