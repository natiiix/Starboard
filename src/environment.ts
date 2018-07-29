import { CanvasWrapper } from "./CanvasWrapper";
import { GameSize } from "./Size";

export const GRAVITY = 0.5;

export const GAME_SIZE = new GameSize(16 / 9, 1);
export const GAME_RECT = GAME_SIZE.toRect();
export const PLAYER_SIZE = new GameSize(0.05, 0.05);

const THRESHOLD = 1e-12;
export const THRESHOLD_SIZE = GAME_SIZE.multiply(THRESHOLD) as GameSize;

export const CANVAS = document.getElementById("gameCanvas") as HTMLCanvasElement;
export const CONTEXT = CANVAS.getContext("2d") || new CanvasRenderingContext2D();
export const WRAPPER = new CanvasWrapper(CANVAS);
