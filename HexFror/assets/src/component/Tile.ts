import GameStyle from "./GameStyle";



const {ccclass, property} = cc._decorator;

@ccclass
export default class Tile extends cc.Component {

    @property(cc.Sprite)
    tileOn: cc.Sprite = null;


    @property(cc.Sprite)
    tileOff: cc.Sprite = null;

    @property(cc.Sprite)
    light: cc.Sprite = null;


    init(gameStyle:GameStyle, position) {
        this.tileOn.spriteFrame = gameStyle.tileOn;
        this.tileOff.spriteFrame = gameStyle.tileOff;
        this.tileOff.node.color = gameStyle.offColor;
        this.light.spriteFrame = gameStyle.light;
        this.off();
        this.changePos(position);
    }

    off() { 
        this.tileOn.node.active = false;
        this.tileOff.node.active = true;
    }

    on(onColor) {
        this.tileOn.node.active = true;
        this.tileOff.node.active = false;
        this.tileOn.node.color = onColor;
    }

    changePos(position) {
        this.node.setPosition(position);
    }
}
