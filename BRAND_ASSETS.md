# Brand assets, provenance, and usage

The MIT License in this repository applies to package code, build scripts, tests, and original software documentation. It does not grant rights in third-party names, logos, trademarks, trade dress, or other brand assets merely because those assets are distributed by the package.

`icons.json` is the source of truth for the catalog. The published package exposes the same public records through `@techbykyle/svg-logo/metadata` and `@techbykyle/svg-logo/metadata.json`. Each record contains the known source, optional source and guidelines URLs, asset-license classification, visual variant, and color mode.

Records classified as `trademark` should be treated as identification assets belonging to their respective owners. Use them only to identify the corresponding product, company, service, or integration; do not imply affiliation, sponsorship, or endorsement. Consult the owner's current brand guidelines before public or commercial use.

Records classified as `project-owned` identify artwork controlled by the package maintainer or the named project. Their inclusion does not transfer ownership or create a separate trademark license.

## Newly added in 0.3.2

| Export | Source basis | Treatment | Classification |
| --- | --- | --- | --- |
| `ArchLinux` | Arch Linux's official [one-color SVG](https://archlinux.org/static/logos/archlinux-logo-black-scalable.svg), linked from its [artwork page](https://archlinux.org/art/) | Standalone symbol path retained exactly, without the wordmark or TM lettering. Its inherited transforms and fixed black fill are omitted; a square `22.734375 16.625 166.1875 166.1875` view box centers the original symbol geometry and allows `currentColor`. | `trademark` |
| `Debian` | Official [Debian Open Use Logo without text](https://www.debian.org/logos/openlogo-nd.svg), by Raul Silva | All 12 original vector paths retained; fixed red fills and editor metadata omitted. The 87.041×108.445 artwork is centered in a square `-10.702 0 108.445 108.445` view box and inherits `currentColor`. | `open-source` |
| `Fedora` | [Simple Icons `fedora.svg`](https://github.com/simple-icons/simple-icons/blob/develop/icons/fedora.svg) | Original 24×24 standalone mark and single path retained, inheriting `currentColor`. | `trademark` |
| `LinuxMint` | [Simple Icons `linuxmint.svg`](https://github.com/simple-icons/simple-icons/blob/develop/icons/linuxmint.svg) | Original 24×24 circular LM mark and single path retained, inheriting `currentColor`. | `trademark` |
| `Manjaro` | [Simple Icons `manjaro.svg`](https://github.com/simple-icons/simple-icons/blob/develop/icons/manjaro.svg) | Original 24×24 rounded mark and single path retained, inheriting `currentColor`. | `trademark` |
| `OpenSUSE` | [Simple Icons `opensuse.svg`](https://github.com/simple-icons/simple-icons/blob/develop/icons/opensuse.svg) | Original 24×24 circular Geeko-head mark and single path retained, inheriting `currentColor`. | `trademark` |

These are transparent, monochrome UI treatments. They identify the distributions without adding wordmarks or background tiles. Fedora's [brand resources](https://docs.fedoraproject.org/en-US/project/brand/) describe its logo usage.

The Debian artwork is copyright © 1999 Software in the Public Interest, Inc., created by Raul Silva, and distributed here under [Creative Commons Attribution-ShareAlike 3.0 Unported](https://creativecommons.org/licenses/by-sa/3.0/), as permitted by [Debian's logo license](https://www.debian.org/logos/). The monochrome square adaptation remains under that license; the changes are listed above. This asset license is separate from the package code's MIT License, and Debian's trademarks remain subject to its policies.

## Newly added in 0.3.1

| Export | Source basis | Treatment | Classification |
| --- | --- | --- | --- |
| `Ubuntu` | Canonical's official standalone [Circle of Friends SVG](https://assets.ubuntu.com/v1/82818827-CoF_white.svg), used on [ubuntu.com](https://ubuntu.com/) | All three circle elements and three vector paths retained exactly. The 60.45×57.87 canvas is centered in a square `0 -1.29 60.45 60.45` view box; fixed white fills are omitted so the mark inherits `currentColor`. Transparent background; no extended orange tag or wordmark. | `trademark` |
| `Canonical` | Same official Ubuntu Circle of Friends SVG | Identical square geometry and monochrome treatment, exposed under a separate identifier at the maintainer's request. This is a package-provided alias for the Ubuntu mark, not Canonical's separate corporate wordmark. | `trademark` |

These are package-provided UI treatments derived from the official standalone vector asset. Brand resources are available from [Canonical Design](https://design.ubuntu.com/resources).

## Newly added in 0.2.9

| Export | Source basis | Treatment | Classification |
| --- | --- | --- | --- |
| `LinkedIn` | Legacy Simple Icons `linkedin.svg`, based on LinkedIn brand assets | Original 24×24 path retained; the fixed fill is omitted so the mark inherits `currentColor`. Consult LinkedIn’s current brand policies before use. | `trademark` |

## Newly added in 0.2.8

| Export | Source basis | Treatment | Classification |
| --- | --- | --- | --- |
| `Npm` | Simple Icons `npm.svg` | Official 24×24 npm mark retained as a single path; the fixed fill is omitted so the mark inherits `currentColor`. | `trademark` |

## Newly added in 0.2.7

| Export | Source basis | Treatment | Classification |
| --- | --- | --- | --- |
| `ACP` | User-supplied `acp_mark-black.svg` | Original vector path and wide view box retained; fixed black fill removed so the mark inherits `currentColor`. | `unknown` |

## Newly added in 0.2.6

| Export | Source basis | Treatment | Classification |
| --- | --- | --- | --- |
| `ClaudeCodeMonochrome` | Anthropic press kit, `Claude Spark - Clay.svg` | Official 94×94 view box and path geometry retained; the Clay fill is omitted so the path inherits `currentColor`. | `trademark` |
| `OpenCodeMonochrome` | OpenCode official repository, `favicon-v3.svg` | Official two-path logo geometry retained; the fixed background rectangle and explicit path fills are omitted so both paths inherit `currentColor`. | `trademark` |
| `XAISquareTransparent` | xAI/SpaceXAI media kit, `spacexai - symbol - black - squared.svg` | Official 600×600 view box, clipping boundary, and black paths retained; only the visible white background rectangle is omitted. | `trademark` |

The existing `ClaudeCode`, `OpenCode`, and `XAI` exports remain unchanged as the official-color assets. The new exports are package-provided UI variants for uniform icon systems; they are not additional official brand-kit files.

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
