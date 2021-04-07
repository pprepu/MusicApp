import noteService from './notes'

const HIGHEST_INTERVAL_DISTANCE = 12

export const allIntervals = ['perfect unison', 'minor second', 'major second', 'minor third', 'major third',
                      'perfect fourth', 'augmented fourth', 'perfect fifth', 'minor sixth', 'major sixth',
                      'minor seventh', 'major seventh', 'perfect octave']

const distanceToInterval = distance => {
    switch (distance) {
        case 0:
            return 'perfect unison'
        case 1:
            return 'minor second'
        case 2:
            return 'major second'
        case 3:
            return 'minor third'
        case 4:
            return 'major third'
        case 5:
            return 'perfect fourth'
        case 6:
            return 'augmented fourth'
        case 7:
            return 'perfect fifth'
        case 8:
            return 'minor sixth'
        case 9:
            return 'major sixth'
        case 10:
            return 'minor seventh'
        case 11:
            return 'major seventh'
        case 12:
            return 'perfect octave'
        default:
            return ''
    }
}

const intervalToDistance = interval => {
    switch (interval) {
        case 'perfect unison':
            return 0
        case 'minor second':
            return 1
        case 'major second':
            return 2
        case 'minor third':
            return 3
        case 'major third':
            return 4
        case 'perfect fourth':
            return 5
        case 'augmented fourth':
            return 6
        case 'perfect fifth':
            return 7
        case 'minor sixth':
            return 8
        case 'major sixth':
            return 9
        case 'minor seventh':
            return 10
        case 'major seventh':
            return 11
        case 'perfect octave':
            return 12
        default:
            return ''
    }
}

const changePitchOneOctave = pitch => {
    switch (pitch) {
        case '1':
            return '2'
        case '2':
            return '3'
        default:
            console.log('@ changePitchOneOctave - default')
            return pitch
    }
}

const changeToEnharmonicNote = note => {
    const [freq, pitch] = note.split('-')
    switch (freq) {
        // case 'cb':
        //     return `b-${pitch}`
        case 'fb':
            return `e-${pitch}`
        case 'e#':
            return `f-${pitch}`
        case 'b#':
            return `c-${changePitchOneOctave(pitch)}`
        default:
            return note
    }
}



const distanceForTwoNotes = (note1, note2, notes) => {
    note1 = changeToEnharmonicNote(note1)
    note2 = changeToEnharmonicNote(note2)

    const indexOfNote1 = notes.indexOf(note1)
    const indexOfNote2 = notes.indexOf(note2)

    if (indexOfNote1 === -1 || indexOfNote2 === -1) {
        console.log('note(s) not found', note1, note2, notes)
        return
    }

    return Math.abs(indexOfNote1 - indexOfNote2)
}

// hmm... should this be in another file/service? should it be named shuffleArrayInPlace?
const shuffleArray = array => {
    let currentIndex = array.length
    let randomIndex, placeholder

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
    
        placeholder = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = placeholder

      }
    
      //should this return anything?
      //return array
}

// correct interval IS CURRENTLY added to returned array as well...
const generateAllIntervals = (correctInterval, allIntervalsReceived, generatedIntervals = 6) => {
    correctInterval = correctInterval.toLowerCase()
    const distanceOfCorrectInterval = intervalToDistance(correctInterval)

    if (distanceOfCorrectInterval === '') {
        console.log(correctInterval)
        throw new Error('generatedOtherInterval called with an incorrect correctInterval parameter')
    }

    if (generatedIntervals >= HIGHEST_INTERVAL_DISTANCE - 1 || generatedIntervals < 0) {
        throw new Error('generatedOtherInterval called with an incorrect generatedIntervals parameter')
    }
    // tee allIntervalsista defaultti, jossa kaikki, sit voit poistaa allaolevan taulukon luomisen
    // lisää maholliseksi parametriksi "kaikki maholliset intervallit" sisältävä taulukko, joka korvaa mahd. defaultin

    let allIntervalsReceivedCopy = allIntervalsReceived.filter(interval => interval !== correctInterval)
    shuffleArray(allIntervalsReceivedCopy)

    let returnedIntervals = allIntervalsReceivedCopy.length >= generatedIntervals - 1
                                ? allIntervalsReceivedCopy.slice(0 , generatedIntervals - 1)
                                : allIntervalsReceivedCopy
    
    returnedIntervals.push(correctInterval)
    shuffleArray(returnedIntervals)
    return returnedIntervals
    // const allIntervals = []

    // for (let i = 0; i <= HIGHEST_INTERVAL_DISTANCE; i++) {
    //     if (i !== distanceOfCorrectInterval) {
    //         allIntervals.push(distanceToInterval(i))
    //     }
    // }

    // // alla olevaa voisi ehkä optimoida
    // shuffleArray(allIntervals)
    // let returnedIntervals = allIntervals.slice(0 , generatedIntervals - 1)

    // returnedIntervals.push(correctInterval)

    // shuffleArray(returnedIntervals)

    // return returnedIntervals
}

 const findIntervalForMajor = (note1, note2, scale) => 
     distanceToInterval(distanceForTwoNotes(note1, note2, noteService.getCorrectChromaticScale(scale)))


         //debugging
// const chromaticSharp = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 
//     'g', 'g#', 'a', 'a#', 'b']

// console.log(findIntervalForMajor('a', 'f#', chromaticSharp))

// console.log('testi')
// console.log(generateAllIntervals('Perfect octave'))

export default {
    findIntervalForMajor,
    generateAllIntervals
}