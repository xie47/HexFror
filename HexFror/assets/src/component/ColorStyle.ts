import { BlockConst } from "./BlockConst";
import Block from "./Block";
import MainScene from "../MainScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ColorStyle extends cc.Component {

    @property(cc.Node) 
    private canvas: cc.Node = null;

    @property(cc.Prefab)
    private blockPre: cc.Prefab = null;

    private colorType : number = 0;
    private maskType : number = 0;

    private blockPos = [new cc.Vec2(1,1), new cc.Vec2(0,0), new cc.Vec2(1,0), new cc.Vec2(2,1), new cc.Vec2(2,2), new cc.Vec2(1,2), new cc.Vec2(0,1)];

    private blockNodeArray: cc.Node[] = [];

    private game:MainScene = null;

    init(game:MainScene, colorType:number, maskType:number) {
        this.game = game;
        this.colorType = colorType;
        this.maskType = maskType;
        let colorArray = BlockConst.ColorEnum[this.colorType];
        for (let i = 0; i < colorArray.length && i < this.blockPos.length; i++) {
            this.blockNodeArray[i] = cc.instantiate(this.blockPre);
            let block = this.blockNodeArray[i].getComponent(Block);
            block.init(this.blockPos[i], this.maskType, colorArray[i]);
            this.canvas.addChild(this.blockNodeArray[i]);
        }
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchEnd(){
        this.game.changeStyle(this.colorType, this.maskType);
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd);
    }
}
