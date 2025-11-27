import { ByteFlags } from '../dist/index.js';

// 1. Define your flags mapping
// We want to store 3 settings:
// - Sound: bit 0
// - Music: bit 1
// - Vibration: bit 2
const settings = new ByteFlags({
    Sound: 0,
    Music: 1,
    Vibration: 2,
});

console.log('--- Initial State ---');
console.log('Byte value:', settings.getByte()); // 0
console.log('Binary:', settings.toBinaryString()); // 00000000

// 2. Modify settings
console.log('\n--- Modifying Settings ---');

console.log('1. Enabling Sound...');
settings.enable('Sound');
console.log('   -> Sound is now:', settings.isEnabled('Sound'));

console.log('2. Toggling Music (initially off)...');
settings.toggle('Music');
console.log('   -> Music is now:', settings.isEnabled('Music'));

console.log('3. Enabling Vibration...');
settings.enable('Vibration');
console.log('   -> Vibration is now:', settings.isEnabled('Vibration'));

console.log('4. Disabling Sound...');
settings.disable('Sound');
console.log('   -> Sound is now:', settings.isEnabled('Sound'));

// 3. Check results
console.log('\n--- Final State ---');
console.log('Is Sound enabled?', settings.isEnabled('Sound'));       // false
console.log('Is Music enabled?', settings.isEnabled('Music'));       // true
console.log('Is Vibration enabled?', settings.isEnabled('Vibration')); // true

console.log('Byte value:', settings.getByte());        // 6 (4 + 2)
console.log('Binary:', settings.toBinaryString()); // 00000110
console.log('Hex:', settings.toHex());          // 0x06

// 4. JSON Serialization
console.log('\n--- JSON Serialization ---');
console.log(JSON.stringify(settings.toJSON(), null, 2));
