const boxSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--box-size")); // px
const boxGap = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--box-gap")); // px

let data = {
    score: 0,
    timer: 0,
    lastTime: 0,
    mole: undefined
};

window.addEventListener("load", load);
window.addEventListener("resize", load);
setInterval(updateData, 20);

function load() {
    data.score = 0;
    data.timer = 0;
    setBoxCount();
    relocateMole();
}

function selectRandomBox(board) {
    return board.children[Math.floor(Math.random() * board.children.length)]
}

function relocateMole() {
    const board = document.querySelector("#board");

    if (board.children.length === 0) return;

    if (data.mole !== undefined) {
        data.mole.classList.remove("marked");

        // ensure we never get the same box twice
        while (true) {
            const newMole = selectRandomBox(board);
            if (data.mole !== newMole) {
                data.mole = newMole;
                break;
            }
        }
    } else {
        data.mole = selectRandomBox(board);
    }

    data.mole.classList.add("marked");
}

function createBox() {
    const box = document.createElement("div");
    box.classList.add("box");
    box.addEventListener("click", function() {
        this.classList.add("active");

        if (this.classList.contains("marked")) {
            setTimeout(() => this.classList.remove("active"), 150);

            data.score++;
            data.lastTime = data.timer;
            setTimeout(relocateMole, 150);
        } else {
            setTimeout(() => {
                this.classList.remove("active");
                load();
            }, 1000);
        }
    });
    return box;
}

function updateData() {
    if (data.score > 0) {
        data.timer += 2;
    }

    document.querySelector("#score").innerHTML = data.score;
    document.querySelector("#timer").innerHTML = data.timer;

    document.querySelector("#dt").innerHTML = data.score === 0 ? 0 : Math.round(data.lastTime / data.score);
}

function setBoxCount() {
    const main = document.querySelector("main");
    const board = document.querySelector("#board");

    board.innerHTML = "";

    const computedStyle = window.getComputedStyle(board);
    const columnCount = computedStyle.getPropertyValue("grid-template-columns").split(" ").length;

    const rowCount = Math.floor((main.clientHeight - boxGap) / (boxSize + boxGap));

    for (let i = 0; i < rowCount * columnCount; i++) {
        board.appendChild(createBox());
    }
}

