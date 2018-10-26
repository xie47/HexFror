import { BlockConst } from "./BlockConst";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Block extends cc.Component {
    @property(cc.Mask)
    private mask1: cc.Mask = null;
    
    @property(cc.Mask)
    private mask2: cc.Mask = null;

    @property(cc.Node)
    private bg: cc.Node = null;

    private pos: cc.Vec2 = null;
    private maskType: number = 0;
    private color: cc.Color = null;

    //填充颜色类型
    private colorType;

    init(pos: cc.Vec2, maskType: number, color: cc.Color) {
        this.maskType = maskType;

        /*if (BlockConst.MaskEnum[maskType][0] != null) {
            this.mask1.spriteFrame = BlockConst.MaskEnum[maskType][0];
        }
        if (BlockConst.MaskEnum[maskType][1] != null) {
            this.mask2.spriteFrame = BlockConst.MaskEnum[maskType][1];
        }
        */
        this.changePos(pos);
        this.changeBGColor(color);
    }

    changePos(pos) {
        this.pos = pos;
        this.node.setPosition(BlockConst.calPosition(pos));
    }

    changeBGColor(color) {
        this.color = color;
        this.bg.color = color;
    }
}

