# Finora

Um painel responsivo de finanças pessoais focado em clareza, visualização de dados e interações úteis.

## Funcionalidades

- Gráfico interativo de saldo com três períodos
- Atualização do saldo ao adicionar transações
- Acompanhamento de receitas e despesas
- Distribuição de gastos e progresso do orçamento mensal
- Painel responsivo para computador, tablet e celular
- Formulário acessível com confirmação de estado

## Tecnologias

- React 19
- TypeScript
- Next.js / Vinext
- Tailwind CSS 4
- Saída de servidor compatível com Cloudflare

## Executar localmente

```bash
npm install
npm run dev
```

## Verificações de qualidade

```bash
npm run lint
npm test
```

## Decisões de engenharia

O Finora utiliza estado nativo do React e visualizações em CSS/SVG em vez de uma biblioteca de gráficos. Isso mantém o pacote enxuto e demonstra transformação de dados, estado derivado, formulários controlados e design responsivo de informações.

## Autor

Desenvolvido por Joseph como um projeto de portfólio frontend preparado para evoluir para uma aplicação full stack.
