const formatDate = date => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString('en-GB')
}

const shuffleArrayInPlace = array => {
  let currentIndex = array.length
  let randomIndex, placeholder

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    placeholder = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = placeholder

  }
}

export default {
  formatDate,
  shuffleArrayInPlace
}