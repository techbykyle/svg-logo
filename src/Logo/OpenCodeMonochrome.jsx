import React from 'react'

const OpenCodeMonochrome = ({ fill = {}, w = 45, h = 45, title = 'OpenCode' }) => (
    <svg
        style={fill}
        role="img"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        width={w}
        height={h}
        preserveAspectRatio="xMidYMid meet">
        <title>{title}</title>
        <path d="M320 224V352H192V224H320Z" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M384 416H128V96H384V416ZM320 160H192V352H320V160Z" />
    </svg>
)

export default OpenCodeMonochrome
