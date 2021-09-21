import intervalService, { allIntervals } from './intervals'

const removeDuplicatesFromArray = array => {
  return [ ...new Set(array) ]
}

describe('interval-service, ', () => {
  describe('findIntervalForMajor-method: ', () => {
    test('works with arbitrarily chosen notes from different scales', () => {
      expect(intervalService.findIntervalForMajor('c_1', 'c_1', 'c-maj')).toBe('perfect unison')
      expect(intervalService.findIntervalForMajor('a_1', 'd_2', 'g-maj')).toBe('perfect fourth')
      expect(intervalService.findIntervalForMajor('a_1', 'd_1', 'd-maj')).toBe('perfect fifth')
      expect(intervalService.findIntervalForMajor('g#_2', 'b_1', 'a-maj')).toBe('major sixth')
      expect(intervalService.findIntervalForMajor('e_1', 'e_2', 'e-maj')).toBe('perfect octave')
      expect(intervalService.findIntervalForMajor('c#_2', 'd#_2', 'b-maj')).toBe('major second')
      expect(intervalService.findIntervalForMajor('e#_2', 'f#_1', 'fSharp-maj')).toBe('major seventh')
      expect(intervalService.findIntervalForMajor('f#_1', 'b#_1', 'cSharp-maj')).toBe('augmented fourth') // pay attention to this, if you make changes!
      expect(intervalService.findIntervalForMajor('a_1', 'bb_1', 'f-maj')).toBe('minor second')
      expect(intervalService.findIntervalForMajor('d_2', 'eb_2', 'bb-maj')).toBe('minor second')
      expect(intervalService.findIntervalForMajor('f_1', 'd_2', 'eb-maj')).toBe('major sixth')
      expect(intervalService.findIntervalForMajor('g_2', 'ab_1', 'ab-maj')).toBe('major seventh')
      expect(intervalService.findIntervalForMajor('eb_1', 'bb_1', 'db-maj')).toBe('perfect fifth')
      expect(intervalService.findIntervalForMajor('ab_1', 'gb_2', 'gb-maj')).toBe('minor seventh')
      expect(intervalService.findIntervalForMajor('cb_2', 'cb_2', 'cb-maj')).toBe('perfect unison')
    })
  })

  describe('generateAllIntervals-method: ', () => {

    const intervalArray_All = [ ...allIntervals ]

    test('returned array contains the original interval, does not have duplicates and has the correct default size', () => {
      const originalInterval = 'minor sixth'
      const returnedIntervals = intervalService.generateAllIntervals(originalInterval, intervalArray_All)
      const nonDuplicates = removeDuplicatesFromArray(returnedIntervals)

      expect(returnedIntervals).toContain(originalInterval)
      expect(returnedIntervals.length).toBe(6)
      expect(returnedIntervals.length).toEqual(nonDuplicates.length)
    })

    test('returned array contains the original interval, does not have duplicates and has the correct size when it is created from fewer potential intervals', () => {
      const originalInterval = 'major third'
      const intervalArray_Custom = [ intervalArray_All[2], intervalArray_All[4], intervalArray_All[7] ]
      const returnedIntervals = intervalService.generateAllIntervals(originalInterval, intervalArray_Custom)
      const nonDuplicates = removeDuplicatesFromArray(returnedIntervals)

      expect(returnedIntervals).toContain(originalInterval)
      expect(returnedIntervals.length).toBe(3)
      expect(returnedIntervals.length).toEqual(nonDuplicates.length)
    })

    test('returned array has the requested amount of intervals when a valid non-default argument for the number of generated intervals is used', () => {
      const originalInterval = 'perfect octave'
      const returnedIntervals = intervalService.generateAllIntervals(originalInterval, intervalArray_All, 9)
      const nonDuplicates = removeDuplicatesFromArray(returnedIntervals)

      expect(returnedIntervals).toContain(originalInterval)
      expect(returnedIntervals.length).toBe(9)
      expect(returnedIntervals.length).toEqual(nonDuplicates.length)
    })

    test('throws the correct error, when an invalid argument (too big) is used for the number of generated intervals', () => {
      const originalInterval = 'perfect unison'

      expect(() => intervalService.generateAllIntervals(originalInterval, intervalArray_All, 12)).toThrow('generatedOtherInterval called with an incorrect generatedIntervals parameter')
    })

    test('throws the correct error, when an invalid argument (too small) is used for the number of generated intervals', () => {
      const originalInterval = 'perfect fifth'

      expect(() => intervalService.generateAllIntervals(originalInterval, intervalArray_All, 0)).toThrow('generatedOtherInterval called with an incorrect generatedIntervals parameter')
    })

    test('throws the correct error, when the argument for the correct interval is not recognized', () => {
      const originalInterval = 'perfect ten'

      expect(() => intervalService.generateAllIntervals(originalInterval, intervalArray_All, 6)).toThrow('generatedOtherInterval called with an incorrect correctInterval parameter')
    })
  })
})