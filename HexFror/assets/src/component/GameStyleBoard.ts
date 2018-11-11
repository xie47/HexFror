
import MainScene from "../MainScene";
import Tile from "./Tile";
import GameStyle from "./GameStyle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStyleBoard extends cc.Component {

    @property(cc.Sprite)
    private bg: cc.Sprite = null;

    @property(cc.Node) 
    private board: cc.Node = null;

    @property(cc.Prefab)
    private tilePre: cc.Prefab = null;

    private tilePos = [new cc.Vec2(1,1), new cc.Vec2(0,0), new cc.Vec2(1,0), new cc.Vec2(2,1), new cc.Vec2(2,2), new cc.Vec2(1,2), new cc.Vec2(0,1)];

    private tileNodeArray: cc.Node[] = [];

    private game:MainScene = null;
    private gameStyle : GameStyle;

    init(game:MainScene, style:GameStyle) {
        this.game = game;
        this.gameStyle = style;
        this.bg.spriteFrame = this.gameStyle.bg;
        for (let i = 0; i < this.tilePos.length; i++) {
            this.tileNodeArray[i] = cc.instantiate(this.tilePre);
            let tile = this.tileNodeArray[i].getComponent(Tile);
            tile.init(this.gameStyle, this.tilePos[i]);
            if (i > 0 && i <= this.gameStyle.colorArray.length) {
                tile.on(this.gameStyle.colorArray[i-1]);
            }
            this.board.addChild(this.tileNodeArray[i]);
        }
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchEnd(){
        this.game.changeStyle(this.gameStyle);
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd);
    }
}
