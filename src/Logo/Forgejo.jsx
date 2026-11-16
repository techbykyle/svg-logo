import React from 'react'

const Forgejo = ({ fill = {}, w = 45, h = 45, title = 'Forgejo' }) => (
    <svg
        style={fill}
        role="img"
        viewBox="0 0 212 212"
        xmlns="http://www.w3.org/2000/svg"
        width={w}
        height={h}
        preserveAspectRatio="xMidYMid meet">
        <title>{title}</title>
        <g transform="translate(6,6)" fill="none" stroke="currentColor" strokeWidth="15">
            <path d="M58 168 v-98 a50 50 0 0 1 50-50 h20" strokeWidth="25" />
            <path d="M58 168 v-30 a50 50 0 0 1 50-50 h20" strokeWidth="25" />
            <circle cx="142" cy="20" r="18" />
            <circle cx="142" cy="88" r="18" />
            <circle cx="58" cy="180" r="18" />
        </g>
    </svg>
)

export default Forgejo
