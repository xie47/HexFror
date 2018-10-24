

const {ccclass, property} = cc._decorator;

@ccclass
export default class Block extends cc.Component {


    @property(cc.Node)
    private mask: cc.Node = null;

    @property(cc.Node)
    private bg: cc.Node = null;

    //color 枚举 0灰色
    @property([cc.Color])
    private ColorEnum: cc.Color[] = [];

    //遮罩类型
    @property([cc.SpriteFrame])
    private MaskEnum: cc.SpriteFrame[] = [];

    @property
    private blockWide: number = 0;

    @property
    private blockHigh: number = 0;

    //是否填充
    private bFill: Boolean = false;

    private pos: cc.Vec2 = null;

    //填充颜色类型
    private colorType;

    init(pos: cc.Vec2, colorType: number, maskType: number) {
        this.mask.getComponent(cc.Mask).spriteFrame = this.MaskEnum[maskType];
        this.changeBGColor(colorType);
        this.changePos(pos);
        
    }

    changePos(pos) {
        this.pos = pos;
        this.node.setPosition(this.pos.x * this.blockWide - this.pos.y * this.blockWide / 2, this.pos.y * this.blockHigh);
    }

    changeBGColor(colorType) {
        if (colorType < 0 || colorType > this.ColorEnum.length) {
            colorType = 1;
        }
        this.colorType = colorType;
        this.bFill = colorType != 0;
        this.bg.color = this.ColorEnum[this.colorType];
    }

    delColor() {
        this.changeBGColor(0);
    }

    getColorType() {
        return this.colorType;
    }

    randColorType() {
        return (Math.random() * (this.ColorEnum.length - 1) | 0) + 1;
    }
}

