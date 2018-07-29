import { WRAPPER } from "./environment";
import { Vector } from "./Vector";

export abstract class Point extends Vector { }

export class ScreenPoint extends Point {
    public toGame(): GamePoint {
        return new GamePoint(this.x / WRAPPER.xScale, (WRAPPER.height - this.y) / WRAPPER.yScale);
    }
}

export class GamePoint extends Point {
    public toScreen(): ScreenPoint {
        return new ScreenPoint(this.x * WRAPPER.xScale, WRAPPER.height - (this.y * WRAPPER.yScale));
    }
}
