const formatDate = date => {
    // return date.slice(0, 10)
    // return date.split('T')[0]
    const newDate = new Date(date)
    return newDate.toLocaleDateString('en-GB')
}

export default {
    formatDate,
}