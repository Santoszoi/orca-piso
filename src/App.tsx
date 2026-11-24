import { useEffect, useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { calculateQuote, validateQuote, type QuoteInput } from './calculator';

const initialInput: QuoteInput = {
  projectName: 'Ambiente demonstração',
  lengthM: 5.2,
  widthM: 3.4,
  tileLengthCm: 60,
  tileWidthCm: 60,
  groutMm: 2,
  wastePercent: 10,
  tilesPerBox: 4,
  pricePerBox: 89.9,
  laborPerM2: 42,
};

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const number = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });
type NumericQuoteField = Exclude<keyof QuoteInput, 'projectName'>;

function App() {
  const [input, setInput] = useState<QuoteInput>(initialInput);
  const [showErrors, setShowErrors] = useState(false);
  const [shouldFocusError, setShouldFocusError] = useState(false);
  const errors = useMemo(() => validateQuote(input), [input]);
  const isValid = Object.keys(errors).length === 0;
  const result = useMemo(() => (isValid ? calculateQuote(input) : null), [input, isValid]);

  useEffect(() => {
    if (!shouldFocusError) return;
    document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    setShouldFocusError(false);
  }, [shouldFocusError, errors]);

  function updateProjectName(value: string) {
    setInput((current) => ({ ...current, projectName: value }));
  }

  function handleNumber(key: NumericQuoteField, rawValue: string) {
    const value = rawValue === '' ? Number.NaN : Number(rawValue);
    setInput((current) => ({ ...current, [key]: value } as QuoteInput));
  }

  function handleExport() {
    if (!result) return;
    const payload = {
      generatedAt: new Date().toISOString(),
      project: input,
      estimate: result,
      note: 'Estimativa demonstrativa. Confirme medidas e preços antes de contratar ou comprar materiais.',
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'orcamento-orcapiso.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowErrors(true);
    if (!isValid) setShouldFocusError(true);
  }

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="OrçaPiso, início">
          <span className="brand-mark">OP</span>
          <span>orça<span className="brand-light">piso</span></span>
        </a>
        <span className="byline">UMA FERRAMENTA MARCOS SOLUTIONS</span>
      </header>

      <section className="intro" id="inicio">
        <div className="eyebrow"><span className="eyebrow-dot" /> ORÇAMENTO DE REVESTIMENTO</div>
        <h1>Planeje o piso.<br /><em>Enxergue o custo.</em></h1>
        <p>Uma estimativa rápida de peças, caixas, reserva e mão de obra para organizar o orçamento antes da compra.</p>
      </section>

      <div className="workspace">
        <form className="form-card" onSubmit={handleSubmit} noValidate>
          <div className="card-heading">
            <div><span className="step">01 / DADOS DA OBRA</span><h2>Vamos começar pelo espaço</h2></div>
            <span className="heading-icon" aria-hidden="true">⌂</span>
          </div>

          <Field label="Nome da obra" id="projectName" error={showErrors ? errors.projectName : undefined}>
            <input id="projectName" value={input.projectName} onChange={(e) => updateProjectName(e.target.value)} aria-invalid={showErrors && !!errors.projectName} aria-describedby={showErrors && errors.projectName ? 'projectName-error' : undefined} />
          </Field>

          <div className="field-grid">
            <Field label="Comprimento (m)" id="lengthM" hint="Ex.: 8,00" error={showErrors ? errors.lengthM : undefined}>
              <input id="lengthM" type="number" min="0.01" step="0.01" value={Number.isNaN(input.lengthM) ? '' : input.lengthM} onChange={(e) => handleNumber('lengthM', e.target.value)} aria-invalid={showErrors && !!errors.lengthM} aria-describedby={showErrors && errors.lengthM ? 'lengthM-error' : undefined} />
            </Field>
            <Field label="Largura (m)" id="widthM" hint="Ex.: 4,00" error={showErrors ? errors.widthM : undefined}>
              <input id="widthM" type="number" min="0.01" step="0.01" value={Number.isNaN(input.widthM) ? '' : input.widthM} onChange={(e) => handleNumber('widthM', e.target.value)} aria-invalid={showErrors && !!errors.widthM} aria-describedby={showErrors && errors.widthM ? 'widthM-error' : undefined} />
            </Field>
          </div>
          <div className="area-strip"><span>ÁREA CALCULADA</span><strong>{isValid ? `${number.format(result!.areaM2)} m²` : '—'}</strong></div>

          <div className="section-rule"><span className="step">02 / REVESTIMENTO</span></div>
          <div className="field-grid">
            <Field label="Lado da peça (cm)" id="tileLengthCm" error={showErrors ? errors.tileLengthCm : undefined}>
              <input id="tileLengthCm" type="number" min="0.1" step="0.1" value={Number.isNaN(input.tileLengthCm) ? '' : input.tileLengthCm} onChange={(e) => handleNumber('tileLengthCm', e.target.value)} aria-invalid={showErrors && !!errors.tileLengthCm} aria-describedby={showErrors && errors.tileLengthCm ? 'tileLengthCm-error' : undefined} />
            </Field>
            <Field label="Outro lado (cm)" id="tileWidthCm" error={showErrors ? errors.tileWidthCm : undefined}>
              <input id="tileWidthCm" type="number" min="0.1" step="0.1" value={Number.isNaN(input.tileWidthCm) ? '' : input.tileWidthCm} onChange={(e) => handleNumber('tileWidthCm', e.target.value)} aria-invalid={showErrors && !!errors.tileWidthCm} aria-describedby={showErrors && errors.tileWidthCm ? 'tileWidthCm-error' : undefined} />
            </Field>
          </div>
          <div className="field-grid three-col">
            <Field label="Rejunte (mm)" id="groutMm" error={showErrors ? errors.groutMm : undefined}>
              <input id="groutMm" type="number" min="0" max="15" step="0.5" value={Number.isNaN(input.groutMm) ? '' : input.groutMm} onChange={(e) => handleNumber('groutMm', e.target.value)} aria-invalid={showErrors && !!errors.groutMm} aria-describedby={showErrors && errors.groutMm ? 'groutMm-error' : undefined} />
            </Field>
            <Field label="Reserva (%)" id="wastePercent" error={showErrors ? errors.wastePercent : undefined}>
              <input id="wastePercent" type="number" min="0" max="30" step="1" value={Number.isNaN(input.wastePercent) ? '' : input.wastePercent} onChange={(e) => handleNumber('wastePercent', e.target.value)} aria-invalid={showErrors && !!errors.wastePercent} aria-describedby={showErrors && errors.wastePercent ? 'wastePercent-error' : undefined} />
            </Field>
            <Field label="Peças/caixa" id="tilesPerBox" error={showErrors ? errors.tilesPerBox : undefined}>
              <input id="tilesPerBox" type="number" min="1" max="500" step="1" value={Number.isNaN(input.tilesPerBox) ? '' : input.tilesPerBox} onChange={(e) => handleNumber('tilesPerBox', e.target.value)} aria-invalid={showErrors && !!errors.tilesPerBox} aria-describedby={showErrors && errors.tilesPerBox ? 'tilesPerBox-error' : undefined} />
            </Field>
          </div>

          <div className="section-rule"><span className="step">03 / CUSTOS</span></div>
          <div className="field-grid">
            <Field label="Preço por caixa (R$)" id="pricePerBox" error={showErrors ? errors.pricePerBox : undefined}>
              <input id="pricePerBox" type="number" min="0" step="0.01" value={Number.isNaN(input.pricePerBox) ? '' : input.pricePerBox} onChange={(e) => handleNumber('pricePerBox', e.target.value)} aria-invalid={showErrors && !!errors.pricePerBox} aria-describedby={showErrors && errors.pricePerBox ? 'pricePerBox-error' : undefined} />
            </Field>
            <Field label="Mão de obra por m² (R$)" id="laborPerM2" error={showErrors ? errors.laborPerM2 : undefined}>
              <input id="laborPerM2" type="number" min="0" step="0.01" value={Number.isNaN(input.laborPerM2) ? '' : input.laborPerM2} onChange={(e) => handleNumber('laborPerM2', e.target.value)} aria-invalid={showErrors && !!errors.laborPerM2} aria-describedby={showErrors && errors.laborPerM2 ? 'laborPerM2-error' : undefined} />
            </Field>
          </div>
          <div className="form-actions">
            <button className="button button-secondary" type="button" onClick={() => { setInput(initialInput); setShowErrors(false); }}>Restaurar exemplo</button>
            <button className="button button-primary" type="submit">Atualizar estimativa <span aria-hidden="true">↗</span></button>
          </div>
          {showErrors && !isValid && <p className="form-feedback" role="alert">Revise os campos destacados para atualizar a estimativa.</p>}
        </form>

        <aside className="summary-card" aria-label="Resumo do orçamento" aria-live="polite">
          <div className="summary-top"><span className="step">RESUMO ESTIMADO</span><span className="live-pill"><span /> AO VIVO</span></div>
          <p className="summary-name">{input.projectName.trim() || 'Sua obra'}</p>
          {result ? <>
            <div className="total-label">INVESTIMENTO ESTIMADO</div>
            <div className="total-value">{currency.format(result.total)}</div>
            <div className="per-meter">{currency.format(result.costPerM2)} por m²</div>
            <div className="summary-divider" />
            <div className="summary-section-title">QUANTIDADE DE MATERIAL</div>
            <SummaryRow label="Área do ambiente" value={`${number.format(result.areaM2)} m²`} />
            <SummaryRow label="Peças estimadas + reserva" value={`${result.requiredTileCount} un.`} />
            <SummaryRow label="Caixas para comprar" value={`${result.boxes} cx.`} strong />
            <SummaryRow label="Peças compradas" value={`${result.purchasedTileCount} un.`} />
            <div className="summary-divider" />
            <div className="summary-section-title">COMPOSIÇÃO DO CUSTO</div>
            <SummaryRow label="Revestimento" value={currency.format(result.materialCost)} />
            <SummaryRow label="Mão de obra" value={currency.format(result.laborCost)} />
            <div className="summary-note"><span aria-hidden="true">ⓘ</span><p>Estimativa inicial. Confira o rendimento indicado na embalagem e as condições reais do ambiente antes da compra.</p></div>
            <button className="button button-export" type="button" onClick={handleExport}>Exportar orçamento <span aria-hidden="true">↓</span></button>
          </> : <div className="empty-summary" role="status"><span>!</span><strong>Precisamos revisar os dados</strong><p>Preencha os campos corretamente para visualizar o orçamento.</p></div>}
          <div className="summary-footer">CÁLCULO LOCAL · SEM ENVIO DE DADOS</div>
        </aside>
      </div>

      <footer className="footer"><span>© 2026 MARCOS SOLUTIONS</span><span>ESTUDO DE CASO · REACT + TYPESCRIPT</span></footer>
    </main>
  );
}

function Field({ label, id, hint, error, children }: { label: string; id: string; hint?: string; error?: string; children: ReactNode }) {
  return <div className={`field ${error ? 'field-error' : ''}`}>
    <label htmlFor={id}>{label}</label>
    {children}
    {error ? <span className="error-message" id={`${id}-error`}>{error}</span> : hint ? <span className="field-hint">{hint}</span> : null}
  </div>;
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return <div className={`summary-row ${strong ? 'summary-row-strong' : ''}`}><span>{label}</span><strong>{value}</strong></div>;
}

export default App;
