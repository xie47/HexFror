import GameStyle from "./GameStyle";
import { GGameManager } from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Tile extends cc.Component {

    @property(cc.Sprite)
    tileOn: cc.Sprite = null;


    @property(cc.Sprite)
    tileOff: cc.Sprite = null;

    @property(cc.Sprite)
    light: cc.Sprite = null;

    scale: number


    init(gameStyle:GameStyle, pos, scale) {
        this.scale = scale;
        this.tileOn.spriteFrame = gameStyle.tileOn;
        this.tileOff.spriteFrame = gameStyle.tileOff;
        this.tileOff.node.color = gameStyle.offColor;
        this.light.spriteFrame = gameStyle.light;
        this.off();
        this.changePos(pos);
        this.node.scale = scale;
    }

    off() { 
        this.light.node.active = false;
        this.tileOn.node.active = false;
        this.tileOff.node.active = true;
    }

    on(onColor) {
        this.light.node.active = true;
        this.tileOn.node.active = true;
        this.tileOff.node.active = false;
        this.tileOn.node.color = onColor;
    }

    changePos(pos) {
        this.node.setPosition(GGameManager.calPosition(pos, this.scale));
    }
}
