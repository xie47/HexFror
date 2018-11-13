
import Game from "./component/Game";
import GameStyle from "./component/GameStyle";
import { GGameManager } from "./component/GameManager";
import GameStyleView from "./component/GameStyleView";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

    @property(Game)
    private game: Game = null;

    @property(GameStyleView)
    private gameStyleView:GameStyleView = null;
    private gameStyleViewInit = false;

    private curGameStyle: GameStyle;

    @property(cc.Node)
    private mainView: cc.Node = null;
    @property(cc.Node)
    private gameView: cc.Node = null;
    @property(cc.Node)
    private styleView: cc.Node = null;
    @property(cc.Node)
    private rankView: cc.Node = null;
    @property(cc.Node)
    private systemView: cc.Node = null;


    onLoad() {
        GGameManager.load();
        this.showMainView();
    }

    changeStyle(style) {
        this.curGameStyle = style;
    }

    private startGame() {
        this.game.startGame(this, 5, this.getCurGameStyle());
    }

    getCurGameStyle() {
        if (this.curGameStyle == null) {
            this.curGameStyle = GGameManager.getGameStyle(1);
        }
        return this.curGameStyle;
    }

    private closeAllView() {
        this.mainView.active = false;
        this.gameView.active = false;
        this.styleView.active = false;
        this.rankView.active = false;
        this.systemView.active = false;
    }

    showMainView() {
        this.closeAllView();
        this.mainView.active = true;
    }

    showGameView() {
        this.closeAllView();
        this.gameView.active = true;

        this.startGame();
    }

    showStyleView() {
        this.closeAllView();
        this.styleView.active = true;
        
        if (!this.gameStyleViewInit) {
            this.gameStyleView.init(this);
            this.gameStyleViewInit = true;
        }
    }

    showRankView() {
        this.closeAllView();
        this.rankView.active = true;
    }

    showSystemView() {
        this.closeAllView();
        this.systemView.active = true;
    }
}
