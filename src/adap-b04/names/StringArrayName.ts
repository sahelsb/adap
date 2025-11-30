// StringArrayName.ts (Homework B04: Design by Contract)

import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);
        
        IllegalArgumentException.assert(
            source !== undefined && source !== null,
            "Precondition not met: Source array must not be null or undefined."
        );
        
        this.components = [...source];
        
        MethodFailedException.assert(
            this.components.length === source.length,
            "Postcondition not met: Component array length mismatch after construction."
        );
        
        this.assertClassInvariant();
    }

    
    public clone(): Name {
        this.assertClassInvariant();
        const result = new StringArrayName([...this.components], this.delimiter);
        MethodFailedException.assert(
            result.isEqual(this),
            "Postcondition not met: Cloned name should be equal to original."
        );
        this.assertClassInvariant();
        return result;
    }

    public getNoComponents(): number {
        this.assertClassInvariant();
        return this.components.length;
    }

    public getComponent(i: number): string {
        this.assertClassInvariant();
        this.assertIndexInBounds(i, this.components.length);
        
        const component = this.components[i];
        
        MethodFailedException.assert(
            component !== undefined,
            "Postcondition not met: Component returned undefined unexpectedly."
        );
        
        this.assertClassInvariant();
        return component;
    }

    public setComponent(i: number, c: string): void {
        this.assertClassInvariant();
        this.assertIndexInBounds(i, this.components.length);
        this.assertIsValidComponent(c);
        
        const oldLength = this.components.length;
        this.components[i] = c;
        
        MethodFailedException.assert(
            this.components[i] === c,
            "Postcondition not met: Component was not set correctly."
        );
        MethodFailedException.assert(
            this.components.length === oldLength,
            "Postcondition not met: Length changed unexpectedly."
        );
        
        this.assertClassInvariant();
    }

    public insert(i: number, c: string): void {
        this.assertClassInvariant();
        this.assertInsertIndexInBounds(i, this.components.length);
        this.assertIsValidComponent(c);
        
        const oldLength = this.components.length;
        this.components.splice(i, 0, c);
        
        MethodFailedException.assert(
            this.components[i] === c,
            "Postcondition not met: Component was not inserted at the correct index."
        );
        MethodFailedException.assert(
            this.components.length === oldLength + 1,
            "Postcondition not met: Length did not increase by one."
        );
        
        this.assertClassInvariant();
    }

    public append(c: string): void {
        this.assertClassInvariant();
        this.assertIsValidComponent(c);
        
        const oldLength = this.components.length;
        this.components.push(c);
        
        MethodFailedException.assert(
            this.components[this.components.length - 1] === c,
            "Postcondition not met: Component was not appended."
        );
        MethodFailedException.assert(
            this.components.length === oldLength + 1,
            "Postcondition not met: Length did not increase by one."
        );
        
        this.assertClassInvariant();
    }

    public remove(i: number): void {
        this.assertClassInvariant();
        this.assertIndexInBounds(i, this.components.length);
        
        const oldLength = this.components.length;
        this.components.splice(i, 1);
        
        MethodFailedException.assert(
            this.components.length === oldLength - 1,
            "Postcondition not met: Length did not decrease by one."
        );
        
        this.assertClassInvariant();
    }
}
