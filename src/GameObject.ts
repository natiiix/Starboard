import { GamePoint } from "./Point";
import { GameSize } from "./Size";
import { GameRectangle, gameRectAroundPoint } from "./Rectangle";
import { Vector } from "./Vector";
import { WRAPPER, GRAVITY, WORLD } from "./environment";
import { CollisionInfo } from "./CollisionInfo";

export class GameObject {
    private location: GamePoint;
    private size: GameSize;
    private style: string;
    private solid: boolean;
    private handleCollisions: boolean;
    public gravity: boolean;
    private anchor: Vector;
    public movement: Vector;

    public constructor(
        location: GamePoint,
        size: GameSize,
        style: string,
        solid: boolean = false,
        handleCollisions: boolean = false,
        gravity: boolean = false,
        anchor: Vector = size.half,
        movement: Vector = Vector.zero) {

        this.location = location;
        this.size = size;
        this.style = style;
        this.handleCollisions = handleCollisions;
        this.solid = solid;
        this.gravity = gravity;
        this.anchor = anchor;
        this.movement = movement;
    }

    public get rect(): GameRectangle {
        return new GameRectangle(new GamePoint(this.location.x - this.anchor.x, this.location.y - this.anchor.y), this.size);
    }

    public render(): void {
        WRAPPER.fillRect(this.rect, this.style);
    }

    public move(vector: Vector): void {
        if (this.handleCollisions) {
            const newLocation = this.location.add(vector) as GamePoint;
            const newRect = gameRectAroundPoint(newLocation, this.size);
            const intersections = WORLD.objects.filter(obj => obj !== this && obj.solid).map(obj => newRect.collisionInfoWith(obj.rect)).filter(col => col.isIntersection);

            if (intersections.length) {
                this.location = this.location.add(CollisionInfo.combine(intersections).adjust(vector)) as GamePoint;
                return;
            }
        }

        this.location = this.location.add(vector) as GamePoint;
    }

    public tick(delta: number, moveVector: Vector = Vector.zero, verbose: boolean = false): void {
        if (this.gravity) {
            this.movement.y -= GRAVITY * delta;
        }

        if (this.handleCollisions) {
            const collisions = WORLD.objects.filter(obj => obj !== this && obj.solid).map(obj => this.rect.collisionInfoWith(obj.rect)).filter(col => col.isCollision);

            if (collisions.length) {
                const combined = CollisionInfo.combine(collisions);

                if ((this.movement.x < 0 && combined.left === 0) ||
                    (this.movement.x > 0 && combined.right === 0)) {
                    this.movement.x = 0;
                }

                if ((this.movement.y < 0 && combined.bottom === 0) ||
                    (this.movement.y > 0 && combined.top === 0)) {
                    this.movement.y = 0;
                }
            }
        }

        if (verbose) {
            console.log(`${this.location.y} Movement [ X = ${this.movement.x}; Y = ${this.movement.y}; Magnitude = ${this.movement.magnitude}]`);
        }

        const finalVector = this.movement.multiply(delta).add(moveVector);

        if (finalVector.magnitude !== 0) {
            this.move(finalVector);
        }
    }
}
