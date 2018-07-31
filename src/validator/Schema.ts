import { SchemaRule } from "./SchemaRule";

/**
 * A collection of property rules which describe an object.
 */
export interface Schema {
    [key: string]: SchemaRule;
}
