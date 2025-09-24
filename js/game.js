let canvas;
let ctx;
let world;
let speed = 0;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}

document.addEventListener('keydown', (event) => {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

    switch (key) {
        case "ArrowRight":
            world.character.right = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

    switch (key) {
        case "ArrowRight":
            world.character.right = false;
            break;
    }
});