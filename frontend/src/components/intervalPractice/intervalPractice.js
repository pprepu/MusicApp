const notesForOctaveSharp = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 
                            'g', 'g#', 'a', 'a#', 'b']

const notesForOctaveFlat = ['c', 'db', 'd', 'eb', 'e', 'f', 'gb', 
                            'g', 'ab', 'a', 'bb', 'cb']

const majorSequence = [2, 2, 1, 2, 2, 2, 1]

const addOctaveToNote = (note, currentOctave) => {
    if (currentOctave === 0) {
        return note.toLowerCase() + "1"
    }

    if (currentOctave === 1) {
        return note.toLowerCase() + "2"
    }

    throw new Error('currentOctave parameter value not allowed')
}

const createNotes = (octaves = 2, flat = false) => {
    
    let currentOctave = 0
    const allNotes = []

    while (currentOctave < octaves) {
        if (!flat) {
            for (let i = 0; i < notesForOctaveSharp.length; i++) {
                allNotes.push(addOctaveToNote(notesForOctaveSharp[i], currentOctave))
            }
        } else {
            for (let i = 0; i < notesForOctaveFlat.length; i++) {
                allNotes.push(addOctaveToNote(notesForOctaveFlat[i], currentOctave))
            }
        }
        
        currentOctave++
    }

    return allNotes
}

const createNotesForMajor = (baseNote, allNotes) => {
    //kaikki paitsi f# ja c# duurit
    if (/(d#|g#|a#|c#|f#|cb)/i.test(baseNote)) {
        throw new Error(`${baseNote} is not allowed`)
        return
    }

    const majorNotes = []
    // huom. basenoten korkeus oletettu!
    let currentNoteIndex = allNotes.indexOf(`${baseNote}1`)

    if (currentNoteIndex === -1) {
        throw new Error('Parameter not allowed')
    }

    majorNotes.push(allNotes[currentNoteIndex])

    for (let i = 0; i < majorSequence.length; i++) {
        currentNoteIndex += majorSequence[i]
        majorNotes.push(allNotes[currentNoteIndex])
    }

    return majorNotes
}

const distanceToInterval = distance => {
    switch (distance) {
        case 0:
            return 'Perfect unison'
        case 1:
            return 'Minor second'
        case 2:
            return 'Major second'
        case 3:
            return 'Minor third'
        case 4:
            return 'Major third'
        case 5:
            return 'Perfect fourth'
        case 6:
            return 'Augmented fourth'
        case 7:
            return 'Perfect fifth'
        case 8:
            return 'Minor sixth'
        case 9:
            return 'Major sixth'
        case 10:
            return 'Minor seventh'
        case 11:
            return 'Major seventh'
        case 12:
            return 'Perfect octave'
        default:
            return ''
    }
}

const changeToEnharmonicNote = note => {
    switch (note) {
        case 'cb':
            return 'b'
        case 'fb':
            return 'e'
        case 'e#':
            return 'f'
        case 'b#':
            return 'c'
        default:
            return note
}

const distanceForTwoNotes = (note1, note2, notes) => {
    note1 = changeToEnharmonicNote(note1)
    note2 = changeToEnharmonicNote(note2)

    const indexOfNote1 = notes.indexOf(note1)
    const indexOfNote2 = notes.indexOf(note2)

    if (indexOfNote1 === -1 || indexOfNote2 === -1) {
        console.log('note(s) not found')
        return
    }

    return Math.abs(indexOfNote1 - indexOfNote2)
}

let allNotesSharp = createNotes(2)

let currentScale = createNotesForMajor('g', allNotesSharp)

for (let i = 0; i < currentScale.length; i++) {
    console.log(`Interval between 
        ${currentScale[0]} and ${currentScale[i]} is ${distanceToInterval(distanceForTwoNotes(currentScale[0], currentScale[i], allNotesSharp))}`)
}

let allNotesFlat = createNotes(2, true)

let currentScale2 = createNotesForMajor('ab', allNotesFlat)

for (let i = 0; i < currentScale2.length; i++) {
    console.log(`Interval between 
        ${currentScale2[0]} and ${currentScale2[i]} is ${distanceToInterval(distanceForTwoNotes(currentScale2[0], currentScale2[i], allNotesFlat))}`)
}

// for (let i = 0; i < notesForOctaveSharp.length; i++) {
//     console.log(createNotesForMajor(notesForOctaveSharp[i], allNotes))
// }