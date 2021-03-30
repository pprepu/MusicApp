import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startSettings } from '../reducers/sessionReducer.js'
import './Frontpage.css'
const Frontpage = () => {

    const dispatch = useDispatch()

    return (
        <div>
            <p className='front-p'>
                This is where a very short description about the app should go. However, I haven't written it yet, so here's a 
                placeholder that has about the same length and formatting.
            </p>
            <p className='front-p'>
                I'm sure there's gonna be at least a couple paragraphs, so here's some extra text. Wish there was something more
                interesting to write about, honestly, but here we are.
            </p>
            <p className='front-p'>
                Here's the last sentence.
            </p>
            <button onClick={() => dispatch(startSettings())}> QUICK PRACTICE </button>
        </div>
    )
}

export default Frontpage