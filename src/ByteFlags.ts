export class ByteFlags {
    private byte: number;
    private map: Record<string, number>;

    constructor(mapping: Record<string, number>, initialByte: number = 0) {
        this.validateMapping(mapping);
        this.validateByte(initialByte);
        this.map = mapping;
        this.byte = initialByte;
    }

    private validateMapping(mapping: Record<string, number>): void {
        for (const [key, bitIndex] of Object.entries(mapping)) {
            if (bitIndex < 0 || bitIndex > 7) {
                throw new Error(`Invalid bit index for flag '${key}': ${bitIndex}. Must be between 0 and 7.`);
            }
        }
    }

    private validateByte(byte: number): void {
        if (byte < 0 || byte > 255) {
            throw new Error(`Invalid byte value: ${byte}. Must be between 0 and 255.`);
        }
    }

    private getBitIndex(flagName: string): number {
        const bitIndex = this.map[flagName];
        if (bitIndex === undefined) {
            throw new Error(`Flag '${flagName}' is not defined in the mapping.`);
        }
        return bitIndex;
    }

    enable(flagName: string): void {
        const bitIndex = this.getBitIndex(flagName);
        this.byte |= (1 << bitIndex);
    }

    disable(flagName: string): void {
        const bitIndex = this.getBitIndex(flagName);
        this.byte &= ~(1 << bitIndex);
    }

    toggle(flagName: string): void {
        const bitIndex = this.getBitIndex(flagName);
        this.byte ^= (1 << bitIndex);
    }

    isEnabled(flagName: string): boolean {
        const bitIndex = this.getBitIndex(flagName);
        return (this.byte & (1 << bitIndex)) !== 0;
    }

    setByte(value: number): void {
        this.validateByte(value);
        this.byte = value;
    }

    getByte(): number {
        return this.byte;
    }

    reset(): void {
        this.byte = 0;
    }

    toJSON(): Record<string, boolean> {
        const result: Record<string, boolean> = {};
        for (const flagName of Object.keys(this.map)) {
            result[flagName] = this.isEnabled(flagName);
        }
        return result;
    }

    fromJSON(data: Record<string, boolean>): void {
        for (const [flagName, isEnabled] of Object.entries(data)) {
            if (this.map[flagName] === undefined) {
                if (this.map[flagName] === undefined) {
                    throw new Error(`Flag '${flagName}' is not defined in the mapping.`);
                }
            }
        }

        for (const [flagName, isEnabled] of Object.entries(data)) {
            if (isEnabled) {
                this.enable(flagName);
            } else {
                this.disable(flagName);
            }
        }
    }

    toBinaryString(): string {
        return this.byte.toString(2).padStart(8, '0');
    }

    toHex(): string {
        return '0x' + this.byte.toString(16).toUpperCase().padStart(2, '0');
    }
}
