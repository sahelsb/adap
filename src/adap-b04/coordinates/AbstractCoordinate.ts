
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

import { Coordinate } from "./Coordinate";

export abstract class AbstractCoordinate implements Coordinate {

    protected assertClassInvariant(): void {
        const r = this.doGetR();
        const phi = this.doGetPhi();
        InvalidStateException.assert(
            this.isValidR(r) && this.isValidPhi(phi), 
            `Class invariant not met: R=${r} or Phi=${phi} is invalid.`
        );
    }
    
    protected isValidR(r: number): boolean {
        return r >= 0;
    }

    protected isValidPhi(phi: number): boolean {
        return (phi >= 0) && (phi < 2 * Math.PI);
    }


    public abstract clone(): Coordinate;
    public abstract reset(): void;

    protected abstract doGetX(): number;
    protected abstract doSetX(x: number): void;
    protected abstract doGetY(): number;
    protected abstract doSetY(y: number): void;
    protected abstract doGetR(): number;
    protected abstract doSetR(r: number): void;
    protected abstract doGetPhi(): number;
    protected abstract doSetPhi(phi: number): void;


    public isEqual(other: Object): boolean {
        if (!(other instanceof AbstractCoordinate)) {
            return false;
        }
        const otherCoord = other as Coordinate;
        return this.doGetX() === otherCoord.getX() && this.doGetY() === otherCoord.getY();
    }

    public getHashCode(): number {
        let hash = 17;
        hash = hash * 31 + this.doGetX();
        hash = hash * 31 + this.doGetY();
        return Math.floor(hash);
    }

    public getX(): number {
        return this.doGetX();
    }

    public setX(x: number): void {
        this.assertClassInvariant(); 

        this.doSetX(x);
        
        const newX: number = this.doGetX();
        MethodFailedException.assert(newX === x, "Postcondition not met: X was not set correctly.");
        
        this.assertClassInvariant(); 
    }

    public getY(): number {
        return this.doGetY();
    }

    public setY(y: number): void {
        this.assertClassInvariant(); 

        this.doSetY(y);
        
        const newY: number = this.doGetY();
        MethodFailedException.assert(newY === y, "Postcondition not met: Y was not set correctly.");
        
        this.assertClassInvariant(); 
    }
    
    public getR(): number {
        return this.doGetR();
    }

    public setR(r: number): void {
        this.assertClassInvariant(); 

        IllegalArgumentException.assert(this.isValidR(r), "Precondition not met: R must be non-negative.");
        
        this.doSetR(r);
        
        const newR: number = this.doGetR();
        MethodFailedException.assert(newR === r, "Postcondition not met: R was not set correctly.");

        this.assertClassInvariant(); 
    }

    public getPhi(): number {
        return this.doGetPhi();
    }

    public setPhi(phi: number): void {
        this.assertClassInvariant(); 

        IllegalArgumentException.assert(this.isValidPhi(phi), "Precondition not met: Phi must be in [0, 2*PI).");

        this.doSetPhi(phi);

        const newPhi: number = this.doGetPhi();
        
        InvalidStateException.assert(this.isValidPhi(newPhi), "Class invariant not met: New Phi value is incorrect.");
        MethodFailedException.assert(newPhi === phi, "Postcondition not met: Phi was not set correctly."); 
        
        this.assertClassInvariant(); 
    }

    public calcStraightLineDistance(other: Coordinate): number {
        IllegalArgumentException.assert(
            other !== undefined && other !== null,
            "Precondition not met: other coordinate must not be null."
        );
        
        const dx = this.doGetX() - other.getX();
        const dy = this.doGetY() - other.getY();
        return Math.sqrt(dx * dx + dy * dy);
    }

    public calcGreatCircleDistance(other: Coordinate): number {
        IllegalArgumentException.assert(
            other !== undefined && other !== null,
            "Precondition not met: other coordinate must not be null."
        );
        
    
        const r = Math.max(this.doGetR(), other.getR());
        const deltaPhi = Math.abs(this.doGetPhi() - other.getPhi());
        const angularDiff = Math.min(deltaPhi, 2 * Math.PI - deltaPhi);
        return r * angularDiff;
    }

    public multiplyWith(other: Coordinate): void {
        IllegalArgumentException.assert(
            other !== undefined && other !== null,
            "Precondition not met: other coordinate must not be null."
        );
        
        this.assertClassInvariant();
        
        const newR = this.doGetR() * other.getR();
        let newPhi = this.doGetPhi() + other.getPhi();
        
        while (newPhi >= 2 * Math.PI) {
            newPhi -= 2 * Math.PI;
        }
        while (newPhi < 0) {
            newPhi += 2 * Math.PI;
        }
        
        this.doSetR(newR);
        this.doSetPhi(newPhi);
        
        this.assertClassInvariant();
    }
}
