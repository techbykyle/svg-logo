import React from 'react'

const Windows11 = ({ fill = {}, w = 45, h = 45, title = 'Windows 11' }) => (
    <svg
        style={fill}
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={w}
        height={h}>
        <title>{title}</title>
        <path fill="#0078D4" d="M0,0H11.377V11.372H0ZM12.623,0H24V11.372H12.623ZM0,12.623H11.377V24H0Zm12.623,0H24V24H12.623" />
    </svg>
)

export default Windows11
