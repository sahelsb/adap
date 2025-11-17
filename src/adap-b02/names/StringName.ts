import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        if (delimiter !== undefined) {
            this.delimiter = delimiter;
        }
        this.name = source;
        this.noComponents = source === "" ? 1 : source.split(this.delimiter).length;
    }

    public asString(delimiter: string = this.delimiter): string {
         return this.name;
    }

    public asDataString(): string {
        return this.name;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0 || this.name.split(this.delimiter).every(c => c === "");
    }

    public getNoComponents(): number {
         return this.noComponents;
    }

    public getComponent(x: number): string {
        return this.name.split(this.delimiter)[x];
    }

    public setComponent(n: number, c: string): void {
        const parts = this.name.split(this.delimiter);
        parts[n] = c;
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

    public insert(n: number, c: string): void {
        const parts = this.name.split(this.delimiter);
        parts.splice(n, 0, c);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

    public append(c: string): void {
       const parts = this.name.split(this.delimiter);
        parts.push(c);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

    public remove(n: number): void {
        const parts = this.name === "" ? [] : this.name.split(this.delimiter);
        parts.splice(n, 1); 
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

    public concat(other: Name): void {
        const parts = this.name.split(this.delimiter);
        for (let i = 0; i < other.getNoComponents(); i++) {
            parts.push(other.getComponent(i));
        }
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

}