
document.addEventListener("DOMContentLoaded", renderQuotes())

// CONSTANTS

const quoteList = document.querySelector('#quote-list')
const newQuoteForm = document.querySelector('#new-quote-form')
const submitForm = document.querySelector('#new-quote-form')


// CORE FUNCTIONALITY
API.get.then(quotes => console.log(quotes))

function renderQuotes(){
    API.get.then(quotes => quotes.forEach(q => renderQuote(q)))
}

function renderQuote(quote){
    let quoteCard = createElement('li', 'quote-card')
    quoteCard.id = quote.id
    let blockquote = createElement('blockquote', 'blockquote')

    let quoteText = createElement('p', 'mb-0', `${quote.quote}`)
    let author = createElement('footer', 'blockquote-footer', `${quote.author}`)
    let likeButton = createElement('button', 'btn-success', `Likes: ${quote.likes.length}` )
    let deleteButton = createElement('button', 'btn-danger', 'Delete' )

    likeButton.addEventListener('click', (e) => likeFunction(e, quote))
    deleteButton.addEventListener('click', (e) => deleteFunction(e, quote))

    blockquote.append(quoteText, author, likeButton, deleteButton)
    quoteCard.appendChild(blockquote)
    quoteList.appendChild(quoteCard)
}

// BUTTON FUNCTIONALITY

function likeFunction(e, quote){  
    API.postLike(quote) //be
    let likes = parseInt(e.target.innerText.split(' ')[1]) //fe
    e.target.innerText = "Likes: "+`${likes+1}`
}

function deleteFunction(e, quote){
    API.deleteQuote(quote) //be
    document.getElementById(quote.id).remove() //fe
}

submitForm.addEventListener('submit', (e) => addQuote(e))

function addQuote(e){
    e.preventDefault()
    API.postQuote(contentFromForm(e)) //be
    renderQuote({...contentFromForm(e), likes: []}) //fe - doens't allow for immediate like
}

function contentFromForm(e){
    let obj = {
    quote: e.target.elements[0].value,
    author: e.target.elements[1].value
    }
    return obj
}



// HELPER METHODS

function createElement(ele, className="", innerText=""){
    let element = document.createElement(ele);
    element.className = className;
    element.innerText = innerText;
    return element
}



