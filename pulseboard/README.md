# Pulseboard

Um painel interativo de gestão de projetos criado para portfólio. O Pulseboard combina uma interface responsiva e bem-acabada com fluxos práticos de tarefas.

## Destaques

- Busca por títulos, etiquetas e responsáveis
- Movimentação de tarefas em um fluxo Kanban de quatro etapas
- Métricas atualizadas a partir do estado do quadro
- Layout responsivo para computador, tablet e celular
- Controles acessíveis e compatíveis com teclado
- Nenhuma dependência externa de interface

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

Abra o endereço local exibido no terminal.

## Verificações de qualidade

```bash
npm run lint
npm test
```

## Decisões de produto

A interface utiliza divulgação progressiva para manter uma visão densa de projeto fácil de ler. As tarefas avançam com um clique, as métricas são atualizadas a partir do mesmo estado e a rolagem horizontal preserva as colunas Kanban em telas menores.

## Autor

Desenvolvido por Joseph como demonstração de engenharia frontend, visão de produto e atenção ao design de interação.
