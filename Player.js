function Player(){
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0
  this.ax = 0;
  this.ay = 0;
  this.angle = 0;
  this.width = 32;
  this.height = 32;
  this.angle = 0;
  this.vangle = 0;
  this.color = "blue";
  this.cooldown = 0;
}

Player.prototype.desenharImg = function (ctx, img) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle*2*Math.PI/360);
  ctx.fillStyle = this.color;
  ctx.drawImage(img, -this.width/2, -this.height/2, this.width, this.height);
  if(this.debug){
    ctx.strokeStyle = "grey";
    ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  }
  ctx.restore();
};

Player.prototype.mover = function (dt) {
  if(this.imgkey == "shot"){
    this.vy = this.vy + this.ay*dt;
    this.y = this.y + this.vy*dt;
  }
  this.vx = this.vx + this.ax*dt;
  this.x = this.x + this.vx*dt;
  this.angle = this.angle + this.vang*dt;
  if(this.cooldown>0) {
    this.cooldown -= dt;
  } else {
    this.cooldown = 0;
  }
};

Player.prototype.colidiuCenario = function (ctx) {
  if(this.x >= 480){
    this.x = 480;
  }
  else if(this.x <= 0){
    this.x = 0;
  }
};

Player.prototype.colidiuCom = function (inimigo) {
  if(this.x+this.width < inimigo.x) return false;
  if(this.x > inimigo.x+this.width) return false;
  if(this.y+this.height < inimigo.y) return false;
  if(this.y > inimigo.y+this.height) return false;
  return true;
};

Player.prototype.perseguirAng = function (alvo, dt) {
  var dX = alvo.x - this.x;
  var dY = alvo.y - this.y;
  var dist = Math.sqrt(dX*dX+dY*dY);
  var dA = 180*Math.acos(dX/dist)/Math.PI;
  this.vang = 100*(dA - this.angle)*dt;
};