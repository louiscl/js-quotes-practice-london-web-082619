
// CONSTANTS

const baseURL = "http://localhost:3000/quotes/"
const baseEmbLikesURL = "http://localhost:3000/quotes?_embed=likes"
const likeURL = "http://localhost:3000/likes"
const

headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
}

// FUNCTIONALITY

function get(){
    return fetch(baseEmbLikesURL).then(resp => resp.json())
}

function postLike(quote){
    return fetch(likeURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            quoteId: quote.id
        })
    })
}

function postQuote(newQuote){
    return fetch(baseURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newQuote)
    })
}


function deleteQuote(quote){fetch(baseURL+`${quote.id}`, {method: "DELETE"})}



API = {
    get: get(),
    postQuote: postQuote,
    postLike: postLike,
    deleteQuote: deleteQuote
}
