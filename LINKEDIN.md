# Publicação sugerida para LinkedIn

Esta semana desenvolvi o **OrçaPiso**, um pequeno projeto em React e TypeScript para resolver uma tarefa comum em serviços de instalação de revestimentos: organizar uma estimativa inicial de material e mão de obra.

A aplicação recebe as dimensões do ambiente, o tamanho da peça, o espaçamento de rejunte, a reserva para cortes, a quantidade por caixa e os custos. A partir desses dados, calcula a área, estima a quantidade de peças, arredonda a compra para caixas inteiras e separa o custo de material da mão de obra.

Também implementei validação dos campos, mensagens de erro, foco no primeiro campo inválido e exportação do orçamento em JSON. A ideia foi manter as regras de cálculo separadas da interface, facilitando a leitura e os testes.

Na validação executada durante o desenvolvimento, **13 testes das regras de cálculo passaram**. Eles cobrem limites de entrada, arredondamento de embalagens, efeito aproximado do rejunte e composição dos custos.

A instalação das dependências e o build completo da interface ainda precisam ser executados em um ambiente com acesso ao npm. Por isso, não estou apresentando o projeto como totalmente validado no navegador. Também faltam a revisão com teclado e leitor de tela e a gravação de uma demonstração real.

O projeto usa valores fictícios e uma fórmula simplificada. Não substitui medição técnica, paginação do assentamento ou orçamento final.

Tecnologias: React, TypeScript, Vite e Node.js Test Runner.

#React #TypeScript #FrontEnd #Vite #DesenvolvimentoWeb #Testes
