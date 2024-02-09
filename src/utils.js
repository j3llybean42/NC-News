import axios from 'axios'

const ncNewsAPI = axios.create({
    baseURL: "https://nc-news-3uh0.onrender.com/api"
})

export function getArticles(params) {
    return ncNewsAPI.get("/articles", params).then((response) => {
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

export function postComment(article_id, request){
    return ncNewsAPI.post(`/articles/${article_id}/comments`, request)
}

export function deleteComment(comment_id){
    return ncNewsAPI.delete(`/comments/${comment_id}`)
}

export function getTopics(){
    return ncNewsAPI.get("/topics").then((response) => {
        return response.data
    })
}

export function patchComment(comment_id, request){
    return ncNewsAPI.patch(`/comments/${comment_id}`, request)
}