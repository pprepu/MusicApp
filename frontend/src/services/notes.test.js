import noteService from './notes'
import { majorScales, chromaticFlat, chromaticSharp } from './notes'

describe('notes.js', () => {

    // regex for the form returned major scales should have
    const correctForm = /^\w+-maj$/

    describe('getMajorScales()', () => {
        const namesForMajorScales = noteService.getMajorScales()
        test('returns the correct amount of major scales (15)', () => { 
            expect(namesForMajorScales.length).toBe(15)
        })

        test('returns all the major scales in the correct form', () => {
            for (let i = 0; i < namesForMajorScales.length; i++) {
                expect(correctForm.test(namesForMajorScales[i])).toBe(true)
            }
        })
    })

    describe('getRandomNoteFromScale()', () => {
        // helper functions
        const reformatNote = note => {
            const [ noteWithoutOctave, ] = note.split("_")
            return noteWithoutOctave
        }

        const getBassnoteFromScale = scale => {
            const [ bassnote, ] = scale.split("-")
            return bassnote
        }

        // how many random notes to get per test
        const numberOfNotes = 8

        // regex for the form returned notes should have
        const correctForm = /^\w+\W*_\d$/

        describe('throws an error with the correct error-message', () => {
            test('when the scale parameter is in an incorrect form (does not contain a "-")', () => {
                const correctMessage = 'scale parameter has an incorrect form'
                expect(() => { noteService.getRandomNoteFromScale('totallywrong') }).toThrow(correctMessage)
                expect(() => { noteService.getRandomNoteFromScale('c_maj') }).toThrow(correctMessage)
            })
            test('when the scale type cannot be handled by the method', () => {
                const correctMessage = 'scale type could not be handled'
                expect(() => { noteService.getRandomNoteFromScale('totally-wrong') }).toThrow(correctMessage)
                expect(() => { noteService.getRandomNoteFromScale('f-min') }).toThrow(correctMessage)
                expect(() => { noteService.getRandomNoteFromScale('ab--maj') }).toThrow(correctMessage)
                expect(() => { noteService.getRandomNoteFromScale('flat-chromm') }).toThrow(correctMessage)
            })
            test('when the given bassnote is not a valid one for a major scale', () => {
                const correctMessage = 'scale not found'
                expect(() => { noteService.getRandomNoteFromScale('c#-maj') }).toThrow(correctMessage)
                expect(() => { noteService.getRandomNoteFromScale('f#-maj') }).toThrow(correctMessage)
                expect(() => { noteService.getRandomNoteFromScale('abb-maj') }).toThrow(correctMessage)
                expect(() => { noteService.getRandomNoteFromScale('fb-maj') }).toThrow(correctMessage)
                expect(() => { noteService.getRandomNoteFromScale('bSharp-maj') }).toThrow(correctMessage)
                expect(() => { noteService.getRandomNoteFromScale('eSharp-maj') }).toThrow(correctMessage)
                expect(() => { noteService.getRandomNoteFromScale('dSharp-maj') }).toThrow(correctMessage)
                expect(() => { noteService.getRandomNoteFromScale('gSharp-maj') }).toThrow(correctMessage)
                expect(() => { noteService.getRandomNoteFromScale('aSharp-maj') }).toThrow(correctMessage)
                expect(() => { noteService.getRandomNoteFromScale('whatisthis-maj') }).toThrow(correctMessage)
            })

            test('when the given chromatics are not valid for the chromatic scale', () => {
                const correctMessage = 'scale not valid'
                expect(() => { noteService.getRandomNoteFromScale('flatt-chrom') }).toThrow(correctMessage)
                expect(() => { noteService.getRandomNoteFromScale('c-chrom') }).toThrow(correctMessage)
                expect(() => { noteService.getRandomNoteFromScale('sharb-chrom') }).toThrow(correctMessage)
            })
        })
        test('returns notes that belong to the given major scale', () => {

            // testing for all possible major scales
            const namesForMajorScales = noteService.getMajorScales()
            namesForMajorScales.forEach(currentScale => {
                const returnedNotes = []
                const notesForCurrentScale = majorScales[getBassnoteFromScale(currentScale)]

                // could be done without the array, but this seems easier to follow/understand?
                for (let i = 0; i < numberOfNotes; i++) {
                    returnedNotes.push(reformatNote(noteService.getRandomNoteFromScale(currentScale)))
                }
                // console.log('currentScale:', currentScale, 'all notes:', notesForCurrentScale, 'random notes:', returnedNotes)
                for (let i = 0; i < returnedNotes.length; i++) {
                    expect(notesForCurrentScale).toContain(returnedNotes[i])
                }
            })
        })
        test('returns notes in the correct form for a major scale', () => {

            
            const namesForMajorScales = noteService.getMajorScales()
            namesForMajorScales.forEach(currentScale => {
                expect(correctForm.test(noteService.getRandomNoteFromScale(currentScale))).toBe(true)
            })
        })

        test('returns notes that belong to the given chromatic scale', () => {
            const chromaticScaleTypes = ['flat-chrom', 'sharp-chrom']

            chromaticScaleTypes.forEach(currentScale => {
                const returnedNotes = []
                const notesForCurrentScale = currentScale === 'flat-chrom'
                                                ? chromaticFlat
                                                : chromaticSharp

                for (let i = 0; i < numberOfNotes; i++) {
                    returnedNotes.push(reformatNote(noteService.getRandomNoteFromScale(currentScale)))
                }
                // console.log('currentScale:', currentScale, 'all notes:', notesForCurrentScale, 'random notes:', returnedNotes)
                for (let i = 0; i < returnedNotes.length; i++) {
                    expect(notesForCurrentScale).toContain(returnedNotes[i])
                }
            })
        })
        test('returns notes in the correct form for a chromatic scale', () => {

            const chromaticScaleTypes = ['flat-chrom', 'sharp-chrom']
            chromaticScaleTypes.forEach(currentScale => {
                expect(correctForm.test(noteService.getRandomNoteFromScale(currentScale))).toBe(true)
            })
        })
    })
})