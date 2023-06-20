import { Fila } from "./fila.js";

class Processo {
  constructor(id, tempoExecucao, cor) {
    this.id = id;
    this.tempoExecucao = tempoExecucao;
    this.cor = cor;
  }
}

export class FIFO {
  constructor() {
    this.fila = new Fila();
  }

  adicionarProcesso(id, tempoExecucaoMax, cor) {
    const tempoExecucao = Math.ceil(Math.random() * tempoExecucaoMax);
    const processo = new Processo(id, tempoExecucao, cor);
    this.fila.add(processo);

    // Atualizar a tabela de processos
    const tabelaProcessosElement = document.getElementById("tabela-processos");
const tr = document.createElement("tr");
tr.innerHTML = `
<td class="processo ${cor}"></td>
  <td>${id}</td>
  <td>${tempoExecucao}</td>
`;
tabelaProcessosElement.querySelector("tbody").appendChild(tr);


  }

  async executar() {
    const processosElement = document.getElementById("processos");
    const processosFinalizadosElement = document.getElementById("processos-finalizados");

    while (!this.fila.isEmpty()) {
      const processo = this.fila.pop();

      while (processo.tempoExecucao > 0) {
        const li = document.createElement("li");
        li.classList.add("processo", `processo-${processo.id}`);
        li.style.backgroundColor = processo.cor;
        processosElement.appendChild(li);

        await sleep(1000);
        processo.tempoExecucao--;
      }

      const finalizadoDiv = document.createElement("div");
      finalizadoDiv.classList.add("processo", `processo-${processo.id}`);
      finalizadoDiv.classList.add("processo-finalizado");
      finalizadoDiv.style.backgroundColor = processo.cor;
      processosFinalizadosElement.appendChild(finalizadoDiv);
    }

    // Adicionar de volta os processos não finalizados à div "processos"
    const processosNaoFinalizados = processosElement.querySelectorAll(".processo:not(.processo-finalizado)");
    processosNaoFinalizados.forEach((processo) => {
      processosElement.appendChild(processo);
    });
  }

   limparTabelaProcessos() {
      const tabelaProcessosElement = document.getElementById("tabela-processos");
      tabelaProcessosElement.querySelector("tbody").innerHTML = "";
    }
    
    atualizarTabelaProcessos(id, tempoExecucao) {
      const tabelaProcessosElement = document.getElementById("tabela-processos");
    
      // Verifica se a tabela já possui uma linha de cabeçalho
      const theadExists = tabelaProcessosElement.querySelector("thead");
    
      // Se não houver uma linha de cabeçalho, cria uma nova
      if (!theadExists) {
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
        <td>cor</td>
          <th>ID</th>
          <th>Tempo de Execução</th>
        `;
        thead.appendChild(headerRow);
        tabelaProcessosElement.appendChild(thead);
      }
    
      const tbody = tabelaProcessosElement.querySelector("tbody");
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${cor}</td>
        <td>${id}</td>
        <td>${tempoExecucao}</td>
      `;
      tbody.appendChild(tr);
    }
    
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
