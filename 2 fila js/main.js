import { RoundRobin } from "./RoundRobin.js";
import { FIFO } from "./fifo.js";

////duas RR
 document.getElementById("btn-round-robin").addEventListener("click", async () => {
      document.getElementById("btn-round-robin").disabled = true;

      const roundRobin1 = new RoundRobin(2);
      roundRobin1.adicionarProcesso(1, 10, "processo-1");
      roundRobin1.adicionarProcesso(2, 4, 'processo-2');
      roundRobin1.adicionarProcesso(3, 6, 'processo-3');
      roundRobin1.adicionarProcesso(4, 5, 'processo-4');
      roundRobin1.adicionarProcesso(5, 12, 'processo-5');

      const roundRobin2 = new RoundRobin(2);
      roundRobin2.adicionarProcesso(6, 10, 'processo-6');
      roundRobin2.adicionarProcesso(7, 4, 'processo-7');
      roundRobin2.adicionarProcesso(8, 6, 'processo-8');
      roundRobin2.adicionarProcesso(9, 5, 'processo-9');
      roundRobin2.adicionarProcesso(10, 12, 'processo-10');

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

  // 2 FIFO
document.getElementById("btn-fifo").addEventListener("click", async () => {
  document.getElementById("btn-fifo").disabled = true;

  const fifo = new FIFO();
  fifo.limparTabelaProcessos();
  fifo.adicionarProcesso (1, 10, "processo-1");
  fifo.adicionarProcesso(2, 4, "processo-2");
  fifo.adicionarProcesso(3, 6, "processo-3");
  fifo.adicionarProcesso(4, 5, 'processo-4');
  fifo.adicionarProcesso(5, 12, 'processo-5');
  fifo.adicionarProcesso(6, 10, 'processo-6');
  fifo.adicionarProcesso(7, 4, 'processo-7');
  fifo.adicionarProcesso(8, 6, 'processo-8');
  fifo.adicionarProcesso(9, 5, 'processo-9');
  fifo.adicionarProcesso(10, 12, 'processo-10');

  const processosElement = document.getElementById("processos");
  const processosFinalizadosElement = document.getElementById("processos-finalizados");

  processosElement.innerHTML = "";
  processosFinalizadosElement.innerHTML = ""; // Limpar os processos finalizados

  await fifo.executar();

  document.getElementById("btn-fifo").disabled = false;
});

///1 RR E OUTRA FIFO 
document.getElementById("btn-fifo-rr").addEventListener("click", async () => {
  document.getElementById("btn-fifo-rr").disabled = true;

  const roundRobin1 = new RoundRobin(2);
  roundRobin1.adicionarProcesso(1, 10, "processo-1");
  roundRobin1.adicionarProcesso(2, 4, 'processo-2');
  roundRobin1.adicionarProcesso(3, 6, 'processo-3');
  roundRobin1.adicionarProcesso(4, 5, 'processo-4');
  roundRobin1.adicionarProcesso(5, 12, 'processo-5');

  const fifo = new FIFO();
    fifo.adicionarProcesso (6, 10, "processo-6");
    fifo.adicionarProcesso(7, 4, "processo-7");
    fifo.adicionarProcesso(8, 6, "processo-8");
    fifo.adicionarProcesso(9, 5, 'processo-9');
    fifo.adicionarProcesso(10, 12, 'processo-10');

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
  await fifo.executar();

  document.getElementById("btn-fifo").disabled = false;
});
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }