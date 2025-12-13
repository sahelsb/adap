import { describe, it, expect } from "vitest";
import { StringName } from "../../../src/adap-b06/names/StringName";
import { StringArrayName } from "../../../src/adap-b06/names/StringArrayName";
import { Name } from "../../../src/adap-b06/names/Name";

describe("Name Value Object tests", () => {

  it("test Immutability (append)", () => {
    let n1: Name = new StringName("oss.cs.fau.de");
    
    // Append should return a NEW object
    let n2 = n1.append("new");

    expect(n1.getNoComponents()).toBe(4);
    expect(n1.asDataString()).toBe("oss.cs.fau.de");

    expect(n2.getNoComponents()).toBe(5);
    expect(n2.asDataString()).toBe("oss.cs.fau.de.new");
  });

  it("test Equality (StringName vs StringArrayName)", () => {
    let n1: Name = new StringName("oss.cs.fau.de");
    let n2: Name = new StringArrayName(["oss", "cs", "fau", "de"]);

    expect(n1 === n2).toBe(false);

    expect(n1.isEqual(n2)).toBe(true);
    expect(n2.isEqual(n1)).toBe(true);

    expect(n1.getHashCode()).toBe(n2.getHashCode());
  });

  it("test Equality (Different Values)", () => {
    let n1: Name = new StringName("oss.cs.fau.de");
    let n2: Name = new StringName("oss.cs.fau.de.uk");

    expect(n1.isEqual(n2)).toBe(false);
  });

});