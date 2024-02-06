import axios from 'axios'

const ncNewsAPI = axios.create({
    baseURL: "https://nc-news-3uh0.onrender.com/api"
})

export function getArticles() {
    return ncNewsAPI.get("/articles").then((response) => {
        return response.data
    })
}

export function getArticleID(chosenArticleID){
    return ncNewsAPI.get(`/articles/${chosenArticleID}`).then((response) => {
        return response.data
    })
}