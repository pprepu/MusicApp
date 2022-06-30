import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startSettings } from '../reducers/sessionReducer.js'

import { SubPage, TextParagraph } from '../globalStyles.js'
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
    </SubPage>
  )

}

export default Frontpage