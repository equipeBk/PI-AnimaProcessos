class fifo {
    constructor() {
      this.fila = new Fila();
    }
  
    adicionarProcesso(id, tempoExecucao) {
      const processo = new Processo(id, tempoExecucao);
      this.fila.add(processo);
    }
  
    executar() {
      while (!this.fila.isEmpty()) {
        const processo = this.fila.pop();
        console.log(`Executando processo ${processo.id}`);
        console.log(`Processo ${processo.id} completamente executado.`);
      }
    }
  }
