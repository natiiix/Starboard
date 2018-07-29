import { ScreenPoint, GamePoint } from "./Point";
import { CANVAS, GAME_SIZE, PLAYER_SIZE, WRAPPER, GAME_RECT, CONTEXT } from "./environment";
import { GameObject } from "./GameObject";
import { Player } from "./Player";
import { GameSize } from "./Size";
import { Vector } from "./Vector";

window.addEventListener("load", () => WRAPPER.adjustCanvasSize());
window.addEventListener("resize", () => WRAPPER.adjustCanvasSize());

const keyStates: { [id: string]: boolean } = {};

const player = new Player(GAME_SIZE.half as GamePoint, PLAYER_SIZE, "#FF0000", true, true, true);
export const objects: GameObject[] = [];

const wallStyle = "#000000";
const wallWidth = 0.01;

objects.push(new GameObject(new GamePoint(wallWidth - GAME_RECT.right, GAME_RECT.bottom), GAME_SIZE, wallStyle, true, false, false, Vector.zero));
objects.push(new GameObject(new GamePoint(GAME_RECT.right - wallWidth, GAME_RECT.bottom), GAME_SIZE, wallStyle, true, false, false, Vector.zero));
objects.push(new GameObject(new GamePoint(GAME_RECT.left, wallWidth - GAME_RECT.top), GAME_SIZE, wallStyle, true, false, false, Vector.zero));
objects.push(new GameObject(new GamePoint(GAME_RECT.left, GAME_RECT.top - wallWidth), GAME_SIZE, wallStyle, true, false, false, Vector.zero));

objects.push(new GameObject(new GamePoint(0.7, 0.6), new GameSize(0.2, 0.1), "#00FF00", true, false, false));
objects.push(new GameObject(new GamePoint(0.7, 0.4), new GameSize(0.05, 0.5), "#0000FF", true, false, false));

document.addEventListener("keydown", e => {
    if (!keyStates[e.key] && e.key === " ") {
        player.movement.y = 0.5;
    }

    keyStates[e.key] = true;
});

document.addEventListener("keyup", e => {
    keyStates[e.key] = false;
});

CANVAS.addEventListener("click", e => {
    const pt = new ScreenPoint(e.offsetX, e.offsetY).toGame();
    console.log(`GamePoint [ X = ${pt.x}; Y = ${pt.y} ]`);
});

function redraw(): void {
    const canvasRect = WRAPPER.rect;

    WRAPPER.fillRect(canvasRect, "#AAFFCC");
    objects.forEach(obj => obj.render());
    player.render();

    CONTEXT.font = `bold ${canvasRect.height / 20}px Courier`;
    CONTEXT.textAlign = "left";
    CONTEXT.textBaseline = "top";

    CONTEXT.shadowColor = "#000000";
    CONTEXT.shadowBlur = canvasRect.height / 400;

    CONTEXT.fillStyle = "#FFFF44";
    CONTEXT.fillText(fps, canvasRect.x, canvasRect.y);

    CONTEXT.shadowBlur = 0;
}

let lastFrame = 0;
let fps = "";

function tick(timestamp: number): void {
    if (lastFrame !== 0) {
        const delta = (timestamp - lastFrame) / 1000;
        fps = Math.round(1 / delta).toString();

        objects.forEach(obj => obj.tick(delta));

        let x = 0;
        let y = 0;

        if (keyStates["w"]) {
            y += 1;
        }

        if (keyStates["s"]) {
            y -= 1;
        }

        if (keyStates["a"]) {
            x -= 1;
        }

        if (keyStates["d"]) {
            x += 1;
        }

        player.tick(delta, new Vector(x, y).multiply(0.7 * delta), false);
    }

    redraw();
    lastFrame = timestamp;
    window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);
