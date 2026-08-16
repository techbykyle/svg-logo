import React from 'react'

function isLegacyStyle(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function isAriaHidden(value) {
    return value === true || value === 'true'
}

function isAriaVisible(value) {
    return value === false || value === 'false'
}

function extractTitleFromChildren(children) {
    let extractedTitle

    React.Children.forEach(children, (child) => {
        if (extractedTitle || !React.isValidElement(child)) {
            return
        }

        if (child.type === 'title') {
            const content = React.Children.toArray(child.props.children).join('')
            if (content) {
                extractedTitle = content
            }
            return
        }

        if (child.type === React.Fragment) {
            extractedTitle = extractTitleFromChildren(child.props.children)
        }
    })

    return extractedTitle
}

export function createLogoComponent(RawLogo, metadata) {
    const Logo = React.forwardRef(function LogoComponent(props = {}, ref) {
        const {
            size,
            width,
            height,
            w,
            h,
            title,
            titleAccess,
            fill,
            style,
            children,
            dangerouslySetInnerHTML: _dangerouslySetInnerHTML,
            role: suppliedRole,
            focusable: suppliedFocusable,
            'aria-hidden': suppliedAriaHidden,
            'aria-label': suppliedAriaLabel,
            'aria-labelledby': suppliedAriaLabelledBy,
            ownerState: _ownerState,
            ...svgProps
        } = props

        const resolvedWidth = width ?? w ?? size ?? 45
        const resolvedHeight = height ?? h ?? size ?? 45
        const resolvedTitle = title ?? titleAccess ?? extractTitleFromChildren(children)
        const legacyStyle = isLegacyStyle(fill) ? fill : undefined
        const resolvedFill = legacyStyle || fill == null ? 'currentColor' : fill
        const mergedStyle = {
            ...(legacyStyle || {}),
            ...(style || {})
        }
        const hasStyle = Object.keys(mergedStyle).length > 0
        const rawElement = RawLogo({
            w: resolvedWidth,
            h: resolvedHeight,
            fill: {},
            title: ''
        })

        if (!React.isValidElement(rawElement) || rawElement.type !== 'svg') {
            throw new TypeError(`${metadata.exportName} must return an SVG root element`)
        }

        const iconChildren = React.Children.toArray(rawElement.props.children)
            .filter((child) => !(React.isValidElement(child) && child.type === 'title'))
        const explicitlyHidden = isAriaHidden(suppliedAriaHidden)
        const meaningfulRole = suppliedRole && suppliedRole !== 'presentation' && suppliedRole !== 'none'
        const semantic = !explicitlyHidden && Boolean(
            resolvedTitle ||
            suppliedAriaLabel ||
            suppliedAriaLabelledBy ||
            meaningfulRole ||
            isAriaVisible(suppliedAriaHidden)
        )
        const titleElement = semantic && resolvedTitle
            ? React.createElement('title', { key: '__svg_logo_title' }, resolvedTitle)
            : null
        const rootProps = {
            ...rawElement.props,
            ...svgProps,
            ref,
            width: resolvedWidth,
            height: resolvedHeight,
            fill: resolvedFill,
            style: hasStyle ? mergedStyle : undefined,
            role: suppliedRole ?? (semantic ? 'img' : undefined),
            focusable: suppliedFocusable ?? false,
            'aria-hidden': suppliedAriaHidden ?? (semantic ? undefined : true),
            'aria-label': suppliedAriaLabel ?? (
                semantic && resolvedTitle && !suppliedAriaLabelledBy ? resolvedTitle : undefined
            ),
            'aria-labelledby': suppliedAriaLabelledBy
        }

        delete rootProps.children

        return React.cloneElement(
            rawElement,
            rootProps,
            titleElement,
            ...iconChildren
        )
    })

    Logo.displayName = metadata.exportName
    Object.defineProperty(Logo, 'metadata', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: metadata
    })

    return Logo
}
