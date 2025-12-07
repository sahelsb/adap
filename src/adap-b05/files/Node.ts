
import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { ServiceFailureException } from "../common/ServiceFailureException";


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

    protected assertBaseNameInvariant(): void {
        const condition = this.baseName.length > 0;
        InvalidStateException.assert(condition, "Class Invariant not met: Base name cannot be empty.");
    }
    

    public rename(bn: string): void {
        Node.assertValidBaseNameAsPrecondition(bn);
        this.doSetBaseName(bn);
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    public getBaseName(): string {
        this.assertBaseNameInvariant();
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }


        /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */

    public findNodes(bn: string): Set<Node> {
        const result: Set<Node> = new Set<Node>();
        this.doFindNodes(bn, result);
        return result;
    }
    public doFindNodes(bn: string, result: Set<Node>): void { 
        if (this.getBaseName() === bn) {
            result.add(this);
        }
    }
}


