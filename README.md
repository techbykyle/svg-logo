# @techbykyle/svg-logo

A lightweight React icon pack containing SVG logos for popular technology and smart-home brands.

## Install

```bash
npm install @techbykyle/svg-logo
```

React 17 or newer is required.

## Usage

Import an individual icon by name:

```jsx
import { GitHub } from '@techbykyle/svg-logo'

export function ProfileLink() {
    return <GitHub w={32} h={32} title="GitHub" fill={{ fill: '#181717' }} />
}
```

Use `LoadLogo` when the icon name is selected dynamically:

```jsx
import LoadLogo from '@techbykyle/svg-logo'

export function BrandLogo({ brand }) {
    return <LoadLogo iconPath={brand} w={48} h={48} />
}
```

For the smallest possible import, use an icon subpath:

```jsx
import GitHub from '@techbykyle/svg-logo/icons/GitHub'
```

Every icon accepts:

- `w`: SVG width, default `45`
- `h`: SVG height, default `45`
- `title`: accessible SVG title
- `fill`: a React style object applied to the SVG, such as `{ fill: '#fff' }`

The package includes TypeScript declarations and both ES module and CommonJS builds.

## Available icons

Amazon, Apple, Aqara, Cisco, Gitea, GitHub, GitLab, GLiNet, Google, HomeAssistant, HomeDepot, Microsoft, Mqtt, MSI, Netgate, Netgear, NewEgg, OpenAi, Opensource, Reolink, Samsung, Shelly, Ubiquiti, VsCode, Wellcube, and Xiaomi.

## Development

```bash
npm install
npm run build
npm run check
```

`npm publish` automatically rebuilds and verifies the package through the `prepack` script.

## License

The source code is available under the MIT License. Brand names and logos remain trademarks of their respective owners; inclusion in this package does not imply affiliation or endorsement.
