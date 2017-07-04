function CriarFase (){
  this.fase = 1;
  this.tempo = 0;
  //this.partida = true;
  this.inimigos = [];
};

CriarFase.prototype.ondas = function(desafio){

  //if(this.partida){
    this.inimigos = [];
    if(desafio.fase == 1){
	    for (var i = 0; i < 2; i++) {
          var inimigo = new Inimigo();
          inimigo.x = 48 * (2*(i+1));
          inimigo.y = -32;
          inimigo.ax = 20;
          inimigo.ay = 20;
          inimigo.g = 1;
          inimigo.width = 32;
          inimigo.height = 32;
          inimigo.imgkey = "asteroide";
          inimigo.vang = 500-Math.random()*750;
          //console.log("Fase 1");
          this.inimigos.push(inimigo);
  	  }
    } else if(desafio.fase == 2){
        for (var i = 0; i < 4; i++) {
          var inimigo = new Inimigo();
          inimigo.x = 48 * (2*(i+1));
          inimigo.y = -32;
          inimigo.ax = -20;
          inimigo.ay = 20;
          inimigo.g = 1;
          inimigo.width = 32;
          inimigo.height = 32;
          inimigo.vang = 500-Math.random()*750;
          inimigo.imgkey = "asteroide";
          //console.log("Fase 1");
          this.inimigos.push(inimigo);
      }
    } else if (desafio.fase == 3){
       for (var i = 0; i < 2; i++) {
          var inimigo = new Inimigo();
          inimigo.x = 48 * (2*(i+1));
          inimigo.y = -32;
          inimigo.ax = -20;
          inimigo.ay = 20;
          inimigo.g = 1;
          inimigo.width = 32;
          inimigo.height = 32;
          inimigo.vang = 500-Math.random()*750;
          inimigo.imgkey = "asteroide";
          //console.log("Fase 1");
          this.inimigos.push(inimigo);
      }
      for (var i = 0; i < 2; i++) {
          var inimigo = new Inimigo();
          inimigo.x = 48 * (2*(i+1));
          inimigo.y = -32;
          inimigo.ax = 20;
          inimigo.ay = 20;
          inimigo.g = 1;
          inimigo.width = 32;
          inimigo.height = 32;
          inimigo.imgkey = "asteroide";
          //console.log("Fase 1");
          this.inimigos.push(inimigo);
      }
    } else if (desafio.fase == 4){
        for (var i = 0; i < 3; i++) {
          var inimigo = new Inimigo();
          inimigo.x = 48 * (2*(i+1));
          inimigo.y = -32;
          inimigo.ax = -25;
          inimigo.ay = 25;
          inimigo.g = 2;
          inimigo.width = 32;
          inimigo.height = 32;
          inimigo.imgkey = "asteroide";
          //console.log("Fase 1");
          this.inimigos.push(inimigo);
      }
      for (var i = 0; i < 3; i++) {
          var inimigo = new Inimigo();
          inimigo.x = 48 * (2*(i+1));
          inimigo.y = -32;
          inimigo.ax = 25;
          inimigo.ay = 25;
          inimigo.g = 2;
          inimigo.width = 32;
          inimigo.height = 32;
          inimigo.imgkey = "asteroide";
          //console.log("Fase 1");
          this.inimigos.push(inimigo);
      }
    }

    return this.inimigos;
  
};