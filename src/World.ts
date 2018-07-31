import { GameObject } from "./GameObject";
import { GameSize } from "./Size";
import { GameRectangle, gameRectAroundPoint } from "./Rectangle";
import { Player } from "./Player";
import { VIEW_SIZE } from "./environment";
import { GamePoint } from "./Point";
import * as Validator from "./validator/Validator";
import { WORLD_SCHEMA } from "./schemas/WorldSchema";
import { Vector } from "./Vector";

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

    public static fromString(data: string): World {
        const jsonData = JSON.parse(data);

        const errors = Validator.validate(jsonData, WORLD_SCHEMA);
        if (errors.length > 0) {
            throw new Error(errors.join("\n"));
        }

        return new World(
            new GameSize(
                jsonData.world.width,
                jsonData.world.height
            ),
            new Player(
                new GamePoint(jsonData.player.x, jsonData.player.y),
                new GameSize(jsonData.player.width, jsonData.player.height),
                jsonData.player.style,
                true, true, true
            ),
            // tslint:disable-next-line:no-any
            jsonData.objects.map((o: any) => {
                return new GameObject(
                    new GamePoint(o.location.x, o.location.y),
                    new GameSize(o.size.x, o.size.y),
                    o.style,
                    o.solid,
                    o.handleCollisions,
                    o.gravity,
                    new Vector(o.anchor.x, o.anchor.y),
                    new Vector(o.movement.x, o.movement.y)
                );
            }));
    }
}
