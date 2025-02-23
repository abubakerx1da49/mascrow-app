"use client";

import React from 'react'
import Squares from './Squares'

const SquareBGComponent = () => {
    return (
        <div className='fixed top-0 left-0 w-screen h-screen invert-0 md:block hidden'>
            <Squares
                speed={0.5}
                squareSize={40}
                direction='down' // up, down, left, right, diagonal
                borderColor='#ddd'
                hoverFillColor='#fff'
            />
        </div>
    )
}

export default SquareBGComponent