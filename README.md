# Visualizador do Algoritmo de Dijkstra

Este projeto é uma visualização de um grafo ponderado e demonstra o funcionamento do algoritmo de Dijkstra para encontrar o caminho mais curto entre dois nós.

## Funcionalidades

-   **Visualização de Grafo**: Renderiza um grafo com 20 vértices e arestas ponderadas.
-   **Layout Estático**: Os nós são organizados em uma grade para garantir clareza e evitar sobreposição.
-   **Caminho Mais Curto**: Permite ao usuário selecionar um nó de origem e um de destino para calcular e destacar o caminho mais curto.
-   **Interatividade**: O caminho calculado é destacado visualmente no grafo, destacando as arestas e colorindo os nós do percurso.

## Tecnologias Utilizadas

-   **HTML/CSS:** Estrutura e estilo da página.
-   **JavaScript**: Lógica da aplicação e implementação do algoritmo.
-   **[Vis.js](https://visjs.org/):**: Biblioteca para visualização de grafos.

## Estrutura do Projeto

```
index.html
css/
  style.css
js/
  Dijkstra.js      # Implementação da classe Grafo e do algoritmo.
  visualizacao.js  # Lógica de visualização com vis.js e manipulação do DOM
README.md
```

## Como Executar

Como este projeto utiliza Módulos ES6 (`import`/`export`), você não pode simplesmente abrir o arquivo `index.html` diretamente no navegador. É necessário servi-lo a partir de um servidor web local.

Uma maneira fácil de fazer isso é usando a extensão **Live Server** no Visual Studio Code:

1.  Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code.
2.  Abra a pasta do projeto no VS Code.
3.  Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".
4.  Seu navegador padrão abrirá com a aplicação em execução.

## Como Usar

1.  Após iniciar a aplicação, você verá o grafo renderizado na tela.
2.  Utilize os menus suspensos no topo da página ("Mostrar caminho mais curto de" e "para") para selecionar um vértice de origem e um de destino.
3.  Ao selecionar ambos, o caminho mais curto entre eles será automaticamente calculado e destacado em vermelho no grafo.
