import { RoundRobin } from "./RoundRobin.js";
import { FIFO } from "./fifo.js";


 document.getElementById("btn-round-robin").addEventListener("click", async () => {
      document.getElementById("btn-round-robin").disabled = true;

      const roundRobin1 = new RoundRobin(2);
      roundRobin1.adicionarProcesso(1, 10);
      roundRobin1.adicionarProcesso(2, 4);
      roundRobin1.adicionarProcesso(3, 6);
      roundRobin1.adicionarProcesso(4, 5);
      roundRobin1.adicionarProcesso(5, 12);

      const roundRobin2 = new RoundRobin(2);
      roundRobin2.adicionarProcesso(6, 10);
      roundRobin2.adicionarProcesso(7, 4);
      roundRobin2.adicionarProcesso(8, 6);
      roundRobin2.adicionarProcesso(9, 5);
      roundRobin2.adicionarProcesso(10, 12);

      const processosElement = document.getElementById("processos");
      const processosFinalizadosElement = document.getElementById("processos-finalizados");
      
    processosElement.innerHTML = "";
      processosFinalizadosElement.innerHTML = "";
      while (!roundRobin1.fila.isEmpty()) {
        const processo = roundRobin1.fila.pop();
        const div = document.createElement("div");
        div.classList.add("processo", `processo-${processo.id}`);
        processosElement.appendChild(div);
        await sleep(1000);

        if (processo.tempoExecucao > roundRobin1.quantum) {
          processo.tempoExecucao -= roundRobin1.quantum;
          roundRobin1.fila.add(processo);
        } else {
          const finalizadoDiv = document.createElement("div");
          finalizadoDiv.classList.add("processo", `processo-${processo.id}`);
          processosFinalizadosElement.appendChild(finalizadoDiv);
        }
      }
      

      const processosElement2 = document.getElementById("processos");
      const processosFinalizadosElement2 = document.getElementById("processos-finalizados");
    
      while (!roundRobin2.fila.isEmpty()) {
        const processo = roundRobin2.fila.pop();
        const div = document.createElement("div");
        div.classList.add("processo", `processo-${processo.id}`);
        processosElement2.appendChild(div);
        await sleep(1000);

        if (processo.tempoExecucao > roundRobin2.quantum) {
          processo.tempoExecucao -= roundRobin2.quantum;
          roundRobin2.fila.add(processo);
        } else {
          const finalizadoDiv = document.createElement("div");
          finalizadoDiv.classList.add("processo", `processo-${processo.id}`);
          processosFinalizadosElement2.appendChild(finalizadoDiv);
        }
      }
      
      document.getElementById("btn-round-robin").disabled = false;
    });

  // Código para executar o FIFO
document.getElementById("btn-fifo").addEventListener("click", async () => {
  document.getElementById("btn-fifo").disabled = true;

  const fifo = new FIFO();
  fifo.limparTabelaProcessos();
  fifo.adicionarProcesso( 1, 10);
  fifo.adicionarProcesso(2, 4);
  fifo.adicionarProcesso(3, 6);
  fifo.adicionarProcesso(4, 5);
  fifo.adicionarProcesso(5, 12);
  fifo.adicionarProcesso(6, 10);
  fifo.adicionarProcesso(7, 4);
  fifo.adicionarProcesso(8, 6);
  fifo.adicionarProcesso(9, 5);
  fifo.adicionarProcesso(10, 12);

  const processosElement = document.getElementById("processos");
  const processosFinalizadosElement = document.getElementById("processos-finalizados");

  processosElement.innerHTML = "";
  processosFinalizadosElement.innerHTML = ""; // Limpar os processos finalizados

  await fifo.executar();

  document.getElementById("btn-fifo").disabled = false;
});


    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }