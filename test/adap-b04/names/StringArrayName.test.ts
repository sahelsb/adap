// StringArrayName.test.ts (Homework B04: Design by Contract Tests)
import { describe, it, expect, beforeEach } from "vitest";

import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";

describe('StringArrayName Contracts (Design by Contract)', () => {
    let name: StringArrayName;

    beforeEach(() => {
        name = new StringArrayName(["a", "b", "c"], '.');
    });

   
    describe('Preconditions (Client Obligations)', () => {

        it('getComponent() throws on negative index', () => {
            expect(() => name.getComponent(-1)).toThrow(IllegalArgumentException);
        });

        it('getComponent() throws on index >= length', () => {
            expect(() => name.getComponent(3)).toThrow(IllegalArgumentException);
        });

        it('setComponent() throws on negative index', () => {
            expect(() => name.setComponent(-1, "d")).toThrow(IllegalArgumentException);
        });

        it('setComponent() throws on index >= length', () => {
            expect(() => name.setComponent(3, "d")).toThrow(IllegalArgumentException);
        });

        it('insert() throws on negative index', () => {
            expect(() => name.insert(-1, "d")).toThrow(IllegalArgumentException);
        });

        it('insert() throws on index > length', () => {
            expect(() => name.insert(4, "d")).toThrow(IllegalArgumentException);
        });

        it('remove() throws on negative index', () => {
            expect(() => name.remove(-1)).toThrow(IllegalArgumentException);
        });

        it('remove() throws on index >= length', () => {
            expect(() => name.remove(3)).toThrow(IllegalArgumentException);
        });

        it('concat() throws on null name', () => {
            expect(() => name.concat(null as any)).toThrow(IllegalArgumentException);
        });

        it('concat() throws on undefined name', () => {
            expect(() => name.concat(undefined as any)).toThrow(IllegalArgumentException);
        });
    });

   
    describe('Class Invariants (State Errors)', () => {
        
        it('Constructor throws on invalid delimiter (empty string)', () => {
            expect(() => new StringArrayName(["a"], "")).toThrow(IllegalArgumentException);
        });

        it('Constructor throws on invalid delimiter (length > 1)', () => {
            expect(() => new StringArrayName(["a"], "..")).toThrow(IllegalArgumentException);
        });

        it('Constructor throws on null source array', () => {
            expect(() => new StringArrayName(null as any, ".")).toThrow(IllegalArgumentException);
        });
    });

   
    describe('Postconditions and Functionality', () => {
        
        it('insert() increases length by one', () => {
            const originalLength = name.getNoComponents();
            name.insert(1, "new");
            expect(name.getNoComponents()).toBe(originalLength + 1);
            expect(name.getComponent(1)).toBe("new");
        });

        it('insert() at position 0 works correctly', () => {
            name.insert(0, "first");
            expect(name.getComponent(0)).toBe("first");
            expect(name.getComponent(1)).toBe("a");
        });

        it('insert() at end position works correctly', () => {
            name.insert(3, "last");
            expect(name.getComponent(3)).toBe("last");
        });

        it('append() adds component at the end', () => {
            const originalLength = name.getNoComponents();
            name.append("d");
            expect(name.getNoComponents()).toBe(originalLength + 1);
            expect(name.getComponent(name.getNoComponents() - 1)).toBe("d");
        });

        it('setComponent() sets the component correctly', () => {
            name.setComponent(1, "test");
            expect(name.getComponent(1)).toBe("test");
            expect(name.getNoComponents()).toBe(3); 
        });

        it('remove() decreases length by one', () => {
            const originalLength = name.getNoComponents();
            name.remove(1);
            expect(name.getNoComponents()).toBe(originalLength - 1);
        });

        it('clone() creates an equal copy', () => {
            const cloned = name.clone();
            expect(cloned.isEqual(name)).toBe(true);
        });

        it('concat() appends all components from other name', () => {
            const other = new StringArrayName(["x", "y"], ".");
            const originalLength = name.getNoComponents();
            name.concat(other);
            expect(name.getNoComponents()).toBe(originalLength + 2);
            expect(name.getComponent(3)).toBe("x");
            expect(name.getComponent(4)).toBe("y");
        });

        it('isEmpty() returns correct values', () => {
            expect(name.isEmpty()).toBe(false);
            const emptyName = new StringArrayName([], ".");
            expect(emptyName.isEmpty()).toBe(true);
        });

        it('getDelimiterCharacter() returns the delimiter', () => {
            expect(name.getDelimiterCharacter()).toBe(".");
        });

        it('asString() returns components joined by delimiter', () => {
            const result = name.asString();
            expect(result).toBe("a.b.c");
        });

        it('asString() with custom delimiter works', () => {
            const result = name.asString("/");
            expect(result).toBe("a/b/c");
        });

        it('isEqual() returns true for equal names', () => {
            const other = new StringArrayName(["a", "b", "c"], ".");
            expect(name.isEqual(other)).toBe(true);
        });

        it('isEqual() returns false for different components', () => {
            const other = new StringArrayName(["a", "b", "d"], ".");
            expect(name.isEqual(other)).toBe(false);
        });

        it('isEqual() returns false for different delimiters', () => {
            const other = new StringArrayName(["a", "b", "c"], "/");
            expect(name.isEqual(other)).toBe(false);
        });

        it('isEqual() returns false for different lengths', () => {
            const other = new StringArrayName(["a", "b"], ".");
            expect(name.isEqual(other)).toBe(false);
        });

        it('getHashCode() returns consistent values', () => {
            const hash1 = name.getHashCode();
            const hash2 = name.getHashCode();
            expect(hash1).toBe(hash2);
        });

        it('equal names have equal hash codes', () => {
            const other = new StringArrayName(["a", "b", "c"], ".");
            expect(name.getHashCode()).toBe(other.getHashCode());
        });
    });
});
