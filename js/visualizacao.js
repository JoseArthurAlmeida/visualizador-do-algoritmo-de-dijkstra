import Grafo from "./Dijkstra.js";

document.addEventListener("DOMContentLoaded", function () {
	const grafo = new Grafo();
	const vertices = [
		"V0",
		"V1",
		"V2",
		"V3",
		"V4",
		"V5",
		"V6",
		"V7",
		"V8",
		"V9",
		"V10",
		"V11",
		"V12",
		"V13",
		"V14",
		"V15",
		"V16",
		"V17",
		"V18",
		"V19",
	];
	const arestas = [
		{ from: "V0", to: "V1", label: String(25), weight: 25 },
		{ from: "V1", to: "V2", label: String(41), weight: 41 },
		{ from: "V2", to: "V3", label: String(11), weight: 11 },
		{ from: "V3", to: "V4", label: String(83), weight: 83 },
		{ from: "V4", to: "V5", label: String(5), weight: 5 },
		{ from: "V5", to: "V6", label: String(58), weight: 58 },
		{ from: "V6", to: "V7", label: String(92), weight: 92 },
		{ from: "V7", to: "V8", label: String(34), weight: 34 },
		{ from: "V8", to: "V9", label: String(7), weight: 7 },
		{ from: "V9", to: "V10", label: String(66), weight: 66 },
		{ from: "V10", to: "V11", label: String(19), weight: 19 },
		{ from: "V11", to: "V12", label: String(75), weight: 75 },
		{ from: "V12", to: "V13", label: String(2), weight: 2 },
		{ from: "V13", to: "V14", label: String(49), weight: 49 },
		{ from: "V14", to: "V15", label: String(88), weight: 88 },
		{ from: "V15", to: "V16", label: String(12), weight: 12 },
		{ from: "V16", to: "V17", label: String(53), weight: 53 },
		{ from: "V17", to: "V18", label: String(37), weight: 37 },
		{ from: "V18", to: "V19", label: String(61), weight: 61 },
		{ from: "V0", to: "V5", label: String(78), weight: 78 },
		{ from: "V2", to: "V10", label: String(33), weight: 33 },
		{ from: "V15", to: "V3", label: String(9), weight: 9 },
		{ from: "V8", to: "V1", label: String(50), weight: 50 },
		{ from: "V19", to: "V4", label: String(21), weight: 21 },
		{ from: "V7", to: "V12", label: String(68), weight: 68 },
		{ from: "V16", to: "V2", label: String(99), weight: 99 },
		{ from: "V11", to: "V18", label: String(4), weight: 4 },
		{ from: "V6", to: "V14", label: String(81), weight: 81 },
		{ from: "V13", to: "V1", label: String(55), weight: 55 },
		{ from: "V9", to: "V17", label: String(29), weight: 29 },
		{ from: "V10", to: "V19", label: String(72), weight: 72 },
		{ from: "V3", to: "V8", label: String(46), weight: 46 },
		{ from: "V17", to: "V5", label: String(63), weight: 63 },
		{ from: "V0", to: "V12", label: String(91), weight: 91 },
		{ from: "V4", to: "V11", label: String(30), weight: 30 },
		{ from: "V6", to: "V18", label: String(22), weight: 22 },
		{ from: "V9", to: "V15", label: String(45), weight: 45 },
		{ from: "V1", to: "V19", label: String(100), weight: 100 },
		{ from: "V7", to: "V16", label: String(51), weight: 51 },
	];

	vertices.forEach((v) => grafo.adicionarVertice(v));
	arestas.forEach((a) => grafo.adicionarAresta(a.from, a.to, a.weight));

	const selectOrigem = document.getElementById("origem-select");
	const selectDestino = document.getElementById("destination-select");

	vertices.forEach((vertice) => {
		selectOrigem.innerHTML += `<option value="${vertice}">${vertice}</option>`;
		selectDestino.innerHTML += `<option value="${vertice}">${vertice}</option>`;
	});

	const nodes = new vis.DataSet(
		vertices.map((v, i) => ({
			id: v,
			label: v,
			x: (i % 5) * 250, // aumenta o espaçamento horizontal (250 pixels)
			y: Math.floor(i / 5) * 250, // aumenta o espaçamento vertical (250 pixels)
			size: 16,
		}))
	);
	const edges = new vis.DataSet(arestas);
	const container = document.getElementById("mynetwork");
	const data = { nodes, edges };

	const options = {
		nodes: {},
		edges: {
			smooth: {
				type: "dynamic",
			},
		},
		// MELHORIA: Ajustes finos na simulação física
		physics: {
			enabled: true,
			solver: "barnesHut",
			barnesHut: {
				// Aumenta a força de repulsão entre os nós (número mais negativo = mais forte)
				gravitationalConstant: -3000,
				// Aumenta o "comprimento da mola" da aresta
				springLength: 250,
				springConstant: 0.05,
				// Evita que os nós se sobreponham
				avoidOverlap: 0.1,
			},
			stabilization: {
				// Aumenta o número de iterações para encontrar um layout estável
				iterations: 2000,
			},
		},
		interaction: {
			dragNodes: false, // impede que os nós sejam movidos pelo usuário
		},
	};

	const network = new vis.Network(container, data, options);

	function atualizarCaminho() {
		const origem = selectOrigem.value;
		const destino = selectDestino.value;

		nodes.update(
			nodes.getIds().map((id) => ({
				id,
				color: { border: "#2B7CE9", background: "#97C2FC" },
				size: 16,
			}))
		);
		edges.update(
			edges
				.getIds()
				.map((id) => ({ id, color: { color: "#848484" }, width: 2 }))
		);

		if (!origem || !destino) {
			return;
		}

		const { antecessores } = grafo.dijkstra(origem);

		// Reconstrói o caminho do fim para o início
		const caminho = [];
		let atual = destino;
		while (atual !== null) {
			caminho.unshift(atual);
			atual = antecessores.get(atual);
		}

		// Destaca o caminho se ele começar no ponto de origem correto
		if (caminho.length > 1 && caminho[0] === origem) {
			// Destaca os nós
			nodes.update(
				caminho.map((id) => ({
					id,
					color: { border: "#C20F0F", background: "#F05252" },
					size: 24,
				}))
			);

			// Destaca as arestas
			for (let i = 0; i < caminho.length - 1; i++) {
				const aresta = edges.get({
					filter: (item) =>
						(item.from === caminho[i] &&
							item.to === caminho[i + 1]) ||
						(item.from === caminho[i + 1] &&
							item.to === caminho[i]),
				});
				if (aresta.length > 0) {
					edges.update({
						id: aresta[0].id,
						color: { color: "#C20F0F" },
						width: 4,
					});
				}
			}
		}
	}

	selectOrigem.addEventListener("change", atualizarCaminho);
	selectDestino.addEventListener("change", atualizarCaminho);
});
