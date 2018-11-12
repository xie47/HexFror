import GameStyleBoardList from "./component/GameStyleBoardList";
import Chessboard from "./component/Chessboard";
import GameStyle from "./component/GameStyle";
import { GGameManager } from "./component/GameManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

    @property(Chessboard)
    private chessboard: Chessboard = null;

    @property(GameStyleBoardList)
    private gameStyleList:GameStyleBoardList = null;
    private gameStyleListInit = false;

    private curGameStyle: GameStyle;

    onLoad() {
        GGameManager.load();
    }

    showList() {
        if (!this.gameStyleListInit) {
            this.gameStyleList.init(this);
            this.gameStyleListInit = true;
        }
    }

    changeStyle(style) {
        this.curGameStyle = style;
    }

    startGame() {
        if (this.curGameStyle == null) {
            this.curGameStyle = GGameManager.getGameStyle(1);
        }
        this.chessboard.startGame(this, 6, this.curGameStyle);
    }

    
    //--------------gameOver-------------------
    gameOver() {
        this.showGameOverNode();
    }

    @property(cc.Node)
    private gameOverNode: cc.Node = null;

    private showGameOverNode() {
        this.gameOverNode.active = true;
    }

    private hideGameOverNode() {
        this.gameOverNode.active = false;
    }

    //---------------------------------------
}
