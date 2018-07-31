import { Schema } from "./Schema";

/**
 * Validates the `data` according to the `schema`.
 * Returns a list of invalid properties, or an
 * empty list if the object is entirely valid.
 * @param data The data to validate.
 * @param schema The schema to use for validation.
 */
// tslint:disable-next-line:no-any
export function validate(data: any, schema: Schema): string[] {
    const results: string[] = [];
    for (const key in schema) {
        if (typeof data[key] === "object") {
            if (Array.isArray(data[key])) {
                if (schema[key].type !== "array") {
                    results.push(`${key} was "array", but should be ${schema[key].type}`);
                } else {
                    for (let i = 0; i < data[key].length; i++) {
                        // if the array has its own schema,
                        // do a nested validation on it.
                        if (typeof schema[key].of === "object") {
                            const innerResult = validate(data[key][i], schema[key].of as Schema);
                            results.push(...innerResult.map(r => `${key}[${i}].${r}`));
                        } else {
                            // otherwise it is a primitive array.
                            if (typeof data[key][i] !== schema[key].of) {
                                results.push(`${key}[${i}] was "${typeof data[key][i]}", but should be "${schema[key].of}"`);
                            }
                        }
                    }
                }
            } else {
                // if it's not an array, then it's a nested object.
                const innerResults = validate(data[key], schema[key].type as Schema);
                results.push(...innerResults.map(r => `${key}.${r}`));
            }
        } else {
            // primitives.
            const dataType = typeof data[key];
            if (dataType !== schema[key].type) {
                if (dataType === "undefined") {
                    if (schema[key].optional === true || schema[key].default !== undefined) {
                        if (schema[key].default !== undefined) {
                            data[key] = schema[key].default;
                        }
                        continue;
                    }
                }
                results.push(`${key} was "${dataType}", but should be "${schema[key].type}"`);
            }
        }
    }

    return results;
}
