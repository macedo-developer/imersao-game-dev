class Personagem extends Animacao {
  constructor(
    matriz,
    imagem,
    x,
    variacaoY,
    largura,
    altura,
    larguraSprite,
    alturaSprite
  ) {
    super(
      matriz,
      imagem,
      x,
      variacaoY,
      largura,
      altura,
      larguraSprite,
      alturaSprite
    );

    this.variacaoY = variacaoY;
    this.frameAtual = 0;

    this.yInicial = height - altura - variacaoY;
    this.y = this.yInicial;
    this.velocidadePulo = 0;
    this.gravidade = 3;
  }

  pula() {
    this.velocidadePulo = -35;
  }

  aplicaGravidade() {
    this.y += this.velocidadePulo;
    this.velocidadePulo += this.gravidade;

    if (this.y > this.yInicial) this.y = this.yInicial;
  }

  estaColisao(inimigo) {
    const precisao = 0.7;

    const colisao = collideRectRect(
      this.x,
      this.y,
      this.largura * precisao,
      this.altura * precisao,
      inimigo.x,
      inimigo.y,
      inimigo.largura * precisao,
      inimigo.altura * precisao
    );

    return colisao;
  }
}
