import { CanvasWrapper } from "./CanvasWrapper";
import { GameSize } from "./Size";
import { World } from "./World";

export const GRAVITY = 0.5;
export const VIEW_SIZE = new GameSize(16 / 9, 1);

export let WORLD: World = undefined;

fetch("worlds/world0.json").then(resp => {
    if (resp.status === 200) {
        resp.text().then(text => {
            WORLD = World.fromString(text);
        });
    }
    else {
        throw new Error(`Unable to load world data file (Status ${resp.status})`);
    }
}).catch(console.error);

const THRESHOLD = 1e-12;
export const THRESHOLD_SIZE = VIEW_SIZE.multiply(THRESHOLD) as GameSize;

export const CANVAS = document.getElementById("gameCanvas") as HTMLCanvasElement;
export const CONTEXT = CANVAS.getContext("2d");
export const WRAPPER = new CanvasWrapper(CANVAS);
