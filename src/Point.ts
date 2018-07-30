import { WRAPPER, WORLD } from "./environment";
import { Vector } from "./Vector";

export abstract class Point extends Vector { }

export class ScreenPoint extends Point {
    public toGame(): GamePoint {
        const view = WORLD.viewRect;
        return new GamePoint(view.x + (this.x / WRAPPER.xScale), view.y + ((WRAPPER.height - this.y) / WRAPPER.yScale));
    }
}

export class GamePoint extends Point {
    public toScreen(): ScreenPoint {
        const view = WORLD.viewRect;
        return new ScreenPoint((this.x - view.x) * WRAPPER.xScale, WRAPPER.height - ((this.y - view.y) * WRAPPER.yScale));
    }
}
