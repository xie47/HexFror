
import Tile from "./Tile";
import GameStyle from "./GameStyle";
import GameStyleView from "./GameStyleView";

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

    private gameStyleView: GameStyleView = null;
    private gameStyle : GameStyle;

    init(gameStyleView:GameStyleView, style:GameStyle) {
        this.gameStyleView = gameStyleView;
        this.gameStyle = style;
        this.bg.spriteFrame = this.gameStyle.bg;
        
        this.board.removeAllChildren();
        for (let i = 0; i < this.tilePos.length; i++) {
            this.tileNodeArray[i] = cc.instantiate(this.tilePre);
            let tile = this.tileNodeArray[i].getComponent(Tile);
            tile.init(this.gameStyle, this.tilePos[i], 1);
            if (i > 0 && i <= this.gameStyle.colorArray.length) {
                tile.on(this.gameStyle.colorArray[i-1]);
            }
            this.board.addChild(this.tileNodeArray[i]);
        }
        if (gameStyleView != null) {
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        }
    }

    onTouchEnd(){
        this.gameStyleView.changeGameStyle(this.gameStyle);
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd);
    }
}
