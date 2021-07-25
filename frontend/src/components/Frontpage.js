import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startSettings } from '../reducers/sessionReducer.js'

import { SubPage, TextParagraph } from '../globalStyles.js'
// import './Frontpage.css'
const Frontpage = () => {

    const dispatch = useDispatch()

    return (
        <SubPage>
            <TextParagraph>
                Welcome to --insert app name here--!
            </TextParagraph>
            <TextParagraph>
                This application is a learning tool for getting better at recognizing musical intervals between different notes.
                In practice mode you can decide which intervals and scales you want to focus on and then the app will test your
                knowledge according to the choices you have made.
            </TextParagraph>
            <TextParagraph>
                It is also possibly to create an account, which currently gives you an access to your practice history to better
                see which intervals/notes might be more problematic than others.
            </TextParagraph>
            <TextParagraph>
                If you want to read a more detailed description about not only the app, but the technologies used in its creation, 
                the About-page contains all this information. Also, the practice -link in the navbar will start your journey towards 
                better musical understanding.
            </TextParagraph>
            <TextParagraph>
                Enjoy your visit!
            </TextParagraph>
            {/* <button onClick={() => dispatch(startSettings())}> QUICK PRACTICE </button> */}
        </SubPage>
    )

    // return (
    //     <div>
    //         <p className='front-p'>
    //             This is where a very short description about the app should go. However, I haven't written it yet, so here's a 
    //             placeholder that has about the same length and formatting.
    //         </p>
    //         <p className='front-p'>
    //             I'm sure there's gonna be at least a couple paragraphs, so here's some extra text. Wish there was something more
    //             interesting to write about, honestly, but here we are.
    //         </p>
    //         <p className='front-p'>
    //             Here's the last sentence.
    //         </p>
    //         <button onClick={() => dispatch(startSettings())}> QUICK PRACTICE </button>
    //     </div>
    // )
}

export default Frontpage