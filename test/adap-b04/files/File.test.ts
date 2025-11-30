// File.test.ts
import { describe, it, expect, beforeEach } from "vitest";

import { File } from "../../../src/adap-b04/files/File"; 
import { Directory } from "../../../src/adap-b04/files/Directory";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";

class TestDirectory extends Directory {
    protected initialize(pn: Directory): void {
        if (pn) {
            this.parentNode = pn;
            this.parentNode.addChildNode(this);
        }

    }
}


describe('File and Node Contracts (Filesystem Preconditions)', () => {
    let mockParent: Directory;
    let file: File;

    beforeEach(() => {
        mockParent = new TestDirectory("mock_parent", null as any); 
        
        file = new File("testfile", mockParent); 
    });

    describe('Node Base Name Preconditions', () => {
        it('rename() throws IllegalArgumentException for empty base name', () => {
            expect(() => {
                file.rename("");
            }).toThrow(IllegalArgumentException);
        });
    });

    describe('File State Preconditions (Client Obligations)', () => {

        it('close() throws when CLOSED (Dont close a closed file)', () => {
            expect(() => file.close()).toThrow(IllegalArgumentException);
        });
        it('read() throws when CLOSED (Dont read from a closed file)', () => {
            expect(() => file.read(10)).toThrow(IllegalArgumentException);
        });

        it('open() throws when OPEN (Dont open an open file)', () => {
            file.open(); 
            expect(() => file.open()).toThrow(IllegalArgumentException); 
        });
        
        it('read() throws when DELETED (Dont read from a deleted file)', () => {
            file.delete(); 
            expect(() => file.read(10)).toThrow(IllegalArgumentException); 
        });
    });
});