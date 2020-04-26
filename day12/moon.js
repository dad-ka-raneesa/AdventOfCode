const comparePosition = function(pos1, pos2) {
  return pos1 > pos2 ? -1 : pos1 < pos2 ? 1 : 0;
};

class Moon {
  constructor(position) {
    this.firstPos = { x: position.x, y: position.y, z: position.z };
    this.pos = { x: position.x, y: position.y, z: position.z };
    this.vel = { x: 0, y: 0, z: 0 };
  }

  get energy() {
    const potentialEnergy = Math.abs(this.pos.x) + Math.abs(this.pos.y) + Math.abs(this.pos.z);
    const kineticEnergy = Math.abs(this.vel.x) + Math.abs(this.vel.y) + Math.abs(this.vel.z);
    return potentialEnergy * kineticEnergy;
  }

  updatePosition() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.pos.z += this.vel.z;
  }

  updateVelocity(allMoons) {
    const otherMoons = allMoons.filter(moon => allMoons.indexOf(moon) != allMoons.indexOf(this));
    const x = otherMoons.reduce((sum, moon) => sum + comparePosition(this.pos.x, moon.pos.x), 0);
    const y = otherMoons.reduce((sum, moon) => sum + comparePosition(this.pos.y, moon.pos.y), 0);
    const z = otherMoons.reduce((sum, moon) => sum + comparePosition(this.pos.z, moon.pos.z), 0);
    this.vel.x += x;
    this.vel.y += y;
    this.vel.z += z;
  }
}

module.exports = { Moon };