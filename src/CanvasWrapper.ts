import { VIEW_SIZE, CONTEXT } from "./environment";
import { ScreenSize } from "./Size";
import { ScreenRectangle, GameRectangle } from "./Rectangle";

export class CanvasWrapper {
    public readonly canvas: HTMLCanvasElement;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        window.addEventListener("load", () => this.adjustCanvasSize());
        window.addEventListener("resize", () => this.adjustCanvasSize());
    }

    public get width(): number {
        return this.canvas.width;
    }

    public get height(): number {
        return this.canvas.height;
    }

    public get size(): ScreenSize {
        return new ScreenSize(this.width, this.height);
    }

    public get rect(): ScreenRectangle {
        return this.size.toRect();
    }

    public get xScale(): number {
        return this.width / VIEW_SIZE.width;
    }

    public get yScale(): number {
        return this.height / VIEW_SIZE.height;
    }

    public fillRect(rect: ScreenRectangle | GameRectangle, style: string): void {
        if (rect instanceof GameRectangle) {
            return this.fillRect(rect.toScreen(), style);
        }

        CONTEXT.fillStyle = style;
        CONTEXT.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    public clear(style: string): void {
        this.fillRect(this.rect, style);
    }

    private adjustCanvasSize(): void {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
}
