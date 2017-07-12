function Level (){
  this.inimigos = [];
  this.builds = [];
  this.shots = [];
  this.message = "";
  this.distancia = 80;
  this.score = 0;
  this.life = 4;
  this.music = true;
  this.buildsQtd = 4
  this.end = false;
  this.mira = new Sprite();
  this.fases = {tempo: key.tempo, fase: key.fase};
}

Level.prototype.init = function () {
  for (var i = 1; i <= this.buildsQtd; i++) {
    var build = new Sprite();
    var eixoX = 95 * i;
    var eixoY = 450;
    build.x = eixoX;
    build.y = eixoY;
    build.width = 32;
    build.height = 128;
    build.imgkey = "build";
    this.builds.push(build);
  }

 };

Level.prototype.initMira = function (){
  this.mira.x = 240;
  this.mira.y = 240;
  this.mira.width = 16;
  this.mira.height = 16;
  this.mira.imgkey = "mira";
}

Level.prototype.recebeInimigo = function (enemys, tamanho){
  for (var i = 0; i < tamanho; i++) {
    this.inimigos.push(enemys[i]);
    //console.log(enemys.length);
    console.log(this.inimigos[i]);
  }
};

Level.prototype.mover = function (dt) {
    for (var i = 0; i < this.inimigos.length; i++) {
      this.inimigos[i].cair(dt);
    }
    for (var i = this.shots.length-1;i>=0; i--) {
      this.shots[i].mover(dt);
      if(
        this.shots[i].x >  3000 ||
        this.shots[i].x < -3000 ||
        this.shots[i].y >  3000 ||
        this.shots[i].y < -3000
      ){
        this.shots.splice(i, 1);
      }
    }
    for(var i = this.inimigos.length-1;i>=0; i--){
      if(this.inimigos[i].y > 496  ||
         this.inimigos[i].y < -496 ||
         this.inimigos[i].x > 600  ||
         this.inimigos[i].x < -600
        ){
         this.inimigos.splice(i,1);
      }
    }
};

Level.prototype.moverMira = function (dt) {
  this.mira.mover(dt);
};

// Level.prototype.moverAng = function (dt) {
//     for (var i = 0; i < this.inimigos.length; i++) {
//       this.inimigos[i].moverAng(dt);
//     }
//     for (var i = this.shots.length-1; i >= 0; i--) {
//       this.shots[i].moverAng(dt);
//       if(
//         this.shots[i].x >  3000 ||
//         this.shots[i].x < -3000 ||
//         this.shots[i].y >  3000 ||
//         this.shots[i].y < -3000
//       ){
//         this.shots.splice(i, 1);
//       }
//     }
// };

Level.prototype.desenhar = function (ctx) {
    for (var i = 0; i < this.builds.length; i++) {
      this.builds[i].desenhar(ctx);
    }
    //this.mira.desenhar(ctx);
};

Level.prototype.desenharImg = function (ctx, imageLib) {
  for (var i = 0; i < this.inimigos.length; i++) {
    this.inimigos[i].desenharImg(ctx, imageLib.images[this.inimigos[i].imgkey]);
  }
  for (var i = 0; i < this.shots.length; i++) {
    this.shots[i].desenharImg(ctx, imageLib.images[this.shots[i].imgkey]);
  }
  /*for(var i = 0; i < this.builds.length; i++){
    this.builds[i].desenharImgNoRotate(ctx, imageLib.images[this.builds[i].imgkey]);
  }*/
  this.mira.desenharImgNoRotate(ctx, imageLib.images[this.mira.imgkey]);
};

Level.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.inimigos.length; i++) {
      if(this.inimigos[i].colidiuCom(alvo)){
        resolveColisao(this.inimigos[i], alvo);
      }
    }
};

// Level.prototype.perseguir = function (alvo, dt) {
//   for (var i = 0; i < this.inimigos.length; i++) {
//     this.inimigos[i].perseguir(alvo,dt);
//   }
// };
// Level.prototype.perseguirAng = function (alvo, dt) {
//   for (var i = 0; i < this.inimigos.length; i++) {
//     this.inimigos[i].perseguirAng(alvo,dt);
//   }
// };

Level.prototype.fire = function (alvo, mira, audiolib, key, vol){
  if(alvo.cooldown>0) return;
  var tiro = new Player();
  var xT = mira.x - alvo.x;
  var x = Math.pow(xT, 2);
  var yT = mira.y - alvo.y;
  var y = Math.pow(yT, 2);
  var w = Math.sqrt(x + y);
  tiro.x = alvo.x;
  tiro.y = alvo.y;
  tiro.vx = xT/w * 100;
  tiro.vy = yT/w * 100;
  //tiro.vy = mira.y - alvo.y;
  tiro.width = 8;
  tiro.height = 16;
  tiro.imgkey = "shot";
  alvo.cooldown = 1;
  //tiro.vx = mira.x - alvo.x;
  //console.log(mira.y - alvo.y);
  //console.log(Math.round((mira.y - alvo.y)/(mira.x - alvo.x)));
  this.shots.push(tiro);
  if(audiolib && key) audiolib.play(key,vol);
};

Level.prototype.cooldownTiro = function (alvo){
  if(alvo.cooldown>0) {
    alvo.cooldown -= dt;
  } else {
    alvo.cooldown = 0;
  }
}

Level.prototype.colidiuComTiros = function(al, key){
  var that = this;
  for(var i = this.shots.length-1; i>=0; i--){

    this.colidiuCom(this.shots[i],      
        function(inimigo){
            inimigo.color = "green";
            that.shots.splice(i,1);
            x = that.inimigos.indexOf(inimigo);
            that.inimigos.splice(x, 1);
            that.score++;
            if(al&&key) al.play(key);
        }
      );
  }
};

Level.prototype.colidiuComBuilds = function(al, key){
  var that = this;
  for(var i = this.inimigos.length-1; i>=0; i--){
    for (var j = this.builds.length-1; j >= 0; j--) {
          this.colidiuCom(this.builds[j],      
            function(inimigo, build){
            inimigo.color = "black";
            x = that.inimigos.indexOf(inimigo);
            that.inimigos.splice(x, 1);
            y = that.builds.indexOf(build);
            that.builds.splice(y, 1);
            that.life--;
            if(al&&key) al.play(key);
        }
      );
    }
  }
};

Level.prototype.movimento = function(ctx){
  for(var i = this.inimigos.length-1; i>=0; i--){
    if(this.inimigos[i].x < -this.inimigos[i].width){
      this.inimigos[i].x = eCanvas.width-this.inimigos[i].width;
      console
    }
    if(this.inimigos[i].x > eCanvas.width){
      //this.inimigos[i].ax = -this.inimigos[i].ax;
      //this.inimigos[i].vx = -this.inimigos[i].vx;
      this.inimigos[i].x = 0-this.inimigos[i].width;
    } 
    
  }
}

Level.prototype.colidiuComPlayer = function(player, al, key){
  var that = this;
  for(var i = this.inimigos.length-1; i>=0; i--){

    this.colidiuCom(player,      
        function(inimigo){
            inimigo.color = "black";
            x = that.inimigos.indexOf(inimigo);
            that.inimigos.splice(x, 1);
            that.life--;
            if(al&&key) al.play(key);
        }
      );
  }
};

Level.prototype.playerLife = function(ctx, al = null, key = null){
  if (this.life > 0) {
    return true;
  } else {
    this.inimigos = [];
    this.message = "Você morreu!";
    ctx.fillText(this.message, 180, 240);
    if(this.music&&al&&key) { 
      al.play(key)
      this.music = false;
    }
    return false;
  }
};

Level.prototype.victory = function(ctx, al = null, key = null){
    this.inimigos = [];
    this.message = "Você venceu!";
    ctx.fillText(this.message, 180, 240);
    if(this.music&&al&&key) { 
      al.play(key)
      this.music = false;
    }
}


