let clicks = 0;
let activeBoxes = new Set();

window.addEventListener("load", load);

function load() {
    assignNumbers();

    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        function handleClick() {
            if (box.classList.contains("active")) return;

            clicks++;
            updateClicks();

            if (activeBoxes.size == 2) {
                activeBoxes.forEach(b => b.classList.remove("active"));
                activeBoxes.clear();
            }

            box.classList.add("active");

            activeBoxes.add(box);

            if (activeBoxes.size == 2) {
                let [a, b] = Array.from(activeBoxes);
                if (a.innerText === b.innerText) {
                    activeBoxes.forEach(b => {
                        b.removeEventListener("click", handleClick);
                    });
                    activeBoxes.clear();
                    score += 1;
                }
            }
        }
        box.addEventListener("click", handleClick);
    });
}

function updateClicks() {
    document.querySelector("#clicks").innerHTML = clicks;
}

function shuffle(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function assignNumbers() {
    let boxes = document.querySelectorAll(".box");
    let perm = shuffle(Array.from({ length: boxes.length }, (_, i) => String.fromCharCode('A'.charCodeAt() + Math.floor(i / 2) + 1)));

    for (let i = 0; i < boxes.length; i++) {
        const text = document.createElement("span");
        text.innerHTML = perm[i];
        boxes[i].appendChild(text);
    }
}

