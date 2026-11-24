# Comece por aqui

## 1. Instalar e abrir

1. Extraia o ZIP.
2. Abra a pasta `orca-piso` no VS Code.
3. Abra o terminal nessa pasta.
4. Execute:

```bash
npm install
npm run dev
```

5. Abra o endereço local exibido pelo Vite.

## 2. Validar

```bash
npm test
npm run build
```

Os testes das regras de cálculo já foram executados na preparação: **13 aprovados, 0 falhas**. A instalação completa e o build do React ainda precisam ser executados no seu computador. Nesta execução, o acesso ao npm foi bloqueado por falha de resolução DNS do registro.

## 3. Teste manual sugerido

- Altere o comprimento e a largura e confira a área.
- Altere a reserva e observe a quantidade de peças.
- Altere peças por caixa e confira o arredondamento para caixas inteiras.
- Apague o nome da obra e tente atualizar a estimativa. O campo inválido deve receber foco depois da validação.
- Exporte o JSON e confira se ele contém os dados e o resumo calculado.
- Percorra os campos usando Tab e Shift+Tab.

## 4. Antes de publicar

Não publique como build validado até executar `npm install`, `npm test` e `npm run build`. Faça também uma revisão manual com teclado e leitor de tela. O relatório atual distingue o que foi testado do que ainda está pendente.
