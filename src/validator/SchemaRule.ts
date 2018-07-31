import { Schema } from "./Schema";

/**
 * A primitive type declaration in a Schema.
 */
type PrimitiveType
    = "string"
    | "number"
    | "boolean";

/**
 * A property type declaration in a Schema.
 */
type PropertyType
    = PrimitiveType
    | "array";

/**
 * A definition of a property in a schema.
 */
export interface SchemaRule {
    /**
     * The type of this property.
     */
    type: PropertyType | Schema;
    /**
     * The schema for the objects in the array, if
     * this has a type of `"array"`.
     */
    of?: PrimitiveType | Schema;
    /**
     * Whether or not the property is optional.
     */
    optional?: boolean;
    /**
     * The default value for the property, if it is optional.
     */
    default?: string | boolean | number;
}
