const boxSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--box-size")); // px
const boxGap = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--box-gap")); // px

function setBoxCount() {
    const main = document.querySelector("main");
    const board = document.querySelector("#board");

    board.innerHTML = "";

    const computedStyle = window.getComputedStyle(board);
    const columnCount = computedStyle.getPropertyValue("grid-template-columns").split(" ").length;

    const rowCount = Math.floor((main.clientHeight - boxGap) / (boxSize + boxGap));

    for (let i = 0; i < rowCount * columnCount; i++) {
        const box = document.createElement("div");
        box.setAttribute("class", "box");
        board.appendChild(box);
    }
}

window.addEventListener("load", setBoxCount);
window.addEventListener("resize", setBoxCount);
