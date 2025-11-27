# ByteFlags

ByteFlags is a tiny utility library that packs up to 8 boolean settings inside 1 byte using bit manipulation. It provides a high-level API so developers never need to handle bit operations manually.

## Features

- **Efficient**: Stores up to 8 booleans in a single byte (0-255).
- **Easy to Use**: Simple API for enabling, disabling, and toggling flags.
- **Type Safe**: Full TypeScript support.
- **Serialization**: Easy conversion to/from JSON, Binary string, and Hex.
- **Zero Dependencies**: Lightweight and fast.

## Installation

```bash
npm install byteflags
```

## Usage

```typescript
import { ByteFlags } from 'byteflags';

// Define your flags mapping (name -> bit index 0-7)
const flags = new ByteFlags({
  darkMode: 0,
  autoSave: 1,
  notifications: 2,
});

// Enable/Disable/Toggle
flags.enable("darkMode");
flags.disable("autoSave");
flags.toggle("notifications");

// Check status
console.log(flags.isEnabled("darkMode")); // true

// Get raw byte value
console.log(flags.getByte());        // e.g., 5

// Export formats
console.log(flags.toBinaryString()); // "00000101"
console.log(flags.toHex());          // "0x05"

// Serialization
const json = flags.toJSON();
console.log(json);
// { darkMode: true, autoSave: false, notifications: true }

// Load from JSON
flags.fromJSON({ darkMode: false, autoSave: true });
```

## When to use Bit-Packing?

Bit-packing is ideal when you need to store multiple boolean states efficiently, such as:
- User preferences (e.g., notifications, theme, privacy settings)
- Permission systems (e.g., read, write, execute, admin)
- Game states (e.g., isJumping, isRunning, hasPowerUp)
- IoT device status flags

It saves memory and bandwidth by compressing 8 booleans into a single number.

## API

### `new ByteFlags(mapping: Record<string, number>, initialByte?: number)`
Creates a new ByteFlags instance.
- `mapping`: Object mapping flag names to bit indices (0-7).
- `initialByte`: Optional initial byte value (0-255). Default is 0.

### Methods

- `enable(flagName: string): void`: Sets the flag bit to 1.
- `disable(flagName: string): void`: Sets the flag bit to 0.
- `toggle(flagName: string): void`: Toggles the flag bit.
- `isEnabled(flagName: string): boolean`: Returns true if the flag bit is 1.
- `setByte(value: number): void`: Sets the raw byte value directly.
- `getByte(): number`: Returns the current raw byte value.
- `toJSON(): Record<string, boolean>`: Returns an object with all flags and their boolean status.
- `fromJSON(data: Record<string, boolean>): void`: Updates flags based on the provided object.
- `toBinaryString(): string`: Returns the 8-bit binary string representation.
- `toHex(): string`: Returns the hex string representation.

## License

MIT
