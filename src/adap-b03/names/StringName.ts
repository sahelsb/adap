// StringName.ts (Homework B03: Inheritance)

import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        this.noComponents = this.splitComponents().length;
    }

    // Helper 
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
        return new StringName(this.name, this.delimiter);
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        const components = this.splitComponents();
        if (i < 0 || i >= components.length) {
            throw new RangeError("Index out of bounds");
        }
        return components[i];
    }

    public setComponent(i: number, c: string): void {
        const components = this.splitComponents();
        if (i < 0 || i >= components.length) {
            throw new RangeError("Index out of bounds");
        }
        components[i] = c;
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    public insert(i: number, c: string): void {
        const components = this.splitComponents();
        if (i < 0 || i > components.length) {
            throw new RangeError("Index out of bounds");
        }
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    public append(c: string): void {
        const components = this.splitComponents();
        components.push(c);
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    public remove(i: number): void {
        const components = this.splitComponents();
        if (i < 0 || i >= components.length) {
            throw new RangeError("Index out of bounds");
        }
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }
}
