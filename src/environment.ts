import { CanvasWrapper } from "./CanvasWrapper";
import { GameSize } from "./Size";
import { World } from "./World";
// import { GameObject } from "./GameObject";
// import { GamePoint } from "./Point";
// import { Vector } from "./Vector";
// import { Player } from "./Player";

export const GRAVITY = 0.5;

export const VIEW_SIZE = new GameSize(16 / 9, 1);

// const WORLD_SIZE = new GameSize(4, 2);
// const WORLD_RECT = WORLD_SIZE.toRect();

// const PLAYER = new Player(WORLD_RECT.center, new GameSize(0.05, 0.05), "#FF0000", true, true, true);

// const WALL_STYLE = "#000000";
// const VERTICAL_WALL_SIZE = new GameSize(WORLD_SIZE.width, WORLD_SIZE.height * 3);
// const HORIZONTAL_WALL_SIZE = new GameSize(WORLD_SIZE.width * 3, WORLD_SIZE.height);
// const OBJECTS: GameObject[] = [
//     new GameObject(new GamePoint(WORLD_RECT.left - WORLD_RECT.width, WORLD_RECT.bottom - WORLD_SIZE.height), VERTICAL_WALL_SIZE, WALL_STYLE, true, false, false, Vector.zero),
//     new GameObject(new GamePoint(WORLD_RECT.right, WORLD_RECT.bottom - WORLD_SIZE.height), VERTICAL_WALL_SIZE, WALL_STYLE, true, false, false, Vector.zero),
//     new GameObject(new GamePoint(WORLD_RECT.left - WORLD_RECT.width, WORLD_RECT.bottom - WORLD_RECT.height), HORIZONTAL_WALL_SIZE, WALL_STYLE, true, false, false, Vector.zero),
//     new GameObject(new GamePoint(WORLD_RECT.left - WORLD_RECT.width, WORLD_RECT.top), HORIZONTAL_WALL_SIZE, WALL_STYLE, true, false, false, Vector.zero),

//     new GameObject(new GamePoint(0.7, 0.6), new GameSize(0.2, 0.1), "#00FF00", true, false, false),
//     new GameObject(new GamePoint(0.7, 0.4), new GameSize(0.05, 0.5), "#0000FF", true, false, false)
// ];

// export const WORLD = new World(WORLD_SIZE, PLAYER, OBJECTS);

export let WORLD: World = undefined;

fetch("worlds/world0.sb").then(resp => {
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
