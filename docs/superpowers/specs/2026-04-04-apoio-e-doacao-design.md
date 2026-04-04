# Design: apoio recorrente e doação avulsa

## Contexto

O `VA_blog` hoje funciona como hub editorial de conteúdo prático para famílias no TEA. A proposta desta iniciativa é adicionar uma frente de monetização compatível com o posicionamento institucional do projeto, sem transformar o site em vitrine agressiva de venda nem criar promessa operacional prematura.

O objetivo é abrir duas formas de contribuição:

- apoio recorrente mensal, priorizado como principal CTA
- doação avulsa, disponível como alternativa secundária

## Objetivo do produto

Criar uma experiência de apoio financeiro que:

- reforce a continuidade e a independência editorial do projeto
- privilegie recorrência em vez de contribuição pontual
- aceite métodos de pagamento adequados ao público no Brasil
- evite prometer benefícios específicos ainda não operacionalizados

## Escopo

Incluído neste design:

- uma página única de apoio com dois blocos distintos
- assinatura mensal com três faixas de apoio
- doação avulsa com valores sugeridos e valor livre
- checkout de assinatura no Stripe por cartão
- checkout de doação avulsa no Stripe por cartão e no Abacate Pay por Pix
- linguagem emocional e institucional

Fora de escopo nesta fase:

- assinatura recorrente por Pix
- benefícios exclusivos já definidos por faixa
- área de membros
- automações de CRM, régua de e-mail ou programa formal de apoiadores

## Abordagens consideradas

### 1. Uma página com dois blocos independentes

Bloco principal para apoio mensal e bloco secundário para doação avulsa.

Prós:

- mantém a recorrência como prioridade visual e narrativa
- reduz ambiguidade entre assinatura e doação
- facilita leitura e implementação incremental

Contras:

- exige cuidado visual para que a segunda opção não pareça abandono da primeira

### 2. Uma página com tabs entre mensal e avulsa

Prós:

- economiza espaço visual

Contras:

- esconde parte da oferta
- cria um passo adicional antes do usuário entender as opções

### 3. Duas páginas separadas

Prós:

- cada fluxo pode ter texto e métricas próprias

Contras:

- fragmenta descoberta
- aumenta manutenção e esforço de navegação

## Recomendação

Adotar a abordagem 1: uma página única com dois blocos independentes e hierarquia clara. O usuário deve perceber primeiro que a melhor forma de apoiar o projeto é a recorrência mensal. A doação avulsa existe como alternativa legítima, mas não como concorrente em igualdade visual com a assinatura.

## Arquitetura da experiência

### 1. Bloco principal: apoio recorrente

Mensagem central:

`Apoie a continuidade do projeto`

Submensagem:

Contribuição mensal para quem acredita no propósito e quer ajudar a manter esse trabalho vivo, consistente e independente.

Estrutura:

- título institucional
- texto curto de contexto
- três faixas de apoio
- CTA por faixa: `Quero apoiar`
- observação explícita: `Assinatura mensal no cartão`

Faixas iniciais:

- `R$ 10/mês`
- `R$ 20/mês`
- `R$ 35/mês`

As três faixas compartilham a mesma proposta de valor. Não haverá diferenciação de entregas nesta etapa. A faixa intermediária deve receber maior destaque visual como opção recomendada.

### 2. Bloco secundário: doação avulsa

Mensagem central:

`Prefere ajudar uma vez?`

Estrutura:

- texto curto explicando apoio pontual
- valores sugeridos
- opção de valor livre
- escolha do método de pagamento
- observação explícita: `Doação avulsa por Pix ou cartão`

Valores sugeridos:

- `R$ 10`
- `R$ 25`
- `R$ 50`
- `Outro valor`

Métodos:

- `Pix` via Abacate Pay
- `Cartão` via Stripe

## Linguagem e posicionamento

O tom deve ser emocional e institucional, não transacional. O usuário não está comprando um plano nem contratando um serviço. Ele está escolhendo sustentar uma iniciativa em que acredita.

Usar:

- `apoiar`
- `sustentar o projeto`
- `fazer parte`
- `contribuir com a continuidade`

Evitar:

- `plano`
- `premium`
- `benefício garantido`
- `membro VIP`

Formulação aprovada para futuro sem promessa:

`No futuro, apoiadores poderão receber formas extras de participação e proximidade com o projeto, sem promessa definida nesta fase.`

## Fluxos de pagamento

### Assinatura mensal

1. Usuário visualiza três faixas de apoio.
2. Clica em `Quero apoiar` na faixa desejada.
3. É direcionado para o checkout do Stripe.
4. O checkout deixa claro que a cobrança é recorrente mensal e feita por cartão.

### Doação avulsa

1. Usuário escolhe um valor sugerido ou informa valor livre.
2. Seleciona `Pix` ou `Cartão`.
3. Se escolher `Pix`, segue para fluxo do Abacate Pay.
4. Se escolher `Cartão`, segue para fluxo do Stripe.
5. A comunicação deixa claro que se trata de contribuição única.

## Regras de clareza

- Pix não deve aparecer em nenhum ponto do bloco de assinatura.
- O texto de assinatura deve dizer explicitamente que a recorrência é no cartão.
- O texto de doação deve dizer explicitamente que se trata de contribuição única.
- Os dois blocos precisam parecer relacionados ao mesmo propósito, mas sem confundir os comportamentos esperados.

## Componentes sugeridos

Sem definir implementação final, a página deve ser decomposta em unidades claras:

- hero ou intro institucional da página de apoio
- grid de faixas de assinatura
- bloco de doação avulsa com seleção de valor
- seletor de método de pagamento da doação
- notas de transparência sobre cobrança e natureza do apoio

Esses componentes devem ser independentes o suficiente para evoluir depois com testes A/B, novos valores ou benefícios futuros.

## Erros e estados vazios

- se o checkout de assinatura falhar, o usuário deve receber mensagem objetiva com opção de tentar novamente
- se o checkout Pix falhar, o usuário deve conseguir reiniciar o fluxo sem perder o valor escolhido
- se o usuário informar valor inválido na doação avulsa, o erro deve aparecer antes do redirecionamento
- se houver indisponibilidade temporária de um provedor, a outra modalidade não deve ser escondida ou quebrada

## Métricas desejadas

Indicadores mínimos para a fase inicial:

- cliques no CTA de cada faixa de assinatura
- início de checkout recorrente
- conclusão de checkout recorrente
- cliques em valores de doação avulsa
- escolha de método na doação avulsa
- conclusão de doação por Pix
- conclusão de doação por cartão

## Riscos e decisões conscientes

- dois provedores significam rastreamento e conciliação separados
- a comunicação precisa deixar cristalino que Pix é apenas para doação avulsa
- não diferenciar benefícios por faixa reduz fricção operacional, mas pode diminuir incentivo para tickets mais altos
- a linguagem institucional precisa ser forte o suficiente para sustentar conversão sem perks explícitos

## Estratégia de testes

Primeira versão focada em simplicidade:

- uma página
- uma mensagem principal
- três faixas de assinatura
- uma seção secundária de doação avulsa

Hipóteses principais:

- a faixa intermediária terá maior conversão
- recorrência converterá melhor quando apresentada antes da doação avulsa
- Pix será relevante na doação avulsa, mas não deve contaminar a compreensão da assinatura

## Critérios de aceitação do design

- o usuário entende em poucos segundos que a prioridade é apoiar mensalmente
- o usuário entende que assinatura é somente por cartão
- o usuário entende que doação avulsa pode ser por Pix ou cartão
- a página não promete benefícios futuros específicos
- a linguagem preserva o caráter institucional do projeto
