function Body(m,x,y,vx,vy) {
  this.m = m;
  this.pos = new Vec2(x, y);
  this.vel = new Vec2(vx, vy);
  this.r = 2; //Math.pow(this.m/(1.3333*Math.PI), 1./3.);
}

Body.prototype.update = function(dt) {
  /*
  var self = this;
  var acc = new Vec2(0,0);
  bodies.forEach(function(body) {
    if(body === self) return;
    var diff = body.pos.sub(self.pos);
    var rsq = diff.magSq();
    var diffNorm = diff.normalized();
    var f = G*self.m*body.m/rsq;
    var ax = f*diffNorm.x/self.m;
    var ay = f*diffNorm.y/self.m;
    acc.x += ax;
    acc.y += ay;
  });
  this.vel = this.vel.add(acc.mul(dt));
  */
  this.pos = this.pos.add(this.vel.mul(dt));
}

Body.prototype.draw = function(ctx) {
  ctx.fillStyle = "rgb(255,164,0)";
  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI);
  ctx.fill();
}


