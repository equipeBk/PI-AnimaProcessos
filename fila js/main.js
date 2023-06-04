function main() {
    // Teste do algoritmo Round Robin
    console.log("Teste do algoritmo Round Robin:");
    const roundRobin = new RoundRobin(3);
    roundRobin.adicionarProcesso(1, 5);
    roundRobin.adicionarProcesso(2, 7);
    roundRobin.adicionarProcesso(3, 4);
    roundRobin.executar();
  
    // Teste do algoritmo FIFO
    console.log("\nTeste do algoritmo FIFO:");
    const fifo = new RoundRobin();
    fifo.adicionarProcesso(1, 5);
    fifo.adicionarProcesso(2, 7);
    fifo.adicionarProcesso(3, 4);
    fifo.executar();
  }
  
  // Chamando a função main
  main();
  