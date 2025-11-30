// StringName.ts (Homework B04: Design by Contract)

import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);
        
        IllegalArgumentException.assert(
            source !== undefined && source !== null,
            "Precondition not met: Source string must not be null or undefined."
        );
        
        this.name = source;
        this.noComponents = this.splitComponents().length;
        
        MethodFailedException.assert(
            this.noComponents >= 1,
            "Postcondition not met: Number of components should be at least 1."
        );
        
        this.assertClassInvariant();
    }

    // helper
    private splitComponents(): string[] {
        const components: string[] = [];
        let current = "";
        let i = 0;
        
        while (i < this.name.length) {
            if (this.name[i] === ESCAPE_CHARACTER && i + 1 < this.name.length) {
                current += this.name[i] + this.name[i + 1];
                i += 2;
            } else if (this.name[i] === this.delimiter) {
                components.push(current);
                current = "";
                i++;
            } else {
                current += this.name[i];
                i++;
            }
        }
        components.push(current);
        
        return components;
    }


    public clone(): Name {
        this.assertClassInvariant();
        const result = new StringName(this.name, this.delimiter);
        MethodFailedException.assert(
            result.isEqual(this),
            "Postcondition not met: Cloned name should be equal to original."
        );
        this.assertClassInvariant();
        return result;
    }

    public getNoComponents(): number {
        this.assertClassInvariant();
        return this.noComponents;
    }

    public getComponent(i: number): string {
        this.assertClassInvariant();
        
        const components = this.splitComponents();
        this.assertIndexInBounds(i, components.length);
        
        const component = components[i];
        
        MethodFailedException.assert(
            component !== undefined,
            "Postcondition not met: Component returned undefined unexpectedly."
        );
        
        this.assertClassInvariant();
        return component;
    }

    public setComponent(i: number, c: string): void {
        this.assertClassInvariant();
        
        const components = this.splitComponents();
        this.assertIndexInBounds(i, components.length);
        this.assertIsValidComponent(c);
        
        const oldLength = components.length;
        components[i] = c;
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
        
        MethodFailedException.assert(
            this.getComponent(i) === c,
            "Postcondition not met: Component was not set correctly."
        );
        MethodFailedException.assert(
            this.noComponents === oldLength,
            "Postcondition not met: Number of components changed unexpectedly."
        );
        
        this.assertClassInvariant();
    }

    public insert(i: number, c: string): void {
        this.assertClassInvariant();
        
        const components = this.splitComponents();
        this.assertInsertIndexInBounds(i, components.length);
        this.assertIsValidComponent(c);
        
        const oldLength = components.length;
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
        
        MethodFailedException.assert(
            this.getComponent(i) === c,
            "Postcondition not met: Component was not inserted at the correct index."
        );
        MethodFailedException.assert(
            this.noComponents === oldLength + 1,
            "Postcondition not met: Number of components did not increase by one."
        );
        
        this.assertClassInvariant();
    }

    public append(c: string): void {
        this.assertClassInvariant();
        this.assertIsValidComponent(c);
        
        const oldLength = this.noComponents;
        const components = this.splitComponents();
        components.push(c);
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
        
        MethodFailedException.assert(
            this.getComponent(this.noComponents - 1) === c,
            "Postcondition not met: Component was not appended."
        );
        MethodFailedException.assert(
            this.noComponents === oldLength + 1,
            "Postcondition not met: Number of components did not increase by one."
        );
        
        this.assertClassInvariant();
    }

    public remove(i: number): void {
        this.assertClassInvariant();
        
        const components = this.splitComponents();
        this.assertIndexInBounds(i, components.length);
        
        const oldLength = components.length;
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
        
        MethodFailedException.assert(
            this.noComponents === oldLength - 1,
            "Postcondition not met: Number of components did not decrease by one."
        );
        
        this.assertClassInvariant();
    }
}
