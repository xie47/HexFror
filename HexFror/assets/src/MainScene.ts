
import Game from "./component/Game";
import GameStyle from "./component/GameStyle";
import { GGameManager } from "./component/GameManager";
import GameStyleView from "./component/GameStyleView";
import GameStyleBoard from "./component/GameStyleBoard";
import Login from "./component/Login";
import Avatar from "./data/Avatar";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

    @property(Game)
    private game: Game = null;

    @property(GameStyleView)
    private gameStyleView:GameStyleView = null;
    private gameStyleViewInit = false;

    @property(cc.Node) 
    private loginView: cc.Node = null;
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

    @property(GameStyleBoard)
    private gameStyleBoard: GameStyleBoard = null;


    private avatar:Avatar = null;

    onLoad() {
        GGameManager.load(this);
        this.showLoginView();
    }

    onLoadOk() {
        //this.gameStyleBoard.init(null, this.getCurGameStyle());
    }

    changeStyle(style) {
        this.avatar.changeGameStyle(style.id);
        this.gameStyleBoard.init(null, this.getCurGameStyle());
    }

    private startGame() {
        this.game.startGame(this, 5, this.getCurGameStyle());
    }

    getCurGameStyle() {
        let curGameStyle = GGameManager.getGameStyle(this.avatar.data.gameStyle);
        if (curGameStyle == null) {
            this.avatar.changeGameStyle(1);
            curGameStyle = GGameManager.getGameStyle(this.avatar.data.gameStyle);
        } 
        return curGameStyle;
    }

    private closeAllView() {
        this.mainView.active = false;
        this.gameView.active = false;
        this.styleView.active = false;
        this.rankView.active = false;
        this.systemView.active = false;
        this.loginView.active = false;
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

    showLoginView() {
        this.closeAllView();
        this.loginView.active = true;
        this.loginView.getComponent(Login).show(this);
    }

    initAvatar(UnionID, nickName, avatarUrl, gender, country, province, city) {
        this.avatar = new Avatar(UnionID, nickName, avatarUrl, gender, country, province, city);
    }

    useLocalAvatar() {
        this.avatar = Avatar.getLocalAvatar();
    }
}
