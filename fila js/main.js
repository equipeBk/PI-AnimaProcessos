import { RoundRobin } from "./RoundRobin.js";
import { FIFO } from "./fifo.js";

 document.getElementById("btn-round-robin").addEventListener("click", async () => {
      document.getElementById("btn-round-robin").disabled = true;

      const roundRobin = new RoundRobin(2);
      roundRobin.adicionarProcesso(1, 10);
      roundRobin.adicionarProcesso(2, 4);
      roundRobin.adicionarProcesso(3, 6);
      roundRobin.adicionarProcesso(4, 5);
      roundRobin.adicionarProcesso(5, 12);

      const processosElement = document.getElementById("processos");
      const processosFinalizadosElement = document.getElementById("processos-finalizados");

      processosElement.innerHTML = "";
      processosFinalizadosElement.innerHTML = "";

      while (!roundRobin.fila.isEmpty()) {
        const processo = roundRobin.fila.pop();
        const div = document.createElement("div");
        div.classList.add("processo", `processo-${processo.id}`);
        processosElement.appendChild(div);
        await sleep(1000);

        if (processo.tempoExecucao > roundRobin.quantum) {
          processo.tempoExecucao -= roundRobin.quantum;
          roundRobin.fila.add(processo);
        } else {
          const finalizadoDiv = document.createElement("div");
          finalizadoDiv.classList.add("processo", `processo-${processo.id}`);
          processosFinalizadosElement.appendChild(finalizadoDiv);
        }
      }

      document.getElementById("btn-round-robin").disabled = false;
    });

    // Código para executar o FIFO
    document.getElementById("btn-fifo").addEventListener("click", async () => {
      document.getElementById("btn-fifo").disabled = true;

      const fifo = new FIFO();
      fifo.adicionarProcesso(1, 10);
      fifo.adicionarProcesso(2, 4);
      fifo.adicionarProcesso(3, 6);
      fifo.adicionarProcesso(4, 5);
      fifo.adicionarProcesso(5, 12);

      const processosElement = document.getElementById("processos");

      processosElement.innerHTML = "";

      await fifo.executar();

      document.getElementById("btn-fifo").disabled = false;
    });

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }