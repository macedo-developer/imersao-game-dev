class Jogo {
  constructor() {
    this.indice = 0;
    this.mapa = fita.mapa;
  }

  setup() {
    cenario = new Cenario(imagemCenario, 3);
    cenario2 = new Cenario(imagemCenario2, 6);
    cenario3 = new Cenario(imagemCenario3, 9);

    vida = new Vida(
      fita.configuracoes.vidaMaxima,
      fita.configuracoes.vidaInicial
    );

    personagem = new Personagem(
      matrizPersonagem,
      imagemPersonagem,
      25,
      30,
      110,
      135,
      220,
      270
    );

    const inimigo = new Inimigo(
      matrizInimigo,
      imagemInimigo,
      width - 52,
      30,
      52,
      52,
      104,
      104,
      10
    );

    const inimigoGrande = new Inimigo(
      matrizInimigoGrande,
      imagemInimigoGrande,
      width,
      0,
      200,
      200,
      400,
      400,
      10
    );

    const inimigoVoador = new Inimigo(
      matrizInimigoVoador,
      imagemInimigoVoador,
      width - 52,
      200,
      100,
      75,
      200,
      150,
      10
    );

    gameOver = false;

    inimigos.push(inimigo);
    inimigos.push(inimigoGrande);
    inimigos.push(inimigoVoador);

    pontuacao = new Pontuacao();
  }

  keyPress(key) {
    if (!gameOver && key === "ArrowUp") {
      personagem.pula();
    }

    if (gameOver && key === "Enter") {
      window.location.reload();
    }
  }

  draw() {
    if (pontuacao.pontos < 201) {
      cenario.exibe();
      cenario.move();
    } else if (pontuacao.pontos > 200 && pontuacao.pontos < 400) {
      cenario2.exibe();
      cenario2.move();
    } else {
      cenario3.exibe();
      cenario3.move();
    }

    vida.draw();

    pontuacao.exibe();
    pontuacao.adicionarPonto();

    personagem.exibe();
    personagem.aplicaGravidade();

    const linhaAtual = this.mapa[this.indice];

    const inimigo = inimigos[linhaAtual.inimigo];
    const inimigoVisivel = inimigo.x < -inimigo.largura;

    if (pontuacao.pontos < 201) {
      inimigo.velocidade = linhaAtual.velocidade;
    } else if (pontuacao.pontos > 200 && pontuacao.pontos < 401) {
      inimigo.velocidade = linhaAtual.velocidade * 1.5;
    } else if (pontuacao.pontos > 400 && pontuacao.pontos < 501) {
      inimigo.velocidade = linhaAtual.velocidade * 2.5;
      cenario3.velocidade = 12;
    } else if (pontuacao.pontos > 500 && pontuacao.pontos < 601) {
      inimigo.velocidade = linhaAtual.velocidade * 3;
      cenario3.velocidade = 16;
    } else {
      inimigo.velocidade = linhaAtual.velocidade * 3.5;
      cenario3.velocidade = 19;
    }

    inimigo.exibe();
    inimigo.move();

    if (inimigoVisivel) {
      this.indice++;

      inimigo.aparece();

      if (this.indice > this.mapa.length - 1)
        this.indice = parseInt(random(0, 2));
    }

    if (personagem.estaColisao(inimigo)) {
      vida.perdeVida();
      personagem.tornaInvencivel();

      somColisao.play();

      if (vida.vidas === 0) {
        const largura = windowWidth / 2 - 206;
        const altura = windowHeight / 2 - 39;

        gameOver = true;

        textFont(fontTelaInicial);
        textAlign(CENTER);
        textSize(50);
        text(
          `${parseInt(pontuacao.pontos)} Points`,
          width / 2,
          height / 2 - 60
        );

        image(imagemGameOver, largura, altura);

        textFont(fontTelaInicial);
        textAlign(CENTER);
        textSize(25);
        text(
          "Press the <Enter> key to start the game",
          width / 2,
          height / 2 + 100
        );

        somDoJogo.stop();

        somGameOver.play();
        somGameOver.setVolume(0.3);
        somMusicGameOver.play();
        somMusicGameOver.setVolume(0.2);

        noLoop();
      }
    }
  }
}
