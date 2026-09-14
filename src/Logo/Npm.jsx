import React from 'react'

const Npm = ({fill={}, w=45, h=45, title="npm"}) => {
    return <svg
        style={fill}
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={w}
        height={h}>
            <title>{title}</title>
            <path d="M0 0v24h24V0H0zm4.5 4.5h15v15h-3.75V8.25H13.5V19.5H4.5V4.5z"/>
        </svg>
}

export default Npm
