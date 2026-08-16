import React from 'react'

const Ranteater = ({ fill = {}, w = 45, h = 45, title = 'Ranteater' }) => (
    <svg
        style={fill}
        role="img"
        viewBox="0 0 336 336"
        xmlns="http://www.w3.org/2000/svg"
        width={w}
        height={h}
        preserveAspectRatio="xMidYMid meet">
        <title>{title}</title>
        <defs>
            <clipPath id="svg-logo-ranteater-disc-clip">
                <ellipse cx="168" cy="166.5" rx="162" ry="162" />
            </clipPath>
        </defs>
        <g transform="translate(0 1.5)">
            <ellipse
                cx="168"
                cy="166.5"
                rx="163.25"
                ry="163.25"
                fill="var(--svg-logo-ranteater-shadow, #05080e)"
                opacity="0.72"
            />
            <ellipse
                cx="168"
                cy="166.5"
                rx="162"
                ry="162"
                fill="var(--svg-logo-ranteater-disc, #70798c)"
                stroke="var(--svg-logo-ranteater-stroke, #252b36)"
                strokeWidth="1"
            />
            <g clipPath="url(#svg-logo-ranteater-disc-clip)">
                <path
                    fill="var(--svg-logo-ranteater-dark, #060b0f)"
                    d="M -8 342 L -8 186 C 18 223 35 267 60 287 C 64 268 72 249 85 232 C 108 204 141 190 176 190 C 216 190 255 203 296 231 L 350 231 L 350 342 Z"
                />
                <path
                    fill="var(--svg-logo-ranteater-disc, #70798c)"
                    d="M 161 329 C 150 318 138.5 294 142 270 C 143.5 239 171 205 210 205 C 239 204 267 211 291 228 L 350 215 L 350 350 L 161 350 Z"
                />
            </g>
            <path
                fill="var(--svg-logo-ranteater-body, #efedeb)"
                d="M 8.5 195 C 28 165 65 142 111.5 130.5 C 111.5 124 112.5 117.5 116.5 113.5 C 120.5 109.5 126.5 110 130.5 114 C 135 118.5 137 123.5 137.5 128 C 171 127.5 201.5 139 229.5 156 C 252 169.5 271.5 187 291.5 207.5 C 295.5 209.5 298.5 213.5 298.5 217.5 C 298.5 223.5 294 228.5 288 229 C 283.5 229.5 280 227 278 223.5 C 244.5 203.5 207.5 190.5 175.5 190.5 C 131 190.5 93 216.5 72.5 250 C 66 260.5 62 273.5 59.5 287.5 C 35 268 16.5 234.5 8.5 195 Z"
            />
            <ellipse
                cx="174.5"
                cy="163.2"
                rx="10.2"
                ry="8"
                transform="rotate(10 174.5 163.2)"
                fill="var(--svg-logo-ranteater-detail, #292f3a)"
            />
            <circle
                cx="288.2"
                cy="217.7"
                r="11"
                fill="var(--svg-logo-ranteater-highlight, #f2efed)"
            />
            <circle
                cx="288.2"
                cy="217.7"
                r="9.25"
                fill="var(--svg-logo-ranteater-detail, #292f3a)"
            />
        </g>
    </svg>
)

export default Ranteater
