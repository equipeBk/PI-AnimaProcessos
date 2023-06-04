class Processo {
    constructor(id, tempoExecucao) {
      this.id = id;
      this.tempoExecucao = tempoExecucao;
    }
  }
  
  class RoundRobin {
    constructor(quantum) {
      this.fila = new Fila();
      this.quantum = quantum;
    }
  
    adicionarProcesso(id, tempoExecucao) {
      const processo = new Processo(id, tempoExecucao);
      this.fila.add(processo);
    }
  
    executar() {
      while (!this.fila.isEmpty()) {
        const processo = this.fila.pop();
        console.log(`Executando processo ${processo.id}`);
  
        if (processo.tempoExecucao > this.quantum) {
          processo.tempoExecucao -= this.quantum;
          console.log(`Processo ${processo.id} parcialmente executado. Tempo restante: ${processo.tempoExecucao}`);
          this.fila.add(processo);
        } else {
          console.log(`Processo ${processo.id} completamente executado.`);
        }
      }
    }
  }