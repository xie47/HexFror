import Block from "./Block";
import { BattleConst } from "../battle/BattleConst";
import Chessboard from "./Chessboard";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StyleMap extends cc.Component{

    @property(cc.Node) 
    private canvas: cc.Node = null;

    @property(cc.Prefab)
    private blockPre: cc.Prefab = null;

    @property
    private style: number = 0;

    @property
    private scale: number = 0.8;

    private chessboard: Chessboard = null;
    private blockArray: cc.Node[] = [];

    private color: cc.Color;
    private maskType: number = 0;

    private lastEventPos: cc.Vec2 = null;


    init(chessboard: Chessboard) {
        this.chessboard = chessboard;
        for (let i = 0; i < BattleConst.StyleBlockMax; i++) {
            this.blockArray[i] = cc.instantiate(this.blockPre);
        }
        this.updateScale(this.scale);
        this.addEvent();
    }

    changeStyle(style:number, maskType:number, color: cc.Color) {
        this.style = style;
        this.color = color;
        this.maskType = maskType;

        this.canvas.removeAllChildren();

        let list = BattleConst.getBlocks(this.style);
        for (let index = 0; index < list.length; ++index) {
            let block = this.blockArray[index].getComponent(Block);
            block.init(list[index], this.maskType, this.color);
            this.canvas.addChild(this.blockArray[index]);
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
        this.canvas.scaleX = scale;
        this.canvas.scaleY = scale;
    }
}
