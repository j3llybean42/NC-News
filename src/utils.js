import axios from 'axios'

const ncNewsAPI = axios.create({
    baseURL: "https://nc-news-3uh0.onrender.com/api"
})

export function getArticles() {
    return ncNewsAPI.get("/articles").then((response) => {
        return response.data
    })
}

export function getArticleID(article_id){
    return ncNewsAPI.get(`/articles/${article_id}`).then((response) => {
        return response.data
    })
}

export function getComments(article_id){
    return ncNewsAPI.get(`/articles/${article_id}/comments`).then((response) => {
        return response.data
    })
}

export function patchArticle(article_id, request){
    return ncNewsAPI.patch(`/articles/${article_id}`, request)
}