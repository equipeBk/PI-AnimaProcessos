import { Fila } from "./fila.js";
import { FIFO } from "./fifo.js";

class Processo {
  constructor(id, tempoExecucao) {
    this.id = id;
    this.tempoExecucao = tempoExecucao;
  }
}

export class RoundRobin {
  constructor(quantum) {
    this.fila = new Fila();
    this.quantum = quantum;
  }
  
    adicionarProcesso(id, tempoExecucaoMax) {
      const tempoExecucao = Math.ceil(Math.random() * tempoExecucaoMax);
      const processo = new Processo(id, tempoExecucao);
      this.fila.add(processo);
      const tabelaProcessosElement = document.getElementById("tabela-processos");
const tr = document.createElement("tr");
tr.innerHTML = `
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
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${id}</td>
        <td>${tempoExecucao}</td>
      `;
      tabelaProcessosElement.querySelector("tbody").appendChild(tr);
    }
    
  }