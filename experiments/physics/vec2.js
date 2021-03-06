function Vec2(x,y) {
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
}

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
}

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
}

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
}

Vec2.prototype.mag = function() {
  return Math.sqrt(this.magSq());
}

Vec2.prototype.magSq = function() {
  return this.x*this.x + this.y*this.y;
}

Vec2.prototype.normalized = function() {
  return this.div(this.mag());
}
