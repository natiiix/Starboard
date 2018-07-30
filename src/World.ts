import { GameObject } from "./GameObject";
import { GameSize } from "./Size";
import { GameRectangle, gameRectAroundPoint } from "./Rectangle";
import { Player } from "./Player";
import { VIEW_SIZE } from "./environment";
import { GamePoint } from "./Point";
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
        const dataLines = data.split(/\r?\n/g);

        const regexIgnore = /^\s*$|^\s*#/;
        const regexWorld = /^(-?\d+(?:\.\d+)?);(-?\d+(?:\.\d+)?)$/;
        const regexPlayer = /^(-?\d+(?:\.\d+)?);(-?\d+(?:\.\d+)?);(-?\d+(?:\.\d+)?);(-?\d+(?:\.\d+)?);([^;]*)$/;
        const regexObject = /^(-?\d+(?:\.\d+)?);(-?\d+(?:\.\d+)?);(-?\d+(?:\.\d+)?);(-?\d+(?:\.\d+)?);([^;]*);(true|false);(true|false);(true|false);(-?\d+(?:\.\d+)?);(-?\d+(?:\.\d+)?);(-?\d+(?:\.\d+)?);(-?\d+(?:\.\d+)?)$/;

        let world: WorldInfo = undefined;
        let player: PlayerInfo = undefined;
        const objects: GameObject[] = [];

        dataLines.forEach(line => {
            if (regexIgnore.test(line)) {
                return;
            }

            if (world === undefined) {
                const match = regexWorld.exec(line);

                if (match) {
                    world = {
                        width: Number(match[1]),
                        height: Number(match[2])
                    };
                }
                else {
                    throw new Error("Invalid world info format");
                }
            }
            else if (player === undefined) {
                const match = regexPlayer.exec(line);

                if (match) {
                    player = {
                        x: Number(match[1]),
                        y: Number(match[2]),
                        width: Number(match[3]),
                        height: Number(match[4]),
                        style: match[5]
                    };
                }
                else {
                    throw new Error("Invalid player info format");
                }
            }
            else {
                const match = regexObject.exec(line);

                if (match) {
                    objects.push(new GameObject(
                        new GamePoint(
                            Number(match[1]),
                            Number(match[2])
                        ),
                        new GameSize(
                            Number(match[3]),
                            Number(match[4])
                        ),
                        match[5],
                        parseBool(match[6]),
                        parseBool(match[7]),
                        parseBool(match[8]),
                        new Vector(
                            Number(match[9]),
                            Number(match[10])
                        ),
                        new Vector(
                            Number(match[11]),
                            Number(match[12])
                        )
                    ));
                }
                else {
                    throw new Error("Invalid object info format");
                }
            }
        });

        if (world === undefined || player === undefined) {
            throw new Error("World data string is missing crucial information");
        }

        return new World(
            new GameSize(
                world.width,
                world.height
            ),
            new Player(
                new GamePoint(player.x, player.y),
                new GameSize(player.width, player.height),
                player.style,
                true, true, true
            ),
            objects);
    }
}

interface WorldInfo {
    width: number;
    height: number;
    // style: string;
    // gravity: number;
}

interface PlayerInfo {
    x: number;
    y: number;
    width: number;
    height: number;
    style: string;
}

function parseBool(str: string): boolean {
    if (str === "true") {
        return true;
    }
    else if (str === "false") {
        return false;
    }
    else {
        throw new Error(`Unexpected value "${str}" cannot be converted to boolean`);
    }
}
