import { WRAPPER, CONTEXT, WORLD } from "./environment";
import { Vector } from "./Vector";

const keyStates: { [id: string]: boolean } = {};

document.addEventListener("keydown", e => {
    if (!keyStates[e.key] && e.key === " ") {
        WORLD.player.movement.y = 0.5;
    }

    keyStates[e.key] = true;
});

document.addEventListener("keyup", e => {
    keyStates[e.key] = false;
});

// CANVAS.addEventListener("click", e => {
//     const pt = new ScreenPoint(e.offsetX, e.offsetY).toGame();
//     console.log(`GamePoint [ X = ${pt.x}; Y = ${pt.y} ]`);
// });

function redraw(): void {
    const canvasRect = WRAPPER.rect;

    WRAPPER.fillRect(canvasRect, "#AAFFCC");
    WORLD.objects.forEach(obj => obj.render());
    WORLD.player.render();

    const fontHeightFPS = canvasRect.height / 20;
    CONTEXT.font = generateFont(fontHeightFPS);
    CONTEXT.textAlign = "left";
    CONTEXT.textBaseline = "top";

    CONTEXT.shadowColor = "#000000";
    CONTEXT.shadowBlur = canvasRect.height / 400;

    CONTEXT.fillStyle = "#FFFF44";
    CONTEXT.fillText(`FPS:${fps}`, canvasRect.x, canvasRect.y);

    const fontHeightCoordinates = canvasRect.height / 30;
    CONTEXT.font = generateFont(fontHeightCoordinates);

    const playerLocation = WORLD.player.rect.center;
    CONTEXT.fillText(`X:${playerLocation.x.toFixed(3)}`, canvasRect.x, canvasRect.y + fontHeightFPS);
    CONTEXT.fillText(`Y:${playerLocation.y.toFixed(3)}`, canvasRect.x, canvasRect.y + fontHeightFPS + fontHeightCoordinates);

    CONTEXT.shadowBlur = 0;
}

function generateFont(size: number): string {
    return `bold ${size}px Courier`;
}

let lastFrame = 0;
let fps = "";

function tick(timestamp: number): void {
    if (WORLD === undefined) {
        window.requestAnimationFrame(tick);
        return;
    }

    if (lastFrame !== 0) {
        const delta = (timestamp - lastFrame) / 1000;
        fps = Math.round(1 / delta).toString();

        WORLD.objects.forEach(obj => obj.tick(delta));

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

        WORLD.player.tick(delta, new Vector(x, y).multiply(0.7 * delta), false);
    }

    redraw();
    lastFrame = timestamp;
    window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);
