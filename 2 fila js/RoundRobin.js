import { Fila } from "./fila.js";
import { FIFO } from "./fifo.js";

class Processo {
  constructor(id, tempoExecucao, cor) {
    this.id = id;
    this.tempoExecucao = tempoExecucao;
    this.cor = cor;
  }
}

export class RoundRobin {
  constructor(quantum) {
    this.fila = new Fila();
    this.quantum = quantum;

  }
  
    adicionarProcesso(id, tempoExecucaoMax, cor) {
      const tempoExecucao = Math.ceil(Math.random() * tempoExecucaoMax);
      const processo = new Processo(id, tempoExecucao);
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
  
      while (!this.fila.isEmpty()) {
        const processo = this.fila.pop();
        const li = document.createElement("li");
        li.textContent = `Round Robin Executando processo ${processo.id}`;
        processosElement.appendChild(li);
        await sleep(2000);
  
        if (processo.tempoExecucao > this.quantum) {
          processo.tempoExecucao -= this.quantum;
          const liRestante = document.createElement("li");
          liRestante.textContent = `Round Robin Processo ${processo.id} parcialmente executado. Tempo restante: ${processo.tempoExecucao}`;
          processosElement.appendChild(liRestante);
          this.fila.add(processo);
        } else {
          const liCompleto = document.createElement("li");
          liCompleto.textContent = `Round Robin Processo ${processo.id} completamente executado.`;
          processosElement.appendChild(liCompleto);
        }
      }
    }
    limparTabelaProcessos() {
  const tabelaProcessosElement = document.getElementById("tabela-processos");
  const tbody = tabelaProcessosElement.querySelector("tbody");
  tbody.innerHTML = "";
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