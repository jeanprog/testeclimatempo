![2024-11-07 23-35-57](https://github.com/user-attachments/assets/91a892b1-6377-4a0a-b197-1541c03ece95)


# Desafio Frontend

Este projeto é uma aplicação **Frontend** desenvolvida com **Angular**, seguindo práticas de **Clean Code** e **Clean Architecture**. Abaixo estão os principais pontos e funcionalidades implementadas:

## Pontos Principais do Projeto

### 1. **Estrutura do Projeto:**
   - **Angular Framework**: Utilizado para a construção de componentes dinâmicos e gerenciamento de estado.
   - **Clean Code**: O código foi estruturado com foco na clareza, simplicidade e legibilidade, aplicando princípios de Clean Code para garantir manutenibilidade a longo prazo.
   - **Clean Architecture**: A separação de responsabilidades foi implementada seguindo os princípios de Clean Architecture, garantindo que a lógica de negócios e a lógica de apresentação sejam desacopladas. A injeção de dependências foi usada para facilitar a testabilidade e a reutilização de componentes.
   - **TailwindCSS**: Utilizado para a construção de um design totalmente **responsivo**, com um layout adaptável para dispositivos móveis e desktops.

### 2. **Funcionalidades Implementadas:**
   - **Formulários Reativos**: Utilização de Reactive Forms para captura de dados e validações robustas.
   - **Toast Component**: Implementação de um componente de Toast para exibir mensagens de erro ou sucesso de forma dinâmica e simples.
   - **Busca Dinâmica**: Campo de pesquisa com validações e funcionalidades de reset, proporcionando uma interação fluida com o usuário.
   - **Previsão por Cidade**: A busca da previsão do tempo é feita através de uma API externa, com sugestões de cidades sendo retornadas automaticamente pela API conforme o usuário digita. Isso garante uma experiência fluida e facilita a seleção da cidade desejada.
   - **Interação com APIs**: Realização de chamadas a APIs externas, com tratamento de erros e gerenciamento de estados de carregamento.

### 3. **Configuração e Execução:**
   - **Instalação**: Para rodar o projeto, execute o comando `npm install` para instalar todas as dependências necessárias.
   - **Execução**: Após a instalação, inicie o servidor de desenvolvimento com `ng serve`. O projeto estará disponível em `http://localhost:4200`.
   - **Variáveis de Ambiente**: Certifique-se de configurar corretamente as variáveis de ambiente para as chaves de API, caso contrário, um valor fictício será usado no código.

### 4. **Considerações Finais:**
   - Este projeto adota uma arquitetura limpa, com separação clara de responsabilidades, facilitando a manutenção e evolução do código.
   - O design é totalmente **responsivo**, garantindo uma boa experiência de usuário em dispositivos móveis e desktops, sem a dependência de frameworks externos para UI.
   - O projeto segue boas práticas de **Clean Code** e **Clean Architecture**, com foco em um código claro, simples e escalável.
   - A funcionalidade de **busca de previsão por cidade** é alimentada por uma API externa, com sugestões dinâmicas de cidades sendo fornecidas conforme o usuário interage com o campo de busca. Isso torna o processo de busca mais rápido e eficiente.

---

## Aviso sobre a API Key

**Importante:** Neste projeto, a API Key foi incluída diretamente no código para fins de demonstração e teste. No entanto, em um cenário real, **as chaves da API devem ser armazenadas como variáveis de ambiente** para garantir a segurança e evitar a exposição em repositórios públicos. Certifique-se de configurar corretamente as variáveis de ambiente para as chaves da API antes de implantar o projeto em um ambiente de produção, seguindo boas práticas de segurança.
