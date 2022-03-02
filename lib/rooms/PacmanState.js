"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacmanState = exports.Level = exports.Wall = exports.Floor = exports.Pellet = exports.Player = void 0;
const schema_1 = require("@colyseus/schema");
class Player extends schema_1.Schema {
}
__decorate([
    schema_1.type("string")
], Player.prototype, "name", void 0);
__decorate([
    schema_1.type("string")
], Player.prototype, "role", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "positionX", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "positionY", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "positionZ", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "rotationX", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "rotationY", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "rotationZ", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "score", void 0);
exports.Player = Player;
let pelletCounter = 0;
class Pellet extends schema_1.Schema {
    constructor({ x, y }) {
        super();
        this.visible = true;
        this.id = pelletCounter++;
        console.log(this);
    }
}
__decorate([
    schema_1.type("string")
], Pellet.prototype, "id", void 0);
__decorate([
    schema_1.type("number")
], Pellet.prototype, "x", void 0);
__decorate([
    schema_1.type("number")
], Pellet.prototype, "y", void 0);
__decorate([
    schema_1.type("boolean")
], Pellet.prototype, "visible", void 0);
exports.Pellet = Pellet;
class Floor extends schema_1.Schema {
}
__decorate([
    schema_1.type("number")
], Floor.prototype, "x", void 0);
__decorate([
    schema_1.type("number")
], Floor.prototype, "y", void 0);
exports.Floor = Floor;
class Wall extends schema_1.Schema {
}
__decorate([
    schema_1.type("number")
], Wall.prototype, "x", void 0);
__decorate([
    schema_1.type("number")
], Wall.prototype, "y", void 0);
exports.Wall = Wall;
class Level extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.pellets = new schema_1.ArraySchema();
        this.powerPellets = new schema_1.ArraySchema();
        this.walls = new schema_1.ArraySchema();
        this.floor = new schema_1.ArraySchema();
    }
}
__decorate([
    schema_1.type([Pellet])
], Level.prototype, "pellets", void 0);
__decorate([
    schema_1.type([Pellet])
], Level.prototype, "powerPellets", void 0);
__decorate([
    schema_1.type([Wall])
], Level.prototype, "walls", void 0);
__decorate([
    schema_1.type([Floor])
], Level.prototype, "floor", void 0);
exports.Level = Level;
class PacmanState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.players = new schema_1.MapSchema();
        this.level = new Level();
    }
}
__decorate([
    schema_1.type({ map: Player })
], PacmanState.prototype, "players", void 0);
__decorate([
    schema_1.type(Level)
], PacmanState.prototype, "level", void 0);
exports.PacmanState = PacmanState;
