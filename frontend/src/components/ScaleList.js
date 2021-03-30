import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addScale, removeScale } from '../reducers/scaleReducer'
import './ScaleList.css'
import { startSession } from '../reducers/sessionReducer'

const ScaleItem = ({ scale, handleClick, isToggled }) => {

    return isToggled
        ? (
            <button className='scaleButtonOn' onClick={handleClick}>
                {scale}
            </button>
        )
        : (
            <button className='scaleButtonOff' onClick={handleClick}>
                {scale}
            </button>
        )
}
const ScaleList = ( {scales} ) => {
    const dispatch = useDispatch()
    const scalesAdded = useSelector(state => state.scales)
    return (
        <div>
        <p className='scalelist-p'>
            Choose the scales you want to get the notes from:
        </p>
        <ul>
            {scales.map(scale => 
                <ScaleItem
                    key={scale}
                    scale={scale} 
                    handleClick={
                        scalesAdded.includes(scale) 
                        ? () => {
                            dispatch(removeScale(scale))
                            //console.log('removescale ' + scale)
                        } 
                        : () => {
                            dispatch(addScale(scale))
                            //console.log('addscale ' + scale)
                        }
                    }
                    isToggled={
                        scalesAdded.includes(scale)
                    }
                />
            )}
        </ul>
            <div>
            {scalesAdded.length > 0 && <button onClick={() => dispatch(startSession())}> START </button>}
        </div>
      </div>
    )
}

export default ScaleList
