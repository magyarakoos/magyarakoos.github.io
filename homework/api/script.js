const img = document.querySelector("img");
let alreadySeen = new Set();

function fetchMeme() {
    fetch('https://meme-api.com/gimme/technicallythetruth')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (alreadySeen.has(data.url)) {
                fetchMeme();
            } else {
                alreadySeen.add(data.url)
                img.src = data.url;
            }
        })
        .catch(error => {
            console.error('There was an error with the fetch operation:', error);
        });
}

window.addEventListener("load", fetchMeme);
