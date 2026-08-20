import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../utils/validation.js';

describe('validation', () => {
  it('accepts valid username', () => {
    assert.doesNotThrow(() => validateUsername('alice'));
  });

  it('rejects invalid username', () => {
    assert.throws(() => validateUsername('-bad'));
  });

  it('accepts valid email', () => {
    assert.doesNotThrow(() => validateEmail('a@b.co'));
  });

  it('rejects short password', () => {
    assert.throws(() => validatePassword('short'));
  });
});
