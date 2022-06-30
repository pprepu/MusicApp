import React, { useState } from 'react'
import { useSelector, useDispatch, ReactReduxContext } from 'react-redux'
import { resetSession } from '../reducers/sessionReducer.js'
import { resetScales } from '../reducers/scaleReducer.js'
import { resetIntervals } from '../reducers/intervalReducer.js'

import { SubPage, Button } from '../globalStyles'
import { Table, TableBody, TableRow, TableText } from './SessionSummary.elements'

const SessionSummary = () => {
  const dispatch = useDispatch()
  const currentSession = useSelector(state => state.session)
  const currentScales = useSelector(state => state.scales)
  const currentIntervals = useSelector(state => state.intervals)

  const resetApp = () => {
    dispatch(resetSession())
    dispatch(resetScales())
    dispatch(resetIntervals())
  }

  // sama funktio kuin scalelistissä, vie johonki helperiin ja importaa näissä?
  const formatScale = scale => {
    let [bassNote,] = scale.split('-')
    bassNote = bassNote.replace('Sharp', '#')
    bassNote = Array.prototype.map.call(bassNote, (char, index) => index === 0 ? char.toUpperCase() : char)
    return bassNote.join('')
  }

  return (
    <SubPage>
      <Table>
        <TableBody>
          <TableRow header>
            <TableText>Exercise information</TableText>
          </TableRow>
          <TableRow>
            <TableText>Type</TableText>
            <TableText>Interval identification</TableText>
          </TableRow>
          <TableRow>
            <TableText>Score</TableText>
            <TableText>
              { currentSession.answersCorrect}/{currentSession.answersCorrect + currentSession.answersWrong } &nbsp;- &nbsp;
              { Number(currentSession.answersCorrect)/(Number(currentSession.answersCorrect) + Number(currentSession.answersWrong)) * 100 }%
            </TableText>
          </TableRow>
          <TableRow header>
            <TableText>Settings</TableText>
          </TableRow>
          <TableRow>
            <TableText>Clefs</TableText>
            <TableText>Treble</TableText>
          </TableRow>
          <TableRow>
            <TableText>Scales</TableText>
            <TableText>
              { currentScales.map((scale, i) => formatScale(scale) + (i !== currentScales.length - 1 ? ', ' : ''))}
            </TableText>
          </TableRow>
          <TableRow>
            <TableText>Intervals</TableText>
            <TableText size={currentIntervals.length}>
              { currentIntervals.map((interval, i) => interval + (i !== currentIntervals.length - 1 ? ', ' : ''))}
            </TableText>
          </TableRow>
          <TableRow header last>
            <TableText></TableText>
          </TableRow>
        </TableBody>
      </Table>
    </SubPage>
  )
}

export default SessionSummary