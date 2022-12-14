/* eslint-disable no-unreachable */
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

const favoriteBlog = (blogs) => {
    const blogLikes=[]
    //Identificar el mayor numero de likes:
    blogs.map(blog=>blogLikes.push(blog.likes))    
    const max=blogLikes.reduce((a,b)=>Math.max(a,b))
  
    let mostLiked={
        'title':'',
        'author':'',
        'likes':0,
    }
    //Buscar a cual nojeto equivale el 12, comparar:
    blogs.map(blog=>{
        if(blog.likes===max){
            mostLiked={
                'title':blog.title,
                'author':blog.author,
                'likes':blog.likes,
            }
        } 
    })    
    console.log('mostliked',typeof(mostLiked))
    return mostLiked
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}