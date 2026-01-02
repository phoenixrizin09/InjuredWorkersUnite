import '@testing-library/jest-dom';

// Polyfill TextEncoder/Decoder for Node < 18 in Jest environment
if (typeof global.TextEncoder === 'undefined') {
	const { TextEncoder, TextDecoder } = require('util');
	global.TextEncoder = TextEncoder;
	global.TextDecoder = TextDecoder;
}
