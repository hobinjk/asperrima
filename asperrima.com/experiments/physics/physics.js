(function() {
   var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
   window.requestAnimationFrame = requestAnimationFrame;
})();

const G = 50;
const timeFactor = 5;

function Physics(id) {
  if(id) {
    this.ctx = document.getElementById(id);
  } else {
    this.ctx = document.createElement("canvas");
    this.ctx.id = id;
  }
  this.ctx.width = this.width = 600;
  this.ctx.height = this.height = 600;
  this.ctx = this.ctx.getContext("2d");
  this.bodies = [];
  //Fin = G*m*m/r^2
  //Fout = mv^2/r
  //Gmm/r^2 = mv^2/r
  //v = sqrt(Gm/r)
  var r = 150;
  var m = 1000.0;
  var v = Math.sqrt(G*m/r)/2;
  var k = 1;
  var n = 5;
  for(var i = 0; i < n; i++) {
    var theta = i*2*Math.PI/n;
    var cos = Math.cos(theta);
    var sin = Math.sin(theta);
    this.bodies.push(new Body(m, this.width/2 + r*cos, this.height/2 + r*sin, -k*v*sin, k*v*cos));
  }
  this.start();
}

Physics.prototype.start = function() {
  this.lastStep = Date.now() - 1;//window.mozAnimationStartTime;
  this.ctx.fillStyle = "rgba(0,0,0,1)";
  this.ctx.fillRect(0,0,this.width, this.height);
  this.update();
}

Physics.prototype.update = function(timestamp) {
  var dt = (Date.now() - this.lastStep)/1000.0*timeFactor;
  this.ctx.fillStyle = "rgba(0,0,0,0.01)";
  this.ctx.fillRect(0,0,this.width, this.height);
  for(var i = 0; i < this.bodies.length; i++) {
    var body = this.bodies[i];
    var acc = new Vec2(0,0);
    for(var j = i + 1; j < this.bodies.length; j++) {
      var other = this.bodies[j];

      var diff = other.pos.sub(body.pos);
      var rsq = diff.magSq();
      var diffNorm = diff.normalized();
      var f = G*body.m*other.m/rsq;
      var ax = f*diffNorm.x/body.m;
      var ay = f*diffNorm.y/body.m;
      acc.x = ax;
      acc.y = ay;
      body.vel = body.vel.add(acc.mul(dt));
      other.vel = other.vel.add(acc.mul(-dt));
    }
    body.update(dt);
    body.draw(this.ctx);
  }
  this.lastStep = Date.now();
  requestAnimationFrame(this.update.bind(this));
}

