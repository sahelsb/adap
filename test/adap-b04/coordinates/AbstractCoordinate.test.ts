// AbstractCoordinate.test.ts
import { describe, it, expect, beforeEach } from "vitest";

import { CartesianCoordinate } from "../../../src/adap-b04/coordinates/CartesianCoordinate";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";
import { MethodFailedException } from "../../../src/adap-b04/common/MethodFailedException";

describe('AbstractCoordinate Contracts (DbC)', () => {
    let coord: CartesianCoordinate;

    beforeEach(() => {
        coord = new CartesianCoordinate(1, 0); 
    });

    describe('Polar Preconditions enforced by IllegalArgumentException', () => {

        it('setR() throws on negative R value', () => {
            expect(() => {
                coord.setR(-1);
            }).toThrow(IllegalArgumentException);
        });

        it('setPhi() throws on Phi outside [0, 2*PI)', () => {
            expect(() => {
                coord.setPhi(-0.0001);
            }).toThrow(IllegalArgumentException);
            expect(() => {
                coord.setPhi(6.283186); 
            }).toThrow(IllegalArgumentException);
        });
    });
    
    describe('Postconditions enforced by MethodFailedException', () => {
        
        it('setX() guarantees X value is set correctly', () => {
             expect(() => {
                coord.setX(3);
             }).not.toThrow(MethodFailedException);
             expect(coord.getX()).toBe(3);
        });
    });

    describe('Class Invariant enforced by InvalidStateException', () => {
        
        it('setR() correctly maintains invariant (R >= 0)', () => {
            expect(() => {
                coord.setR(5);
            }).not.toThrow(InvalidStateException);
        });
    });
});