import ColorStyle from "./GameStyleBoard";
import MainScene from "../MainScene";
import { GGameManager } from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStyleBoardList extends cc.Component {

    private game: MainScene = null;

    @property(cc.Prefab)
    private gameStyleBoardPre: cc.Prefab = null;

    @property(cc.Node)
    private canvas: cc.Node = null;

    onLoad() {
        GGameManager;
    }

    init(game:MainScene) {
        this.game = game;
        for (let style of GGameManager.gameStyle) {
            let node = cc.instantiate(this.gameStyleBoardPre);
            node.getComponent(ColorStyle).init(this.game, style);
            this.canvas.addChild(node);
        }
    }
}
