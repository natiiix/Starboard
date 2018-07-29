import { LRBT } from "./LRBT";
import { Vector } from "./Vector";
import { THRESHOLD_SIZE } from "./environment";

export class CollisionInfo {
    public readonly left: number;
    public readonly right: number;
    public readonly bottom: number;
    public readonly top: number;

    public constructor(left: number, right: number, bottom: number, top: number) {
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;
    }

    public get depth(): LRBT<number> {
        return new LRBT<number>(
            this.left,
            this.right,
            this.bottom,
            this.top
        );
    }

    public get collision(): LRBT<boolean> {
        return new LRBT<boolean>(
            this.left >= 0,
            this.right >= 0,
            this.bottom >= 0,
            this.top >= 0
        );
    }

    public get intersection(): LRBT<boolean> {
        return new LRBT<boolean>(
            this.left > 0,
            this.right > 0,
            this.bottom > 0,
            this.top > 0
        );
    }

    public get isCollision(): boolean {
        return (
            this.left >= 0 &&
            this.right >= 0 &&
            this.bottom >= 0 &&
            this.top >= 0
        );
    }

    public get isIntersection(): boolean {
        return (
            this.left > 0 &&
            this.right > 0 &&
            this.bottom > 0 &&
            this.top > 0
        );
    }

    public static combine(collisions: CollisionInfo[]): CollisionInfo {
        return new CollisionInfo(
            Math.min(...collisions.map(vec => vec.left)),
            Math.min(...collisions.map(vec => vec.right)),
            Math.min(...collisions.map(vec => vec.bottom)),
            Math.min(...collisions.map(vec => vec.top))
        );
    }

    public adjust(vect: Vector): Vector {
        const newVect = vect.copy;

        if (this.left <= -vect.x + THRESHOLD_SIZE.x) {
            newVect.x += this.left;
        }
        else if (this.right <= vect.x + THRESHOLD_SIZE.x) {
            newVect.x -= this.right;
        }

        if (this.bottom <= -vect.y + THRESHOLD_SIZE.y) {
            newVect.y += this.bottom;
        }
        else if (this.top <= vect.y + THRESHOLD_SIZE.y) {
            newVect.y -= this.top;
        }

        return newVect;
    }
}
