// AbstractName.ts (Homework B03: Inheritance)

import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    
    public abstract getNoComponents(): number;
    public abstract getComponent(i: number): string;
    public abstract setComponent(i: number, c: string): void;
    public abstract insert(i: number, c: string): void;
    public abstract append(c: string): void;
    public abstract remove(i: number): void;


    public clone(): Name {
        throw new Error("needs implementation or deletion");
    }

    public asString(delimiter: string = this.delimiter): string {
        const components: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            let comp = this.getComponent(i);
            comp = this.unmaskComponent(comp, this.delimiter);
            if (delimiter !== this.delimiter) {
                comp = this.maskComponent(comp, delimiter);
            }
            components.push(comp);
        }
        return components.join(delimiter);
    }

    public asDataString(): string {
        const components: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            let comp = this.getComponent(i);
            comp = this.unmaskComponent(comp, this.delimiter);
            comp = this.maskComponent(comp, DEFAULT_DELIMITER);
            components.push(comp);
        }
        return components.join(DEFAULT_DELIMITER);
    }

    public toString(): string {
        return this.asDataString();
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public isEqual(other: Name): boolean {
        if (other === null || other === undefined) {
            return false;
        }
        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }
        if (this.getDelimiterCharacter() !== other.getDelimiterCharacter()) {
            return false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    public getHashCode(): number {
        let hash = 0;
        const s = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            const char = s.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

    // Helper 

    protected maskComponent(component: string, delimiter: string): string {
        let masked = component.replace(new RegExp(this.escapeRegExp(ESCAPE_CHARACTER), 'g'), 
                                        ESCAPE_CHARACTER + ESCAPE_CHARACTER);
        masked = masked.replace(new RegExp(this.escapeRegExp(delimiter), 'g'), 
                                ESCAPE_CHARACTER + delimiter);
        return masked;
    }

    protected unmaskComponent(component: string, delimiter: string): string {
        let unmasked = component.replace(new RegExp(this.escapeRegExp(ESCAPE_CHARACTER + delimiter), 'g'), 
                                         delimiter);
        unmasked = unmasked.replace(new RegExp(this.escapeRegExp(ESCAPE_CHARACTER + ESCAPE_CHARACTER), 'g'), 
                                    ESCAPE_CHARACTER);
        return unmasked;
    }

    private escapeRegExp(s: string): string {
        return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}
