import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateQuote, validateQuote } from '../.test-build/calculator.js';

const validInput = {
  projectName: 'Ambiente demonstração', lengthM: 5.2, widthM: 3.4,
  tileLengthCm: 60, tileWidthCm: 60, groutMm: 2,
  wastePercent: 10, tilesPerBox: 4, pricePerBox: 89.9, laborPerM2: 42,
};

test('accepts a complete valid quote', () => assert.deepEqual(validateQuote(validInput), {}));
test('requires a project name', () => assert.ok(validateQuote({ ...validInput, projectName: ' ' }).projectName));
test('rejects zero or negative room dimensions', () => {
  const errors = validateQuote({ ...validInput, lengthM: 0, widthM: -1 });
  assert.ok(errors.lengthM && errors.widthM);
});
test('rejects tile dimensions above the supported limit', () => assert.ok(validateQuote({ ...validInput, tileLengthCm: 301 }).tileLengthCm));
test('rejects grout outside 0–15 mm', () => assert.ok(validateQuote({ ...validInput, groutMm: 16 }).groutMm));
test('rejects reserve outside 0–30%', () => assert.ok(validateQuote({ ...validInput, wastePercent: 31 }).wastePercent));
test('requires an integer number of tiles per box', () => assert.ok(validateQuote({ ...validInput, tilesPerBox: 2.5 }).tilesPerBox));
test('rejects negative prices and labor rates', () => {
  const errors = validateQuote({ ...validInput, pricePerBox: -1, laborPerM2: -2 });
  assert.ok(errors.pricePerBox && errors.laborPerM2);
});
test('calculates area, tile count, boxes and costs for the sample', () => {
  const result = calculateQuote(validInput);
  assert.equal(result.areaM2, 17.68);
  assert.equal(result.baseTileCount, 49);
  assert.equal(result.requiredTileCount, 54);
  assert.equal(result.boxes, 14);
  assert.equal(result.purchasedTileCount, 56);
  assert.equal(result.materialCost, 1258.6);
  assert.equal(result.laborCost, 742.56);
  assert.equal(result.total, 2001.16);
});
test('rounds the number of boxes up to a whole package', () => {
  const result = calculateQuote({ ...validInput, tilesPerBox: 10 });
  assert.equal(result.boxes, 6);
  assert.equal(result.purchasedTileCount, 60);
});
test('supports a zero-cost labor rate', () => {
  const result = calculateQuote({ ...validInput, laborPerM2: 0 });
  assert.equal(result.laborCost, 0);
  assert.equal(result.total, result.materialCost);
});
test('throws instead of calculating invalid input', () => {
  assert.throws(() => calculateQuote({ ...validInput, widthM: 0 }), /Não é possível calcular/);
});
test('accounts for grout width in the tile grid estimate', () => {
  const withoutGrout = calculateQuote({ ...validInput, groutMm: 0 });
  const withGrout = calculateQuote({ ...validInput, groutMm: 5 });
  assert.ok(withGrout.baseTileCount < withoutGrout.baseTileCount);
});
