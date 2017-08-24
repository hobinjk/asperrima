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
};

Body.prototype.draw = function(ctx) {
  ctx.fillStyle = "rgb(255,164,0)";
  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI);
  ctx.fill();
};


;(function() {
   var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
   window.requestAnimationFrame = requestAnimationFrame;
})();


var G = 50;
var timeFactor = 5;

function Physics(id) {
  if(id) {
    this.ctx = document.getElementById(id);
  } else {
    this.ctx = document.createElement("canvas");
    this.ctx.id = id;
  }
  this.ctx.width = this.width = 640;
  this.ctx.height = this.height = 640;
  this.ctx = this.ctx.getContext("2d");
  this.bodies = [];
  //Fin = G*m*m/r^2
  //Fout = mv^2/r
  //Gmm/r^2 = mv^2/r
  //v = sqrt(Gm/r)
  var r = 150;
  var m = 1000.0;
  var v = Math.sqrt(G*m/r)/2;
  var k = 1.1;
  var n = 5;
  for(var i = 0; i < n; i++) {
    var theta = i*2*Math.PI/n;
    var cos = Math.cos(theta);
    var sin = Math.sin(theta);
    this.bodies.push(new Body(m, this.width/2 + r*cos, this.height/2 + r*sin, -k*v*sin, k*v*cos));
  }
  console.log(this.start);
  this.start();
}

Physics.prototype.start = function() {
  this.lastStep = Date.now() - 1;//window.mozAnimationstartTime;
  this.ctx.fillStyle = "rgba(0,0,0,1)";
  this.ctx.fillRect(0,0,this.width, this.height);
  this.update();
};

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
  }
  for(i = 0; i < this.bodies.length; i++) {
    this.bodies[i].update(dt);
    this.bodies[i].draw(this.ctx);
  }
  this.lastStep = Date.now();
  requestAnimationFrame(this.update.bind(this));
};

;function Vec2(x,y) {
  this.x = x;
  this.y = y;
}

Vec2.prototype.mul = function(k) {
  var modx = this.x;
  var mody = this.y;
  if(k instanceof Vec2) {
    modx *= k.x;
    mody *= k.y;
  } else if(typeof(k) === "number") {
    modx *= k;
    mody *= k;
  } else {
    throw "Invalid Argument";
  }
  return new Vec2(modx, mody);
};

Vec2.prototype.dot = Vec2.prototype.mul;

Vec2.prototype.div = function(k) {
  var modx = this.x;
  var mody = this.y;
  if(k instanceof Vec2) {
    modx /= k.x;
    mody /= k.y;
  } else if(typeof(k) === "number") {
    modx /= k;
    mody /= k;
  } else {
    throw "Invalid Argument";
  }
  return new Vec2(modx, mody);
};

Vec2.prototype.add = function(k) {
  var modx = this.x;
  var mody = this.y;
  if(k instanceof Vec2) {
    modx += k.x;
    mody += k.y;
  } else if(typeof(k) === "number") {
    modx += k;
    mody += k;
  } else {
    throw "Invalid Argument";
  }
  return new Vec2(modx, mody);
};

Vec2.prototype.sub = function(k) {
  var modx = this.x;
  var mody = this.y;
  if(k instanceof Vec2) {
    modx -= k.x;
    mody -= k.y;
  } else if(typeof(k) === "number") {
    modx -= k;
    mody -= k;
  } else {
    throw "Invalid Argument";
  }
  return new Vec2(modx, mody);
};

Vec2.prototype.mag = function() {
  return Math.sqrt(this.magSq());
};

Vec2.prototype.magSq = function() {
  return this.x*this.x + this.y*this.y;
};

Vec2.prototype.normalized = function() {
  return this.div(this.mag());
};
