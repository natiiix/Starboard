import { GameObject } from "./GameObject";
import { GameSize } from "./Size";
import { GameRectangle, gameRectAroundPoint } from "./Rectangle";
import { Player } from "./Player";
import { VIEW_SIZE } from "./environment";

export class World {
    public size: GameSize;
    public player: Player;
    public objects: GameObject[];

    public constructor(size: GameSize, player: Player, objects: GameObject[]) {
        this.size = size;
        this.player = player;
        this.objects = objects;
    }

    public get worldRect(): GameRectangle {
        return this.size.toRect();
    }

    public get viewRect(): GameRectangle {
        return gameRectAroundPoint(this.player.rect.center, VIEW_SIZE);
    }
}
