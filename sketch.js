function setup() {
  createCanvas(windowWidth, windowHeight);

  jogo = new Jogo();
  jogo.setup();

  telaInicial = new TelaInicial();

  frameRate(40);
  cenas = {
    jogo,
    telaInicial,
  };

  botaoGerenciador = new BotaoGerenciador("Start Game", width / 2, height / 2);
  linkLinkedin = new CreateLink(
    "https://www.linkedin.com/in/macedorenata/",
    '<i class="fab fa-linkedin-in"></i>LinkedIn',
    20,
    30,
    "linkedin"
  );

  somDoJogo.loop();
  somDoJogo.setVolume(0.1);
}

function keyPressed() {
  jogo.keyPress(key);
}

function draw() {
  cenas[cenaAtual].draw();
}
