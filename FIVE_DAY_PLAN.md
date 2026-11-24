# Roteiro de estudo de cinco dias

## Dia 1 — Entender o problema e a interface
- Execute a instalação e abra a aplicação.
- Explique quem usaria o OrçaPiso e qual decisão ele facilita.
- Percorra cada campo e identifique a unidade esperada.
- Explique por que os valores de demonstração são fictícios.

**Você deve conseguir explicar:** a diferença entre área do ambiente, cobertura aproximada da peça e quantidade comprada.

## Dia 2 — TypeScript e regras de negócio
- Leia `src/calculator.ts`.
- Explique `QuoteInput`, `QuoteResult` e `ValidationErrors`.
- Rode `npm test`.
- Mude um valor no conjunto de teste e escreva um novo caso para um limite.

**Você deve conseguir explicar:** por que a quantidade de caixas usa `Math.ceil` e por que o cálculo lança erro para entradas inválidas.

## Dia 3 — React e estado
- Leia `src/App.tsx`.
- Identifique `useState`, `useMemo` e `useEffect`.
- Altere comprimento, largura, reserva e preço na interface.
- Observe como o resumo acompanha os dados.

**Você deve conseguir explicar:** por que a regra de cálculo está fora do componente e como o estado controla a interface.

## Dia 4 — Validação e acessibilidade
- Apague o nome da obra e envie o formulário.
- Informe valores fora dos limites.
- Navegue apenas com Tab, Shift+Tab, Enter e Espaço.
- Confira se o foco vai ao primeiro campo inválido.
- Se possível, faça uma revisão com leitor de tela. Registre o navegador e a ferramenta usados.

**Você deve conseguir explicar:** o que foi implementado para apoiar teclado e leitura de erros, sem afirmar conformidade não auditada.

## Dia 5 — Demonstração e entrevista
- Grave um vídeo curto mostrando entrada, atualização e exportação JSON.
- Explique uma decisão técnica e uma limitação da fórmula.
- Rode `npm test` e `npm run build` no ambiente local.
- Atualize `VALIDATION.md` com os resultados reais antes de publicar.

**Pergunta de entrevista para treinar:** “Como você garantiria que a estimativa continuasse correta se o cálculo passasse a ser feito por uma API?”

Resposta esperada: validar novamente no servidor, compartilhar um contrato de dados, tratar erros de rede, evitar confiar em valores enviados pelo cliente e criar testes de integração.
