class Jogo {
  constructor() {
    this.inimigoAtual = 0;
  }

  setup() {
    cenario = new Cenario(imagemCenario, 3);
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
      10,
      100
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
      10,
      500
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
      10,
      1000
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
      somDoPulo.play();
    }

    if (gameOver && key === "Enter") {
      window.location.reload();
    }
  }

  draw() {
    cenario.exibe();
    cenario.move();

    pontuacao.exibe();
    pontuacao.adicionarPonto();

    personagem.exibe();
    personagem.aplicaGravidade();

    const inimigo = inimigos[this.inimigoAtual];
    const inimigoVisivel = inimigo.x < -inimigo.largura;

    inimigo.exibe();
    inimigo.move();

    if (inimigoVisivel) {
      this.inimigoAtual++;

      if (this.inimigoAtual > 2) this.inimigoAtual = 0;

      inimigo.velocidade = parseInt(random(10, 20));
    }

    if (personagem.estaColisao(inimigo)) {
      const largura = windowWidth / 2 - 206;
      const altura = windowHeight / 2 - 39;

      gameOver = true;
      image(imagemGameOver, largura, altura);

      textFont(fontTelaInicial);
      textAlign(CENTER);
      textSize(25);
      text(
        "Pressione <Enter> para jogar novamente!",
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
