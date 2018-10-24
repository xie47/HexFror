import Block from "./Block";
import Game from "./Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BlockExample extends cc.Component{

    static MapEnum = [
        [new cc.Vec2(0,0)], 

        [new cc.Vec2(0,0), new cc.Vec2(1,0), new cc.Vec2(2,0), new cc.Vec2(3,0)], 
        [new cc.Vec2(0,0), new cc.Vec2(1,0), new cc.Vec2(2,0), new cc.Vec2(1,1)], 
        [new cc.Vec2(0,0), new cc.Vec2(1,0), new cc.Vec2(2,0), new cc.Vec2(2,1)], 
        [new cc.Vec2(0,1), new cc.Vec2(1,1), new cc.Vec2(2,1), new cc.Vec2(1,0)], 
        [new cc.Vec2(0,1), new cc.Vec2(1,1), new cc.Vec2(2,1), new cc.Vec2(0,0)], 

        [new cc.Vec2(0,0), new cc.Vec2(0,1), new cc.Vec2(0,2), new cc.Vec2(0,3)], 
        [new cc.Vec2(0,0), new cc.Vec2(0,1), new cc.Vec2(0,2), new cc.Vec2(1,1)], 
        [new cc.Vec2(0,0), new cc.Vec2(0,1), new cc.Vec2(0,2), new cc.Vec2(1,2)], 
        [new cc.Vec2(1,0), new cc.Vec2(1,1), new cc.Vec2(1,2), new cc.Vec2(0,1)], 
        [new cc.Vec2(1,0), new cc.Vec2(1,1), new cc.Vec2(1,2), new cc.Vec2(0,0)], 


        [new cc.Vec2(0,0), new cc.Vec2(1,1), new cc.Vec2(2,2), new cc.Vec2(3,3)], 
        [new cc.Vec2(0,0), new cc.Vec2(1,1), new cc.Vec2(2,2), new cc.Vec2(0,1)], 
        [new cc.Vec2(0,0), new cc.Vec2(1,1), new cc.Vec2(2,2), new cc.Vec2(2,1)], 
        [new cc.Vec2(0,0), new cc.Vec2(1,1), new cc.Vec2(2,2), new cc.Vec2(1,2)], 
        [new cc.Vec2(0,0), new cc.Vec2(1,1), new cc.Vec2(2,2), new cc.Vec2(1,0)],  

        [new cc.Vec2(0,0), new cc.Vec2(0,1), new cc.Vec2(1,0), new cc.Vec2(1,1)], 
        [new cc.Vec2(0,0), new cc.Vec2(0,1), new cc.Vec2(1,1), new cc.Vec2(1,2)], 
        [new cc.Vec2(0,0), new cc.Vec2(1,0), new cc.Vec2(1,1), new cc.Vec2(2,1)]
    ];

    static BlockMax = 4;

    @property(cc.Node) 
    private game: cc.Node = null;

    @property(cc.Node) 
    private canvas: cc.Node = null;

    @property(cc.Prefab)
    private blockPre: cc.Prefab = null;

    @property
    private mapType: number = 0;

    @property
    private scale: number = 0.8;

    private blockArray: cc.Node[] = [];

    private colorType: number = 0;

    private lastEventPos: cc.Vec2 = null;


    onLoad() {
        for (let i = 0; i < BlockExample.BlockMax; i++) {
            this.blockArray[i] = cc.instantiate(this.blockPre);
        }
        this.updateExample();
        this.updateScale(this.scale);

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private updateExample() {
        this.canvas.removeAllChildren();
        for (let index = 0; index < BlockExample.MapEnum[this.mapType].length; ++index) {
            let block = this.blockArray[index].getComponent(Block);
            if (index == 0) {
                this.colorType = block.randColorType()
            }
            block.init(BlockExample.MapEnum[this.mapType][index], this.colorType, 0);
            this.canvas.addChild(this.blockArray[index]);
        }
    }

    reset() {
        this.mapType = Math.random() * (BlockExample.MapEnum.length - 1) | 0;
        this.updateExample();
    }

    getMap() {
        return BlockExample.MapEnum[this.mapType];
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchBegin(event: cc.Event.EventTouch) {
        this.updateScale(1);
        this.lastEventPos = event.getLocation();
    }

    onTouchMove(event: cc.Event.EventTouch) {
        this.node.setPosition(this.node.position.x + event.getLocation().x - this.lastEventPos.x, this.node.position.y + event.getLocation().y - this.lastEventPos.y);
        this.lastEventPos = event.getLocation();
    }
    
    onTouchEnd(event: cc.Event.EventTouch) {
        let addOk = this.game.getComponent(Game).verifySet(this.node, BlockExample.MapEnum[this.mapType], this.colorType);
        this.updateScale(this.scale);
        this.node.setPosition(0,0);
        if (addOk) {
            this.reset();
        }
    }

    updateScale(scale) {
        this.canvas.scaleX = scale;
        this.canvas.scaleY = scale;
    }
}
