import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.assertIsValidDelimiter(delimiter);
        this.delimiter = delimiter;
        this.assertClassInvariant();
    }

    protected assertClassInvariant(): void {
        InvalidStateException.assert(
            this.delimiter !== undefined && this.delimiter !== null && this.delimiter.length === 1,
            "Class invariant not met: Delimiter must be a single character."
        );
    }

    protected assertIsValidDelimiter(delimiter: string): void {
        IllegalArgumentException.assert(
            delimiter !== undefined && delimiter !== null && delimiter.length === 1,
            "Precondition not met: Delimiter must be a single character."
        );
    }

    protected assertIndexInBounds(i: number, length: number): void {
        IllegalArgumentException.assert(
            i >= 0 && i < length,
            `Precondition not met: Index ${i} is out of bounds [0, ${length - 1}].`
        );
    }

    protected assertInsertIndexInBounds(i: number, length: number): void {
        IllegalArgumentException.assert(
            i >= 0 && i <= length,
            `Precondition not met: Insertion index ${i} is out of bounds [0, ${length}].`
        );
    }

    protected assertIsValidComponent(c: string): void {
        IllegalArgumentException.assert(
            c !== undefined && c !== null,
            "Precondition not met: Component must not be null or undefined."
        );
    }

    protected assertIsValidName(other: Name): void {
        IllegalArgumentException.assert(
            other !== undefined && other !== null,
            "Precondition not met: Name must not be null or undefined."
        );
    }

    public abstract getNoComponents(): number;
    public abstract getComponent(i: number): string;
    
    // Abstract methods now return Name 
    public abstract setComponent(i: number, c: string): Name;
    public abstract insert(i: number, c: string): Name;
    public abstract append(c: string): Name;
    public abstract remove(i: number): Name;
    public abstract clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        this.assertClassInvariant();
        this.assertIsValidDelimiter(delimiter);
        
        const components: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            let comp = this.getComponent(i);
            comp = this.unmaskComponent(comp, this.delimiter);
            if (delimiter !== this.delimiter) {
                comp = this.maskComponent(comp, delimiter);
            }
            components.push(comp);
        }
        const result = components.join(delimiter);
        
        MethodFailedException.assert(
            result !== undefined,
            "Postcondition not met: asString result should not be undefined."
        );
        
        this.assertClassInvariant();
        return result;
    }

    public asDataString(): string {
        this.assertClassInvariant();
        
        const components: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            let comp = this.getComponent(i);
            comp = this.unmaskComponent(comp, this.delimiter);
            comp = this.maskComponent(comp, DEFAULT_DELIMITER);
            components.push(comp);
        }
        const result = components.join(DEFAULT_DELIMITER);
        
        MethodFailedException.assert(
            result !== undefined,
            "Postcondition not met: asDataString result should not be undefined."
        );
        
        this.assertClassInvariant();
        return result;
    }

    public toString(): string {
        return this.asDataString();
    }

    public getDelimiterCharacter(): string {
        this.assertClassInvariant();
        return this.delimiter;
    }

    public isEmpty(): boolean {
        this.assertClassInvariant();
        return this.getNoComponents() === 0;
    }

    public isEqual(other: Name): boolean {
        this.assertClassInvariant();
        
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
        this.assertClassInvariant();
        
        let hash = 0;
        const s = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            const char = s.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }

    public concat(other: Name): Name {
        this.assertClassInvariant();
        this.assertIsValidName(other);
        
        const oldLength = this.getNoComponents();
        const otherLength = other.getNoComponents();
    
        // Each append returns a NEW object.
        let result: Name = this;

        for (let i = 0; i < other.getNoComponents(); i++) {
            result = result.append(other.getComponent(i));
        }
        
        MethodFailedException.assert(
            result.getNoComponents() === oldLength + otherLength,
            "Postcondition not met: Length should increase by other name's length."
        );
        
        this.assertClassInvariant();
        return result;
    }

   
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