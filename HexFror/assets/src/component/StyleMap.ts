import Block from "./Block";
import Game from "./Game";
import { BattleConst } from "../battle/BattleConst";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StyleMap extends cc.Component{
    @property(cc.Node) 
    private game: Game = null;

    @property(cc.Node) 
    private canvas: cc.Node = null;

    @property(cc.Prefab)
    private blockPre: cc.Prefab = null;

    @property
    private style: number = 0;

    @property
    private scale: number = 0.8;

    private blockArray: cc.Node[] = [];

    private color: cc.Color;
    private maskType: number = 0;

    private lastEventPos: cc.Vec2 = null;


    onLoad() {
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
    }
    
    private onTouchEnd(event: cc.Event.EventTouch) {
        //node.convertToWorldSpace(cc.v2(0,0));
        let addOk = this.game.getComponent(Game).verifySet(this.node.convertToWorldSpace(cc.v2(0,0)), this.getStyle(), this.getColor());
        this.updateScale(this.scale);
        this.node.setPosition(0,0);
    }

    //-----------------------------------------------------------------------------
    updateScale(scale) {
        this.canvas.scaleX = scale;
        this.canvas.scaleY = scale;
    }
}
