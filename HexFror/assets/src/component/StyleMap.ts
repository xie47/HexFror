
import { BattleConst } from "../battle/BattleConst";
import Chessboard from "./Chessboard";
import Tile from "./Tile";
import GameStyle from "./GameStyle"; 

const {ccclass, property} = cc._decorator;

@ccclass
export default class StyleMap extends cc.Component{

    @property(cc.Node) 
    private board: cc.Node = null;

    @property(cc.Prefab)
    private TilePre: cc.Prefab = null;

    @property
    private style: number = 0;

    @property
    private scale: number = 0.8;

    private chessboard: Chessboard = null;
    private tileArray: cc.Node[] = [];

    private color: cc.Color;

    private lastEventPos: cc.Vec2 = null;

    private gameStyle:GameStyle = null


    init(chessboard: Chessboard, gameStyle:GameStyle) {
        this.chessboard = chessboard;
        this.gameStyle = gameStyle;
        for (let i = 0; i < BattleConst.StyleBlockMax; i++) {
            this.tileArray[i] = cc.instantiate(this.TilePre);
            let tile = this.tileArray[i].getComponent(Tile);
            tile.init(gameStyle, cc.v2());
        }
        this.updateScale(this.scale);
        this.addEvent();
    }

    changeStyle(style:number) {
        this.style = style;
        this.color = this.gameStyle.randColor();

        this.board.removeAllChildren();

        let list = BattleConst.getBlocks(this.style);
        for (let index = 0; index < list.length; ++index) {
            let tile = this.tileArray[index].getComponent(Tile);
            tile.changePos(list[index]);
            tile.on(this.color);
            this.board.addChild(this.tileArray[index]);
        }
    }

    getStyle(): number {
        return this.style;
    }
    getColor(): cc.Color {
        return this.color;
    }

    onDestroy() {
        this.removeEvent();
    }
    //-----------------------------------------------------------------------------
    private addEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private removeEvent() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchBegin);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd);
    }

    private onTouchBegin(event: cc.Event.EventTouch) {
        this.updateScale(1);
        this.lastEventPos = event.getLocation();
    }

    private onTouchMove(event: cc.Event.EventTouch) {
        this.node.setPosition(this.node.position.x + event.getLocation().x - this.lastEventPos.x, this.node.position.y + event.getLocation().y - this.lastEventPos.y);
        this.lastEventPos = event.getLocation();
        this.chessboard.preShow(this.node.convertToWorldSpace(cc.v2(0,0)), this.getStyle(), this.getColor());
    }
    
    private onTouchEnd(event: cc.Event.EventTouch) {
        //node.convertToWorldSpace(cc.v2(0,0));
        this.chessboard.preShowClear();
        let addOk = this.chessboard.verifySet(this.node.convertToWorldSpace(cc.v2(0,0)), this.getStyle(), this.getColor());
        this.node.setPosition(0,0);
        this.updateScale(this.scale);
        if (addOk) {
            this.chessboard.changeStyleMap(this);
        }
    }

    //-----------------------------------------------------------------------------
    updateScale(scale) {
        this.board.scaleX = scale;
        this.board.scaleY = scale;
    }
}
