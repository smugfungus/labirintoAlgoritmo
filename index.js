const fs = require('fs');

// Função para ler o arquivo de entrada e criar uma matriz representando o labirinto
function criar_labirinto(arquivo) {
  const conteudo = fs.readFileSync(arquivo, 'utf8');
  const linhas = conteudo.trim().split('\n');
  const labirinto = [];

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();
    const caracteres = linha.split('');

    labirinto.push(caracteres);
  }

  return labirinto;
}

// Função para imprimir a rota do labirinto na tela
function imprimir_rota(labirinto) {
  for (let i = 0; i < labirinto.length; i++) {
    const linha = labirinto[i];
    console.log(linha.join(''));
  }
}

// Função para encontrar a posição do ponto de saída do labirinto
function encontrar_saida(labirinto) {
  for (let i = 0; i < labirinto.length; i++) {
    const linha = labirinto[i];

    for (let j = 0; j < linha.length; j++) {
      const caractere = linha[j];

      if (caractere === 'S') {
        return [i, j];
      }
    }
  }

  return null;
}

// Função para encontrar a posição do ponto de entrada no labirinto
function encontrar_entrada(labirinto) {
  for (let i = 0; i < labirinto.length; i++) {
    const linha = labirinto[i];

    for (let j = 0; j < linha.length; j++) {
      const caractere = linha[j];

      if (caractere === 'E') {
        return [i, j];
      }
    }
  }

  return null;
}

function checkarCaminho(labirinto) {
    for (let i = 0; i < labirinto.length; i++) {
        const linha = labirinto[i];
        const check = false;
    
        for (let j = 0; j < linha.length; j++) {
          const caractere = linha[j];
    
          if (caractere === 'O') {
            check = true;
            return check
          } else {
            return check;
          }
        }
      }
}

// Função para encontrar o caminho da entrada até a saída do labirinto
function encontrar_caminho(labirinto, posicaoAtual) {
  const linha = posicaoAtual[0];
  const coluna = posicaoAtual[1];

  // Verificar se a posição atual está fora dos limites do labirinto
  if (linha < 0 || linha >= labirinto.length || coluna < 0 || coluna >= labirinto[linha].length) {
    return false;
  }

  // Verificar se a posição atual é uma parede ou se já foi visitada
  if (labirinto[linha][coluna] === '#' || labirinto[linha][coluna] === 'o') {
    return false;
  }

  // Verificar se a posição atual é a entrada do labirinto
  if (labirinto[linha][coluna] === 'E') {
    return true;
  }

  // Marcar a posição atual como visitada
  labirinto[linha][coluna] = 'o';

  // Tentar encontrar o caminho a partir das posições vizinhas
  if (encontrar_caminho(labirinto, [linha - 1, coluna])) {
    return true;
  }
  if (encontrar_caminho(labirinto, [linha + 1, coluna])) {
    return true;
  }
  if (encontrar_caminho(labirinto, [linha, coluna - 1])) {
    return true;
  }
  if (encontrar_caminho(labirinto, [linha, coluna + 1])) {
    return true;
  }
  
  // Se não encontrou um caminho, marcar a posição atual como não visitada
  labirinto[linha][coluna] = ' ';
  
    return false;
  }
  
  // Função principal que executa o jogo do labirinto
  function resolver_labirinto(arquivo) {
    
    const labirinto = criar_labirinto(arquivo);
    const entrada = encontrar_entrada(labirinto);
    const saida = encontrar_saida(labirinto);
    
    if (saida === null || entrada === null) {
      
      console.error('O labirinto não tem ponto de entrada e/ou saída!');
      return;
      
    }

    const a = checkarCaminho(arquivo);

    if (a == false) {
        console.error('O labirinto não possui caminho!')
        return;
    } 
    
    console.log('Labirinto de entrada: \n');
    imprimir_rota(labirinto);
    
    encontrar_caminho(labirinto, saida);
    
    console.log('\nLabirinto de saída: \n');
    imprimir_rota(labirinto);
  }
  
  // Executar o jogo do labirinto com o arquivo de entrada especificado
  resolver_labirinto('labirinto.txt');