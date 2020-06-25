function setup() {
  createCanvas(windowWidth, windowHeight);
  cenario = new Cenario(imagemCenario, 3);
  personagem = new Personagem(
    matrizPersonagem,
    imagemPersonagem,
    0,
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

  inimigos.push(inimigo);
  inimigos.push(inimigoGrande);
  inimigos.push(inimigoVoador);

  pontuacao = new Pontuacao();

  frameRate(40);
  // somDoJogo.loop();
}

function keyPressed() {
  if (key === "ArrowUp") {
    personagem.pula();
    somDoPulo.play();
  }
}

function draw() {
  cenario.exibe();
  cenario.move();

  pontuacao.exibe();
  pontuacao.adicionarPonto();

  personagem.exibe();
  personagem.aplicaGravidade();

  const inimigo = inimigos[inimigoAtual];
  const inimigoVisivel = inimigo.x < -inimigo.largura;

  // inimigos.forEach((inimigo) => {
  inimigo.exibe();
  inimigo.move();

  if (inimigoVisivel) {
    inimigoAtual++;

    if (inimigoAtual > 2) inimigoAtual = 0;

    inimigo.velocidade = parseInt(random(10, 20));
  }

  if (personagem.estaColisao(inimigo)) {
    const largura = windowWidth / 2 - 206;
    const altura = windowHeight / 2 - 39;

    image(imagemGameOver, largura, altura);
    noLoop();
  }
  // });
}
