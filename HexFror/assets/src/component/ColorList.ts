import { BlockConst } from "./BlockConst";
import ColorStyle from "./ColorStyle";
import MainScene from "../MainScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ColorList extends cc.Component {

    private game: MainScene = null;

    @property(cc.Prefab)
    private colorStylePre: cc.Prefab = null;

    
    @property(cc.Node)
    private canvas: cc.Node = null;

    onLoad() {
        for (let i = 0; i < BlockConst.ColorEnum.length; ++i) {
            let node = cc.instantiate(this.colorStylePre);
            node.getComponent(ColorStyle).init(this.game, i, 0);
            this.canvas.addChild(node);
        }
    }

    init(game:MainScene) {
        this.game = game;
    }
}
