$(function() {
    var debounceTimeout = null

    $('#searchInput').on('input', function() {
        clearTimeout(debounceTimeout)
        debounceTimeout = setTimeout(() => {
            getMovie(this.value.trim())
        }, 1500);
    })

    $('#showMore').on('click' , function() {
        onShowMoreClicked()
    })
})

function getMovie(title) {
    if (!title) return

    onBeforeSend()
    fetchMovieFromApi(title)
}

function fetchMovieFromApi(title) {
    let xhr = new XMLHttpRequest()

    xhr.open('GET', `https://www.omdbapi.com/?t=${title}&apikey=2b81e16d`, true)
    xhr.timeout = 5000
    xhr.ontimeout = (e) => onApiError(e)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                handleResults(JSON.parse(xhr.responseText))
            }
        }
    }
    xhr.send()
}

function handleResults(response) {
    if (response.Response === 'True') {
        let tranformed = tranform(response)
        buildMovie(tranformed)
    } else if (response.Response === 'False') {
        hideComponent('#waiting')
        showNotFound()
    }
}

function tranform(response) {
    let camelCaseKeysResponse = camelCaseKeys(response)
    clearNotAvailableInformation(camelCaseKeysResponse)
    buildImdbLink(camelCaseKeysResponse)
    return camelCaseKeysResponse0
}

function camelCaseKeys() {
    return _.mapKeys(response, (v, k) => _.camelCase(k))
}

function clearNotAvailableInformation(response) {
    for (const key in response) {
        if (response.hasOwnProperty(key) && response[key] === 'N/A') {
            response[key] = ''
        }
    }
}

function buildImdbLink(response) {
    if (response.imdbId && response.imdb !== 'N/A') {
        response.imdbId = `https://www.imdb.com/title/${response.imdbId}/`
    }
}

function buildMovie() {

}

function hideComponent() {

}

function showNotFound() {

}