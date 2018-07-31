import { Schema } from "../validator/Schema";
import { SchemaRule } from "../validator/SchemaRule";

const POINT: SchemaRule = {
    type: {
        x: { type: "number" },
        y: { type: "number" }
    }
};
const OPTIONAL_POINT: SchemaRule = {
    type: {
        x: { type: "number" },
        y: { type: "number" }
    },
    optional: true
};

/**
 * The schema for a JSON file which represents a `World` object.
 */
export const WORLD_SCHEMA: Schema = {
    "world": {
        "type": {
            "width": {
                "type": "number"
            },
            "height": {
                "type": "number"
            }
        }
    },
    "player": {
        "type": {
            "x": {
                "type": "number"
            },
            "y": {
                "type": "number"
            },
            "width": {
                "type": "number"
            },
            "height": {
                "type": "number"
            },
            "style": {
                "type": "string"
            }
        }
    },
    "objects": {
        "type": "array",
        "of": {
            "location": POINT,
            "size": POINT,
            "style": {
                "type": "string"
            },
            "solid": {
                "type": "boolean",
                "default": false
            },
            "handleCollisions": {
                "type": "boolean",
                "default": false
            },
            "gravity": {
                "type": "boolean",
                "default": false
            },
            "anchor": OPTIONAL_POINT,
            "movement": OPTIONAL_POINT
        }
    }
};

