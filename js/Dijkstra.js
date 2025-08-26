// Classe que representa um grafo e implementa o algoritmo de Dijkstra.
class Grafo {
    constructor() {
        // Usa um Map para armazenar a lista de adjacência do grafo.
        // Chave: vértice, Valor: array de objetos {nó, peso} representando os vizinhos.
        this.adjacencia = new Map();
    }

    // Adiciona um novo vértice ao grafo.
    adicionarVertice(vertice) {
        // Só adiciona se o vértice ainda não existir.
        if (!this.adjacencia.has(vertice)) {
            this.adjacencia.set(vertice, []);
        }
    }

    // Adiciona uma aresta ponderada e não-direcionada entre dois vértices.
    adicionarAresta(origem, destino, peso) {
        this.adjacencia.get(origem).push({ no: destino, peso: peso });
        // Como o grafo é não-direcionado, adiciona também a aresta de destino para origem.
        this.adjacencia.get(destino).push({ no: origem, peso: peso });
    }

    // Implementação do algoritmo de Dijkstra para encontrar os menores caminhos a partir de um vértice inicial.
    dijkstra(inicio) {
        const distancias = new Map();     // Armazena a menor distância de 'inicio' até cada vértice.
        const antecessores = new Map();   // Armazena o vértice anterior no caminho mais curto.
        const visitados = new Set();      // Conjunto de vértices que já foram processados.

        // 1. Inicialização: Define todas as distâncias como Infinito e antecessores como nulo.
        for (const vertice of this.adjacencia.keys()) {
            distancias.set(vertice, Infinity);
            antecessores.set(vertice, null);
        }
        // A distância do vértice inicial para ele mesmo é 0.
        distancias.set(inicio, 0);

        // Função auxiliar para encontrar o vértice não visitado com a menor distância.
        const obterVerticeMaisProximo = () => {
            let menorDistancia = Infinity;
            let verticeMaisProximo = null;
            // Itera sobre todas as distâncias para encontrar a menor.
            for (const [vertice, distancia] of distancias) {
                if (distancia < menorDistancia && !visitados.has(vertice)) {
                    menorDistancia = distancia;
                    verticeMaisProximo = vertice;
                }
            }
            return verticeMaisProximo;
        };
        
        // Obtém o primeiro vértice para começar o loop (será o 'inicio').
        let verticeAtual = obterVerticeMaisProximo();

        // 2. Loop principal: Continua enquanto houver vértices não visitados alcançáveis.
        while (verticeAtual !== null) {
            const distanciaAtual = distancias.get(verticeAtual);
            const vizinhos = this.adjacencia.get(verticeAtual);

            // 3. Relaxamento: Para cada vizinho do vértice atual...
            for (const vizinho of vizinhos) {
                // Calcula a nova distância a partir do vértice inicial.
                const novaDistancia = distanciaAtual + vizinho.peso;
                // Se um caminho mais curto for encontrado...
                if (novaDistancia < distancias.get(vizinho.no)) {
                    // ...atualiza a distância e o antecessor.
                    distancias.set(vizinho.no, novaDistancia);
                    antecessores.set(vizinho.no, verticeAtual);
                }
            }
            // Marca o vértice atual como visitado para não processá-lo novamente.
            visitados.add(verticeAtual);
            // Pega o próximo vértice não visitado com a menor distância para continuar.
            verticeAtual = obterVerticeMaisProximo();
        }

        // Retorna os mapas de distâncias e antecessores.
        return { distancias, antecessores };
    }
}

export default Grafo;