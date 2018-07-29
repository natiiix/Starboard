export class Vector {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static get zero(): Vector {
        return new Vector(0, 0);
    }

    public get magnitude(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    public get half(): Vector {
        return new Vector(this.x / 2, this.y / 2);
    }

    public get copy(): Vector {
        return new Vector(this.x, this.y);
    }

    public multiply(factor: number): Vector {
        return new Vector(this.x * factor, this.y * factor);
    }

    public add(vector: Vector): Vector {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    public subtract(vector: Vector): Vector {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }
}
