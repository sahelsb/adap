
import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { ServiceFailureException } from "../common/ServiceFailureException";

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

    public override doFindNodes(bn: string, result: Set<Node>): void {
        try {
            super.doFindNodes(bn, result);

            for (const child of this.childNodes) {
                child.doFindNodes(bn, result);
            }
        } catch (ex) {
            if (ex instanceof InvalidStateException) {
                throw new ServiceFailureException("Filesystem failed.", ex);
            }
            throw ex;
        }
}
}



