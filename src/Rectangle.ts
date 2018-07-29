import { Point, ScreenPoint, GamePoint } from "./Point";
import { Size, ScreenSize, GameSize } from "./Size";
import { CollisionInfo } from "./CollisionInfo";

export abstract class Rectangle {
    public location: Point;
    public size: Size;

    public constructor(location: Point, size: Size) {
        this.location = location;
        this.size = size;
    }

    public get x(): number {
        return this.location.x;
    }

    public get y(): number {
        return this.location.y;
    }

    public get width(): number {
        return this.size.width;
    }

    public get height(): number {
        return this.size.height;
    }

    public abstract get center(): Point;
}

export class ScreenRectangle extends Rectangle {
    public location: ScreenPoint = undefined;
    public size: ScreenSize = undefined;

    public constructor(location: ScreenPoint, size: ScreenSize) {
        super(location, size);
    }

    public toGame(): GameRectangle {
        const gamePoint = this.location.toGame();
        const gameSize = this.size.toGame();

        return new GameRectangle(new GamePoint(gamePoint.x, gamePoint.y - gameSize.height), gameSize);
    }

    public get center(): ScreenPoint {
        return new ScreenPoint(this.x + (this.width / 2), this.y + (this.height / 2));
    }
}

export class GameRectangle extends Rectangle {
    public location: GamePoint;
    public size: GameSize;

    public constructor(location: GamePoint, size: GameSize) {
        super(location, size);
    }

    public toScreen(): ScreenRectangle {
        const screenPoint = this.location.toScreen();
        const screenSize = this.size.toScreen();

        return new ScreenRectangle(new ScreenPoint(screenPoint.x, screenPoint.y - screenSize.height), screenSize);
    }

    public get center(): GamePoint {
        return new GamePoint(this.x + (this.width / 2), this.y + (this.height / 2));
    }

    public get left(): number {
        return Math.min(this.location.x, this.location.x + this.size.width);
    }

    public get right(): number {
        return Math.max(this.location.x, this.location.x + this.size.width);
    }

    public get bottom(): number {
        return Math.min(this.location.y, this.location.y + this.size.height);
    }

    public get top(): number {
        return Math.max(this.location.y, this.location.y + this.size.height);
    }

    public collisionInfoWith(rect: GameRectangle): CollisionInfo {
        return new CollisionInfo(
            rect.right - this.left,
            this.right - rect.left,
            rect.top - this.bottom,
            this.top - rect.bottom
        );
    }
}

export function gameRectAroundPoint(point: GamePoint, size: GameSize): GameRectangle {
    return new GameRectangle(new GamePoint(point.x - (size.width / 2), point.y - (size.height / 2)), size);
}
