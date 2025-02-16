const img = document.querySelector("img");
const button = document.querySelector("#button");
const subreddits = [
    "technicallythetruth",
    "196",
    "19684",
    "anarchychess",
    "hungary",
    "donathannalabkepek",
    "fosttalicska",
];

localStorage.removeItem("alreadySeen");
let alreadySeen = new Set(JSON.parse(localStorage.getItem("alreadySeen")) || []);
let nextImageUrl = null;

function saveToLocalStorage() {
    localStorage.setItem("alreadySeen", JSON.stringify([...alreadySeen]));
}

async function fetchMeme() {
    let data = null;
    while (!data || alreadySeen.has(data.url)) {
        try {
            const response = await fetch(`https://meme-api.com/gimme/${subreddits[Math.floor(Math.random() * subreddits.length)]}/1`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            data = json.memes[0];
        } catch (error) {
            console.error("Error fetching meme:", error);
            return;
        }
    }
    alreadySeen.add(data.url);
    saveToLocalStorage();
    return data.url;
}

async function loadMeme() {
    if (nextImageUrl === null) nextImageUrl = fetchMeme();

    img.src = await nextImageUrl;
    nextImageUrl = null;

    nextImageUrl = fetchMeme();
}

window.addEventListener("load", loadMeme);
button.addEventListener("click", loadMeme);
