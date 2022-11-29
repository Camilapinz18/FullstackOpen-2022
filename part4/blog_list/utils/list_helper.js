const dummy = (blogs) => {
    if (blogs) {
        return 1
    }
}

const totalLikes = (blogs) => {
    const reducer = blogs.reduce((total, blogs) =>
        total + blogs.likes, 0)

    console.log('reducer:', reducer)

    return reducer
}


module.exports = {
    dummy,
    totalLikes
}