export type QuoteInput = {
  projectName: string;
  lengthM: number;
  widthM: number;
  tileLengthCm: number;
  tileWidthCm: number;
  groutMm: number;
  wastePercent: number;
  tilesPerBox: number;
  pricePerBox: number;
  laborPerM2: number;
};

export type QuoteResult = {
  areaM2: number;
  tileCoverageM2: number;
  baseTileCount: number;
  requiredTileCount: number;
  boxes: number;
  purchasedTileCount: number;
  spareTileCount: number;
  materialCost: number;
  laborCost: number;
  total: number;
  costPerM2: number;
};

export type ValidationErrors = Partial<Record<keyof QuoteInput, string>>;

export function validateQuote(input: QuoteInput): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!input.projectName.trim()) errors.projectName = 'Informe o nome da obra.';
  if (!Number.isFinite(input.lengthM) || input.lengthM <= 0 || input.lengthM > 1000) {
    errors.lengthM = 'Use uma medida maior que zero e até 1.000 m.';
  }
  if (!Number.isFinite(input.widthM) || input.widthM <= 0 || input.widthM > 1000) {
    errors.widthM = 'Use uma medida maior que zero e até 1.000 m.';
  }
  if (!Number.isFinite(input.tileLengthCm) || input.tileLengthCm <= 0 || input.tileLengthCm > 300) {
    errors.tileLengthCm = 'Informe uma medida entre 0 e 300 cm.';
  }
  if (!Number.isFinite(input.tileWidthCm) || input.tileWidthCm <= 0 || input.tileWidthCm > 300) {
    errors.tileWidthCm = 'Informe uma medida entre 0 e 300 cm.';
  }
  if (!Number.isFinite(input.groutMm) || input.groutMm < 0 || input.groutMm > 15) {
    errors.groutMm = 'O rejunte deve ficar entre 0 e 15 mm.';
  }
  if (!Number.isFinite(input.wastePercent) || input.wastePercent < 0 || input.wastePercent > 30) {
    errors.wastePercent = 'A reserva deve ficar entre 0% e 30%.';
  }
  if (!Number.isInteger(input.tilesPerBox) || input.tilesPerBox < 1 || input.tilesPerBox > 500) {
    errors.tilesPerBox = 'Informe de 1 a 500 peças por caixa.';
  }
  if (!Number.isFinite(input.pricePerBox) || input.pricePerBox < 0) {
    errors.pricePerBox = 'O preço da caixa não pode ser negativo.';
  }
  if (!Number.isFinite(input.laborPerM2) || input.laborPerM2 < 0) {
    errors.laborPerM2 = 'O valor da mão de obra não pode ser negativo.';
  }
  return errors;
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const errors = validateQuote(input);
  if (Object.keys(errors).length > 0) {
    throw new Error('Não é possível calcular: revise os campos inválidos.');
  }

  const areaM2 = input.lengthM * input.widthM;
  const tileLengthWithGroutM = (input.tileLengthCm + input.groutMm / 10) / 100;
  const tileWidthWithGroutM = (input.tileWidthCm + input.groutMm / 10) / 100;
  const tileCoverageM2 = tileLengthWithGroutM * tileWidthWithGroutM;
  const baseTileCount = Math.ceil(areaM2 / tileCoverageM2);
  const requiredTileCount = Math.ceil(baseTileCount * (1 + input.wastePercent / 100));
  const boxes = Math.ceil(requiredTileCount / input.tilesPerBox);
  const purchasedTileCount = boxes * input.tilesPerBox;
  const spareTileCount = purchasedTileCount - baseTileCount;
  const materialCost = roundCurrency(boxes * input.pricePerBox);
  const laborCost = roundCurrency(areaM2 * input.laborPerM2);
  const total = roundCurrency(materialCost + laborCost);

  return {
    areaM2,
    tileCoverageM2,
    baseTileCount,
    requiredTileCount,
    boxes,
    purchasedTileCount,
    spareTileCount,
    materialCost,
    laborCost,
    total,
    costPerM2: roundCurrency(total / areaM2),
  };
}

function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
