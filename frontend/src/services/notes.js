export const majorScales = {
  c: ['c', 'd', 'e', 'f', 'g', 'a' ,'b'],
  g: ['g', 'a', 'b', 'c', 'd', 'e', 'f#'],
  d: ['d', 'e', 'f#', 'g', 'a', 'b', 'c#'],
  a: ['a', 'b', 'c#', 'd', 'e', 'f#', 'g#'],
  e: ['e', 'f#', 'g#', 'a', 'b', 'c#', 'd#'],
  b: ['b', 'c#', 'd#', 'e', 'f#', 'g#', 'a#'],
  fSharp: ['f#', 'g#', 'a#', 'b', 'c#', 'd#', 'e#'],
  cSharp: ['c#', 'd#', 'e#', 'f#', 'g#', 'a#', 'b#'],
  f: ['f', 'g', 'a', 'bb', 'c', 'd', 'e'],
  bb: ['bb', 'c', 'd', 'eb', 'f', 'g', 'a'],
  eb: ['eb', 'f', 'g', 'ab', 'bb', 'c', 'd'],
  ab: ['ab', 'bb', 'c', 'db', 'eb', 'f', 'g'],
  db: ['db', 'eb', 'f', 'gb', 'ab', 'bb', 'c'],
  gb: ['gb', 'ab', 'bb', 'cb', 'db', 'eb', 'f'],
  cb: ['cb', 'db', 'eb', 'fb', 'gb', 'ab', 'bb']
}

const getMajorScales = () => {
  return Object.keys(majorScales).map(key => key + '-maj')
}

export const chromaticSharp =
  ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']

//should cb be first? - if it was, also intervals.js-changeToEnharmonicNote() should be changed (case cb)
export const chromaticFlat =
 ['cb', 'c', 'db', 'd', 'eb', 'e', 'f', 'gb', 'g', 'ab', 'a', 'bb']

const addOctaveToNote = (note, currentOctave) => {
  if (currentOctave === 0) {
    return note.toLowerCase() + '_1'
  }

  if (currentOctave === 1) {
    return note.toLowerCase() + '_2'
  }

  if (currentOctave === 2) {
    return note.toLowerCase() + '_3'
  }

  throw new Error('currentOctave parameter value not allowed')
}

const createNotesWithOctaves = (notes, octaves = 1) => {

  let currentOctave = 0
  const notesWithOctaves = []
  const indexForOctaveChange = notes.findIndex(note => note[0] === 'c')
  // why this? explain ->
  if (indexForOctaveChange === 0) {
    currentOctave--
  }
  let octavesCreated = 0

  while (octavesCreated < octaves) {
    for (let i = 0; i < notes.length; i++) {
      if (i === indexForOctaveChange) {
        currentOctave++
      }

      notesWithOctaves.push(addOctaveToNote(notes[i], currentOctave))
    }

    octavesCreated++
  }

  if (notes[0][0] === 'c') {
    currentOctave++
  }

  notesWithOctaves.push(addOctaveToNote(notes[0], currentOctave))

  return notesWithOctaves
}

const getRandomNoteFromScale = scale => {
  if (scale.indexOf('-') === -1) {
    throw new Error('scale parameter has an incorrect form')
  }

  // toLowerCase() can be used for scaletypes, but not for the left side/bassnotes
  const [, scaleType] = scale.toLowerCase().split('-')

  if (scaleType === 'maj') {
    return getRandomNoteFromMajorScale(scale)
  } else if (scaleType === 'chrom') {
    return getRandomNoteFromChromaticScale(scale)
  }

  throw new Error('scale type could not be handled ')

}

const getRandomNoteFromMajorScale = scale => {
  const [bassNote, ] = scale.split('-')

  if (!majorScales[bassNote]) {
    throw new Error('scale not found')
  }

  const notesForScale = createNotesWithOctaves(majorScales[bassNote])

  return notesForScale[Math.floor(Math.random() * Math.floor(notesForScale.length))]
}

const getRandomNoteFromChromaticScale = scale => {
  const [chromatics, ] = scale.split('-')

  let notesForChromaticScale

  if (chromatics === 'flat') {
    notesForChromaticScale = createNotesWithOctaves(chromaticFlat)
  } else if (chromatics === 'sharp') {
    notesForChromaticScale = createNotesWithOctaves(chromaticSharp)
  } else {
    throw new Error('scale not valid')
  }

  return notesForChromaticScale[Math.floor(Math.random() * Math.floor(notesForChromaticScale.length))]
}

const getCorrectChromaticScale = scale => {
  if (scale.indexOf('-') === -1) {
    // consistency with: throw new Error VS console.log
    console.log('scale parameter has an incorrect form')
    return
  }

  const [bassNote, scaleType] = scale.split('-')

  if (scaleType === 'maj') {
    return getCorrectChromaticScaleForMajor(scale)
  } else if (scaleType === 'chrom') {
    return getCorrectChromaticScaleForChromatic(scale)
  }

  throw new Error('scale type could not be handled ')
}

const getCorrectChromaticScaleForMajor = scale => {
  if (scale.indexOf('-') === -1) {
    // consistency with: throw new Error VS console.log
    console.log('scale parameter has an incorrect form')
    return
  }

  const [bassNote, scaleType] = scale.split('-')
  //scaleType is NOT currently used

  if (!majorScales[bassNote]) {
    console.log('scale not found')
    return
  }

  if (/^(c|g|d|a|e|b|fSharp|cSharp)$/.test(bassNote)) {
    return createNotesWithOctaves(chromaticSharp, 2)
  }

  return createNotesWithOctaves(chromaticFlat, 2)
}

const getCorrectChromaticScaleForChromatic = scale => {

  return createNotesWithOctaves(chromaticFlat, 2)
}


// majorScales.e.forEach(note => console.log(`note: ${note}, isC = ${note[0] === 'c'}`))

// console.log(createNotesWithOctaves(majorScales.fSharp, 1))
// console.log(createNotesWithOctaves(majorScales.cSharp, 1))
// console.log(createNotesWithOctaves(majorScales.c))
// console.log(createNotesWithOctaves(chromaticSharp, 2))

//console.log(getRandomNoteFromScale('d-maj'))

// for (const scale in majorScales) {
//     console.log(`${scale}: ${getCorrectChromaticScaleForMajor(scale + '-maj')}`)
// }


export default {
  getRandomNoteFromScale,
  getCorrectChromaticScaleForMajor,
  getCorrectChromaticScaleForChromatic,
  getCorrectChromaticScale,
  getMajorScales,
}
