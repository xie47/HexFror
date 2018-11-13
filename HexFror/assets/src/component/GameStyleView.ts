import ColorStyle from "./GameStyleBoard";
import MainScene from "../MainScene";
import { GGameManager } from "./GameManager";
import GameStyle from "./GameStyle";
import GameStyleBoard from "./GameStyleBoard";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStyleView extends cc.Component {

    private game: MainScene = null;

    @property(cc.Prefab)
    private gameStyleBoardPre: cc.Prefab = null;

    @property(cc.Node)
    private listContent: cc.Node = null;

    @property(GameStyleBoard)
    private tmpGameStyle:GameStyleBoard = null;

    init(game:MainScene) {
        this.game = game;
        let list = GGameManager.getGameStyleAll();
        for (let style of list) {
            if (style instanceof GameStyle) {
                let node = cc.instantiate(this.gameStyleBoardPre);
                node.getComponent(ColorStyle).init(this, style);
                this.listContent.addChild(node);
            }
        }
        this.initGameStyle();
    }

    changeGameStyle(gameStyle) {
        this.game.changeStyle(gameStyle);
        this.initGameStyle();
    }

    private initGameStyle() {
        this.tmpGameStyle.init(null, this.game.getCurGameStyle());
    }

}
