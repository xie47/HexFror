import ColorList from "./component/ColorList";
import Chessboard from "./component/Chessboard";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

    @property(Chessboard)
    private chessboard: Chessboard = null;

    @property(ColorList)
    private colorList:ColorList = null;

    private curColorStyle: number = 0;
    private curMaskIndex: number = 0;

    onLoad() {
        this.colorList.init(this);
    }

    showList() {
        
    }

    changeStyle(color, mask) {
        this.curColorStyle = color;
        this.curMaskIndex = mask;
    }

    startGame() {
        this.chessboard.startGame(6, this.curMaskIndex, this.curColorStyle);
    }
}
