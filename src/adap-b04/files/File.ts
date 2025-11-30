// File.ts (Contracts Added)

import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException"; 

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    protected assertNotOpenAsPrecondition(): void {
        const condition = this.state !== FileState.OPEN;
        IllegalArgumentException.assert(condition, "Precondition not met: Dont open an open file.");
    }

    protected assertNotClosedAsPrecondition(): void {
        const condition = this.state !== FileState.CLOSED;
        IllegalArgumentException.assert(condition, "Precondition not met: Dont close a closed file.");
    }

    protected assertNotDeletedAsPrecondition(): void {
        const condition = this.state !== FileState.DELETED;
        IllegalArgumentException.assert(condition, "Precondition not met: Dont operate on a deleted file.");
    }


    public open(): void {
        
        this.assertNotOpenAsPrecondition(); 
        this.assertNotDeletedAsPrecondition(); 
        
        this.state = FileState.OPEN;
    }

    public read(noBytes: number): Int8Array {
        
        this.assertNotClosedAsPrecondition(); 
        this.assertNotDeletedAsPrecondition(); 
        return new Int8Array(noBytes);
    }
    
    public write(data: Int8Array): void {
        
        this.assertNotClosedAsPrecondition(); 
        this.assertNotDeletedAsPrecondition(); 
        
    }

    public close(): void {
        // Preconditions: Don’t close a closed file AND Don’t close a deleted file
        this.assertNotClosedAsPrecondition(); 
        this.assertNotDeletedAsPrecondition();

        this.state = FileState.CLOSED;
    }
    
    public delete(): void {
        this.state = FileState.DELETED;
    }

    protected doGetFileState(): FileState {
        return this.state;
    }
}