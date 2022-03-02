"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacManGame = void 0;
const colyseus_1 = require("colyseus");
const PacmanState_1 = require("./PacmanState");
const levels_1 = __importDefault(require("./levels"));
const ROUND_DURATION = 60 * 3;
// const ROUND_DURATION = 30;
// const MAX_BLOCK_HEIGHT = 5;
const MAX_BLOCK_HEIGHT = 19;
class PacManGame extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this.currentHeight = 0;
        this.isFinished = false;
    }
    onCreate(options) {
        this.setState(new PacmanState_1.PacmanState());
        // set-up the game!
        this.setUp();
        this.onMessage("message", (client, position) => {
        });
    }
    setUp() {
        // console.log(level)
        const { walls, floor, pellets, powerPellets } = levels_1.default;
        this.state.level = new PacmanState_1.Level({
            walls: walls.forEach(wall => new PacmanState_1.Wall(wall)),
            floor: floor.forEach(f => new PacmanState_1.Wall(f)),
            pellets: pellets.forEach(p => new PacmanState_1.Pellet(p)),
            powerPellets: powerPellets.forEach(pp => new PacmanState_1.Pellet(pp))
        });
    }
    onJoin(client, options) {
        const newPlayer = new PacmanState_1.Player().assign({
            name: options.userData.displayName || "Anonymous",
        });
        this.state.players.set(client.sessionId, newPlayer);
        this.onMessage('location', (client, transform) => {
            const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ } = transform;
            const player = this.state.players.get(client.sessionId);
            player.positionX = positionX;
            player.positionY = positionY;
            player.positionZ = positionZ;
            player.rotationX = rotationX;
            player.rotationY = rotationY;
            player.rotationZ = rotationZ;
            // client.send('updatePlayerLocation',{
            //   playerId: client.sessionId,
            //   positionX,
            //   positionY, 
            //   positionZ
            // })
        });
        // console.log(newPlayer.name, "joined! => ", options.userData);
    }
    onLeave(client, consented) {
        const player = this.state.players.get(client.sessionId);
        console.log(player.name, "left!");
        this.state.players.delete(client.sessionId);
    }
    onDispose() {
        console.log("Disposing room...");
    }
}
exports.PacManGame = PacManGame;
