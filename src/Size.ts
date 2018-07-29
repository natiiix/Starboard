import { WRAPPER } from "./environment";
import { Rectangle, ScreenRectangle, GameRectangle } from "./Rectangle";
import { ScreenPoint, GamePoint } from "./Point";
import { Vector } from "./Vector";

export abstract class Size extends Vector {
    public get width(): number {
        return this.x;
    }

    public set width(value: number) {
        this.x = value;
    }

    public get height(): number {
        return this.y;
    }

    public set height(value: number) {
        this.y = value;
    }

    public constructor(width: number, height: number) {
        super(width, height);
    }

    public abstract toRect(): Rectangle;
}

export class ScreenSize extends Size {
    public toGame(): GameSize {
        return new GameSize(this.width / WRAPPER.xScale, this.height / WRAPPER.yScale);
    }

    public toRect(): ScreenRectangle {
        return new ScreenRectangle(Vector.zero as ScreenPoint, this);
    }
}

export class GameSize extends Size {
    public toScreen(): ScreenSize {
        return new ScreenSize(this.width * WRAPPER.xScale, this.height * WRAPPER.yScale);
    }

    public toRect(): GameRectangle {
        return new GameRectangle(Vector.zero as GamePoint, this);
    }
}
