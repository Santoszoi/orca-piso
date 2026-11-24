# Relatório de validação

Data da preparação: 23 de novembro de 2026.

## Executado com sucesso

Comando:

```bash
npm test
```

Ambiente observado: Node.js 22.16.0 e TypeScript global 5.8.3.

Resultado:

- 13 testes executados.
- 13 aprovados.
- 0 falhas.
- O módulo `src/calculator.ts` foi compilado pelo TypeScript antes da execução dos testes.
- Cobertura: validação de campos, limites, cálculo de área, contagem de peças, reserva, arredondamento por caixa, custo de material, mão de obra, rejunte e rejeição de entrada inválida.

O log completo está em `docs/test-results.txt`.

## Bloqueios e pendências

- `npm install` não foi concluído neste ambiente. O comando expirou; uma tentativa direta de acesso ao registro npm retornou `Could not resolve host: registry.npmjs.org`.
- `npm run build` foi tentado e não passou porque as dependências React, React DOM e os tipos do Node não estavam instalados. O Vite não chegou a empacotar a aplicação.
- A interface React não foi iniciada no navegador nesta execução.
- Não há captura de tela nem vídeo real da interface.
- Navegação por teclado, foco em erros e leitor de tela precisam de revisão manual no navegador.

O detalhe da tentativa de build está em `docs/build-attempt.txt`.

## Como fechar as pendências

Em uma máquina com acesso ao registro npm:

```bash
npm install
npm test
npm run build
npm run dev
```

Depois, valide o formulário com teclado e leitor de tela e atualize este arquivo com navegador, sistema operacional, comandos e resultados observados. Não altere o status para aprovado sem executar cada etapa.
