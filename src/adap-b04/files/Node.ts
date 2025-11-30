// Node.ts (Contracts Added)

import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException"; // Required for Precondition

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        Node.assertValidBaseNameAsPrecondition(bn);
        
        this.doSetBaseName(bn);
        this.parentNode = pn;
        this.initialize(pn);
    }
    
    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }
    
 
    protected static assertValidBaseNameAsPrecondition(baseName: string): void {
        const condition = baseName.length > 0;
        IllegalArgumentException.assert(condition, "Precondition not met: Base name must be a non-empty string.");
    }
    

    public rename(bn: string): void {
        Node.assertValidBaseNameAsPrecondition(bn);
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

}