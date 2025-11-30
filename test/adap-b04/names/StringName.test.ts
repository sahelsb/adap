// StringName.test.ts (Homework B04: Design by Contract Tests)
import { describe, it, expect, beforeEach } from "vitest";

import { StringName } from "../../../src/adap-b04/names/StringName";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";

describe('StringName Contracts (Design by Contract)', () => {
    let name: StringName;

    beforeEach(() => {
        name = new StringName("a.b.c", '.');
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
    });


    describe('Class Invariants (State Errors)', () => {
        
        it('Constructor throws on invalid delimiter (empty string)', () => {
            expect(() => new StringName("a", "")).toThrow(IllegalArgumentException);
        });

        it('Constructor throws on invalid delimiter (length > 1)', () => {
            expect(() => new StringName("a", "..")).toThrow(IllegalArgumentException);
        });

        it('Constructor throws on null source string', () => {
            expect(() => new StringName(null as any, ".")).toThrow(IllegalArgumentException);
        });
    });

    
    describe('Postconditions and Functionality', () => {
        
        it('getNoComponents() returns correct count', () => {
            expect(name.getNoComponents()).toBe(3);
        });

        it('getComponent() returns correct component', () => {
            expect(name.getComponent(0)).toBe("a");
            expect(name.getComponent(1)).toBe("b");
            expect(name.getComponent(2)).toBe("c");
        });

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
            const other = new StringName("x.y", ".");
            const originalLength = name.getNoComponents();
            name.concat(other);
            expect(name.getNoComponents()).toBe(originalLength + 2);
        });

        it('isEmpty() returns correct values', () => {
            expect(name.isEmpty()).toBe(false);
        });

        it('empty string has one empty component (not isEmpty)', () => {
            const emptyName = new StringName("", ".");
            expect(emptyName.getNoComponents()).toBe(1);
            expect(emptyName.isEmpty()).toBe(false); 
        });

        it('getDelimiterCharacter() returns the delimiter', () => {
            expect(name.getDelimiterCharacter()).toBe(".");
        });

        it('asString() returns the name string', () => {
            const result = name.asString();
            expect(result).toBe("a.b.c");
        });

        it('asString() with custom delimiter works', () => {
            const result = name.asString("/");
            expect(result).toBe("a/b/c");
        });

        it('isEqual() returns true for equal names', () => {
            const other = new StringName("a.b.c", ".");
            expect(name.isEqual(other)).toBe(true);
        });

        it('isEqual() returns false for different content', () => {
            const other = new StringName("a.b.d", ".");
            expect(name.isEqual(other)).toBe(false);
        });

        it('getHashCode() returns consistent values', () => {
            const hash1 = name.getHashCode();
            const hash2 = name.getHashCode();
            expect(hash1).toBe(hash2);
        });

    
        it('handles escaped delimiter in component', () => {
            const escapedName = new StringName("a\\.b.c", ".");
            expect(escapedName.getNoComponents()).toBe(2);
            expect(escapedName.getComponent(0)).toBe("a\\.b");
            expect(escapedName.getComponent(1)).toBe("c");
        });
    });
});

