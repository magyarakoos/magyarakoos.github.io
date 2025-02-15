const img = document.querySelector("img");
const subreddits = [
    "technicallythetruth",
    "196",
    "19684",
    "anarchychess",
    "hungary",
    "donathannalabkepek",
    "fosttalicska",
];

console.log(JSON.parse(localStorage.getItem("alreadySeen")));

let alreadySeen = new Set(JSON.parse(localStorage.getItem("alreadySeen")) || []);

function saveToLocalStorage() {
    localStorage.setItem("alreadySeen", JSON.stringify([...alreadySeen]));
}

function fetchMeme() {
    fetch(`https://meme-api.com/gimme/${subreddits[Math.floor(Math.random() * subreddits.length)]}/1`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data = data.memes[0];
            if (alreadySeen.has(data.url)) {
                fetchMeme();
            } else {
                alreadySeen.add(data.url);
                saveToLocalStorage();
                img.src = data.url;
            }
        })
        .catch(error => {
            console.error('There was an error with the fetch operation:', error);
        });
}

window.addEventListener("load", fetchMeme);

