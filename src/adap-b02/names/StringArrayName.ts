import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        if (delimiter !== undefined) {
            this.delimiter = delimiter;
        }
        this.components = [...source];
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components
        .map(c => c.replace(new RegExp(`[${delimiter.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\\\]`, "g"), m => ESCAPE_CHARACTER + m))
        .join(delimiter);
    }

    public asDataString(): string {
        return this.asString(this.delimiter);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.components.length === 0 || (this.components.length === 1 && this.components[0] === "");

    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("Index out of bounds");
        }
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("Index out of bounds");
        }
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        if (i < 0 || i > this.components.length) {
            throw new RangeError("Index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        this.components.splice(i, 1); 
    }

    public concat(other: Name): void {
        const no = other.getNoComponents();
        for (let i = 0; i < no; i++) {
            this.components.push(other.getComponent(i));
        }
    }

}