
import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        IllegalArgumentException.assert(
            cn !== undefined && cn !== null,
            "Precondition not met: Child node must not be null."
        );
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        IllegalArgumentException.assert(
            cn !== undefined && cn !== null,
            "Precondition not met: Child node must not be null."
        );
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        IllegalArgumentException.assert(
            cn !== undefined && cn !== null,
            "Precondition not met: Child node must not be null."
        );

        IllegalArgumentException.assert(
            this.childNodes.has(cn),
            "Precondition not met: Child node not exist"
        );
        this.childNodes.delete(cn);
    }
}
