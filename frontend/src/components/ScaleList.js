import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addScale, removeScale, addMultipleScales, resetScales } from '../reducers/scaleReducer'
import { addInterval, removeInterval, addMultipleIntervals, resetIntervals } from '../reducers/intervalReducer'

import './ScaleList.css'
import { SubPage, Text, Button, StyledButton } from '../globalStyles'
import { ScaleButton, ScaleContainer, OptionList, OptionItem } from './ScaleList.elements'

import { startSession } from '../reducers/sessionReducer'

const ScaleItem = ({ scale, handleClick, isToggled }) => {

  const formatScale = scale => {
    let [bassNote,] = scale.split('-')
    bassNote = bassNote.replace('Sharp', '#')
    bassNote = Array.prototype.map.call(bassNote, (char, index) => index === 0 ? char.toUpperCase() : char)
    return bassNote.join('')
  }

  return (
    <OptionItem
      isToggled={isToggled}
      onClick={handleClick}>
      {formatScale(scale)}
    </OptionItem>
  )
}

const IntervalItem = ({ interval, handleClick, isToggled }) => {

  return (
    <OptionItem
      isToggled={isToggled}
      onClick={handleClick}>
      {interval}
    </OptionItem>
  )
}

const ScaleList = ( { scales, intervals } ) => {
  const [allScalesChosen, setAllScalesChosen] = useState(true)
  const [allIntervalsChosen, setAllIntervalsChosen] = useState(true)
  const [firstRun, setFirstRun] = useState([true, true])
  const dispatch = useDispatch()
  const scalesAdded = useSelector(state => state.scales)
  const intervalsAdded = useSelector(state => state.intervals)

  const chooseAllScales = () => {
    setAllScalesChosen(true)
    setFirstRun([false, firstRun[1]])
    dispatch(addMultipleScales(scales))
  }

  const chooseSpecificScales = () => {
    setAllScalesChosen(false)
    setFirstRun([false, firstRun[1]])
    dispatch(resetScales())
  }

  const chooseAllIntervals = () => {
    setAllIntervalsChosen(true)
    setFirstRun([firstRun[0], false])
    dispatch(addMultipleIntervals(intervals))
  }

  const chooseSpecificIntervals = () => {
    setAllIntervalsChosen(false)
    setFirstRun([firstRun[0], false])
    dispatch(resetIntervals())
  }

  return (
    <SubPage>
      <Text>
        Choose the scales you want to get the notes from:
      </Text>
      <ScaleContainer>
        <ScaleButton isToggled={firstRun[0] ? false : allScalesChosen ? true : false} onClick={() => chooseAllScales()}>all majors</ScaleButton>
        <ScaleButton isToggled={!allScalesChosen ? true : false} onClick={() => chooseSpecificScales()}>specific majors</ScaleButton>
      </ScaleContainer>
      {!allScalesChosen && <OptionList>
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
      </OptionList>}

      <Text>
        Choose the intervals you want to practice (at least 2):
      </Text>
      <ScaleContainer>
        <ScaleButton isToggled={firstRun[1] ? false : allIntervalsChosen ? true : false} onClick={() => chooseAllIntervals()}>all intervals</ScaleButton>
        <ScaleButton isToggled={!allIntervalsChosen ? true : false} onClick={() => chooseSpecificIntervals()}>specific intervals</ScaleButton>
      </ScaleContainer>
      <OptionList>
        {!allIntervalsChosen && intervals.map(interval =>
          <IntervalItem
            key={interval}
            interval={interval}
            handleClick={
              intervalsAdded.includes(interval)
                ? () => {
                  dispatch(removeInterval(interval))
                }
                : () => {
                  dispatch(addInterval(interval))
                }
            }
            isToggled={
              intervalsAdded.includes(interval)
            }
          />
        )}
      </OptionList>

      <ScaleContainer>
        {scalesAdded.length > 0 && intervalsAdded.length > 1 && <StyledButton big onClick={() => dispatch(startSession())}> START </StyledButton>}
      </ScaleContainer>
    </SubPage>
  )
  // return (
  //     <div>
  //         <p className='scalelist-p'>
  //             Choose the scales you want to get the notes from:
  //         </p>
  //     <div>
  //         <button className={firstRun[0] ? 'scaleButtonOff' : allScalesChosen ? 'scaleButtonOn' : 'scaleButtonOff'} onClick={() => chooseAllScales()}>all majors</button>
  //         <button className={!allScalesChosen ? 'scaleButtonOn' : 'scaleButtonOff'} onClick={() => chooseSpecificScales()}>specific majors</button>
  //     </div>
  //     {!allScalesChosen && <ul>
  //         {scales.map(scale =>
  //             <ScaleItem
  //                 key={scale}
  //                 scale={scale}
  //                 handleClick={
  //                     scalesAdded.includes(scale)
  //                     ? () => {
  //                         dispatch(removeScale(scale))
  //                         //console.log('removescale ' + scale)
  //                     }
  //                     : () => {
  //                         dispatch(addScale(scale))
  //                         //console.log('addscale ' + scale)
  //                     }
  //                 }
  //                 isToggled={
  //                     scalesAdded.includes(scale)
  //                 }
  //             />
  //         )}
  //     </ul>}
  //     <div>
  //     <p className='scalelist-p'>
  //             Choose the Intervals you want to practice (at least 2):
  //         </p>
  //     <div>
  //         <button className={firstRun[1] ? 'scaleButtonOff' : allIntervalsChosen ? 'scaleButtonOn' : 'scaleButtonOff'} onClick={() => chooseAllIntervals()}>all intervals</button>
  //         <button className={!allIntervalsChosen ? 'scaleButtonOn' : 'scaleButtonOff'} onClick={() => chooseSpecificIntervals()}>specific intervals</button>
  //     </div>
  //     <ul>
  //         {!allIntervalsChosen && intervals.map(interval =>
  //             <IntervalItem
  //                 key={interval}
  //                 interval={interval}
  //                 handleClick={
  //                     intervalsAdded.includes(interval)
  //                     ? () => {
  //                         dispatch(removeInterval(interval))
  //                     }
  //                     : () => {
  //                         dispatch(addInterval(interval))
  //                     }
  //                 }
  //                 isToggled={
  //                     intervalsAdded.includes(interval)
  //                 }
  //             />
  //         )}
  //     </ul>
  //     </div>

  //         <div>
  //         {scalesAdded.length > 0 && intervalsAdded.length > 1 && <button onClick={() => dispatch(startSession())}> START </button>}
  //     </div>
  //   </div>
  // )
}

export default ScaleList
