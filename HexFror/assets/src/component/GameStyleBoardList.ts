import ColorStyle from "./GameStyleBoard";
import MainScene from "../MainScene";
import { GGameManager } from "./GameManager";
import GameStyle from "./GameStyle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStyleBoardList extends cc.Component {

    private game: MainScene = null;

    @property(cc.Prefab)
    private gameStyleBoardPre: cc.Prefab = null;

    @property(cc.Node)
    private canvas: cc.Node = null;

    init(game:MainScene) {
        this.game = game;
        let list = GGameManager.getGameStyleAll();
        for (let style of list) {
            if (style instanceof GameStyle) {
                let node = cc.instantiate(this.gameStyleBoardPre);
                node.getComponent(ColorStyle).init(this.game, style);
                this.canvas.addChild(node);
            }
        }
    }
}
