import React from 'react'

const MicrosoftColor = ({ fill = {}, w = 45, h = 45, title = 'Microsoft' }) => (
    <svg
        style={fill}
        role="img"
        viewBox="0 0 21 21"
        xmlns="http://www.w3.org/2000/svg"
        width={w}
        height={h}>
        <title>{title}</title>
        <rect x="1" y="1" width="9" height="9" fill="#F25022" />
        <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
        <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
        <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
)

export default MicrosoftColor
