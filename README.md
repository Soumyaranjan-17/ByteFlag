# ByteFlags

[![npm version](https://img.shields.io/npm/v/byteflags.svg?style=flat-square)](https://www.npmjs.com/package/byteflags)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Soumyaranjan-17/ByteFlag/ci.yml?branch=main&style=flat-square)](https://github.com/Soumyaranjan-17/ByteFlag/actions)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/byteflags?style=flat-square)](https://bundlephobia.com/package/byteflags)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)

> **Pack up to 8 boolean settings into a single byte.** 📦

**ByteFlags** is a lightweight, zero-dependency utility library designed to manage boolean flags efficiently using bitwise operations. It provides a high-level, type-safe API so you can optimize memory usage without dealing with complex bit manipulation manually.

---

## ✨ Features

- 🚀 **Ultra Lightweight**: Zero dependencies and tiny footprint.
- 🔢 **Efficient**: Stores up to 8 boolean states in a single number (0-255).
- 🛡️ **Type-Safe**: Built with TypeScript for full autocomplete and type checking.
- 💾 **Serialization**: Built-in support for JSON, Binary, and Hex formats.
- 🎮 **Game Ready**: Perfect for game states, permission systems, and config flags.

## 📦 Installation

```bash
npm install byteflags
# or
yarn add byteflags
# or
pnpm add byteflags
```

## 🚀 Quick Start

```typescript
import { ByteFlags } from 'byteflags';

// 1. Define your flags (map name to bit index 0-7)
const flags = new ByteFlags({
  DarkMode: 0,
  Notifications: 1,
  AutoSave: 2
});

// 2. Manipulate flags
flags.enable('DarkMode');
flags.toggle('Notifications');

// 3. Check state
console.log(flags.isEnabled('DarkMode')); // true
console.log(flags.isEnabled('AutoSave')); // false

// 4. Get the packed value (great for saving to DB)
const packed = flags.getByte(); // e.g., 3 (00000011)
```

## 📚 API Reference

### `new ByteFlags(mapping, [initialValue])`
Initialize the flags with a mapping object and an optional initial byte value.
- `mapping`: `Record<string, number>` - Map flag names to bit indices (0-7).
- `initialValue`: `number` (optional) - Starting byte value (default: 0).

### Methods

#### State Management
- **`enable(flag: string): void`**
  Sets the specified flag to `true` (1).
- **`disable(flag: string): void`**
  Sets the specified flag to `false` (0).
- **`toggle(flag: string): void`**
  Toggles the state of the specified flag.
- **`reset(): void`**
  Resets all flags to `false` (sets byte to 0).

#### State Query
- **`isEnabled(flag: string): boolean`**
  Returns `true` if the flag is set, otherwise `false`.

#### Data Access
- **`getByte(): number`**
  Returns the current integer representation of the flags (0-255).
- **`setByte(value: number): void`**
  Sets the flags directly from an integer value.

#### Serialization
- **`toJSON(): Record<string, boolean>`**
  Returns a plain object with all flag states.
- **`fromJSON(data: Record<string, boolean>): void`**
  Updates the flags based on a JSON object.
- **`toBinaryString(): string`**
  Returns the 8-bit binary string (e.g., `"00000101"`).
- **`toHex(): string`**
  Returns the hexadecimal string (e.g., `"0x05"`).

## 💡 Use Cases

- **User Preferences**: Store multiple settings (theme, notifications, privacy) in a single database column.
- **Role-Based Access Control (RBAC)**: Manage permissions (read, write, delete, admin) efficiently.
- **Game Development**: Track player states (isJumping, hasKey, isInvincible) with minimal memory.
- **IoT & Embedded**: Optimize bandwidth by sending status flags as a single byte.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Soumyaranjan-17](https://github.com/Soumyaranjan-17)
