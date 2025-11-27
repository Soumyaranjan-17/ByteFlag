import { describe, it, expect } from 'vitest';
import { ByteFlags } from '../src/ByteFlags.js';

describe('ByteFlags', () => {
    const flagsMap = {
        flag0: 0,
        flag1: 1,
        flag2: 2,
        flag7: 7,
    };

    it('should initialize with default byte 0', () => {
        const flags = new ByteFlags(flagsMap);
        expect(flags.getByte()).toBe(0);
    });

    it('should initialize with provided byte', () => {
        const flags = new ByteFlags(flagsMap, 5); // 00000101 -> flag0 and flag2
        expect(flags.getByte()).toBe(5);
        expect(flags.isEnabled('flag0')).toBe(true);
        expect(flags.isEnabled('flag2')).toBe(true);
        expect(flags.isEnabled('flag1')).toBe(false);
    });

    it('should throw error for invalid mapping indices', () => {
        expect(() => new ByteFlags({ invalid: 8 })).toThrow(/Invalid bit index/);
        expect(() => new ByteFlags({ invalid: -1 })).toThrow(/Invalid bit index/);
    });

    it('should throw error for invalid initial byte', () => {
        expect(() => new ByteFlags(flagsMap, 256)).toThrow(/Invalid byte value/);
        expect(() => new ByteFlags(flagsMap, -1)).toThrow(/Invalid byte value/);
    });

    it('should enable flags correctly', () => {
        const flags = new ByteFlags(flagsMap);
        flags.enable('flag0');
        expect(flags.getByte()).toBe(1);
        expect(flags.isEnabled('flag0')).toBe(true);

        flags.enable('flag7');
        expect(flags.getByte()).toBe(129); // 10000001
        expect(flags.isEnabled('flag7')).toBe(true);
    });

    it('should disable flags correctly', () => {
        const flags = new ByteFlags(flagsMap, 255);
        flags.disable('flag0');
        expect(flags.isEnabled('flag0')).toBe(false);
        expect(flags.getByte()).toBe(254);
    });

    it('should toggle flags correctly', () => {
        const flags = new ByteFlags(flagsMap);
        flags.toggle('flag0');
        expect(flags.isEnabled('flag0')).toBe(true);
        flags.toggle('flag0');
        expect(flags.isEnabled('flag0')).toBe(false);
    });

    it('should throw error when accessing undefined flag', () => {
        const flags = new ByteFlags(flagsMap);
        expect(() => flags.enable('missing')).toThrow(/not defined in the mapping/);
        expect(() => flags.disable('missing')).toThrow(/not defined in the mapping/);
        expect(() => flags.toggle('missing')).toThrow(/not defined in the mapping/);
        expect(() => flags.isEnabled('missing')).toThrow(/not defined in the mapping/);
    });

    it('should set raw byte value', () => {
        const flags = new ByteFlags(flagsMap);
        flags.setByte(10);
        expect(flags.getByte()).toBe(10);
        expect(() => flags.setByte(300)).toThrow(/Invalid byte value/);
    });

    it('should serialize to JSON', () => {
        const flags = new ByteFlags(flagsMap, 5); // flag0, flag2
        const json = flags.toJSON();
        expect(json).toEqual({
            flag0: true,
            flag1: false,
            flag2: true,
            flag7: false,
        });
    });

    it('should deserialize from JSON', () => {
        const flags = new ByteFlags(flagsMap);
        flags.fromJSON({
            flag0: true,
            flag7: true,
        });
        expect(flags.isEnabled('flag0')).toBe(true);
        expect(flags.isEnabled('flag7')).toBe(true);
        expect(flags.isEnabled('flag1')).toBe(false);
    });

    it('should throw error when deserializing unknown flag', () => {
        const flags = new ByteFlags(flagsMap);
        expect(() => flags.fromJSON({ unknown: true })).toThrow(/not defined in the mapping/);
    });

    it('should return correct binary string', () => {
        const flags = new ByteFlags(flagsMap, 5);
        expect(flags.toBinaryString()).toBe('00000101');
    });

    it('should return correct hex string', () => {
        const flags = new ByteFlags(flagsMap, 5);
        expect(flags.toHex()).toBe('0x05');
        flags.setByte(255);
        expect(flags.toHex()).toBe('0xFF');
    });
});
