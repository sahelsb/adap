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

    public setComponent(i: number, c: string): Name {
        this.assertClassInvariant();
        this.assertIndexInBounds(i, this.components.length);
        this.assertIsValidComponent(c);
        
        const newComponents = [...this.components];
  
        newComponents[i] = c;
   
        const result = new StringArrayName(newComponents, this.delimiter);
       
        MethodFailedException.assert(
            result.getComponent(i) === c,
            "Postcondition not met: Component was not set correctly."
        );
        MethodFailedException.assert(
            result.getNoComponents() === this.components.length,
            "Postcondition not met: Length changed unexpectedly."
        );
        
        this.assertClassInvariant();
        return result;
    }

    public insert(i: number, c: string): Name {
        this.assertClassInvariant();
        this.assertInsertIndexInBounds(i, this.components.length);
        this.assertIsValidComponent(c);
        
        const newComponents = [...this.components];

        newComponents.splice(i, 0, c);

        const result = new StringArrayName(newComponents, this.delimiter);
        
        MethodFailedException.assert(
            result.getComponent(i) === c,
            "Postcondition not met: Component was not inserted at the correct index."
        );
        MethodFailedException.assert(
            result.getNoComponents() === this.components.length + 1,
            "Postcondition not met: Length did not increase by one."
        );
        
        this.assertClassInvariant();
        return result;
    }

    public append(c: string): Name {
        this.assertClassInvariant();
        this.assertIsValidComponent(c);
    
        const newComponents = [...this.components];
    
        newComponents.push(c);
        
        const result = new StringArrayName(newComponents, this.delimiter);
    
        MethodFailedException.assert(
            result.getComponent(result.getNoComponents() - 1) === c,
            "Postcondition not met: Component was not appended."
        );
        MethodFailedException.assert(
            result.getNoComponents() === this.components.length + 1,
            "Postcondition not met: Length did not increase by one."
        );
        
        this.assertClassInvariant();
        return result;
    }

    public remove(i: number): Name {
        this.assertClassInvariant();
        this.assertIndexInBounds(i, this.components.length);
        
        const newComponents = [...this.components];
     
        newComponents.splice(i, 1);
        
        const result = new StringArrayName(newComponents, this.delimiter);
        
        MethodFailedException.assert(
            result.getNoComponents() === this.components.length - 1,
            "Postcondition not met: Length did not decrease by one."
        );
        
        this.assertClassInvariant();
        return result;
    }
}