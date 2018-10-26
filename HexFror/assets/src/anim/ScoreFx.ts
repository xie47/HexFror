import Game from "../component/Game";
import ScoreAnim from "./ScoreAnim";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ScoreFx extends cc.Component {

    @property(ScoreAnim)
    private anim: ScoreAnim = null;
 
    @property(cc.Label)
    private scoreLable: cc.Label = null;

    private game : Game = null;

    init(game, score: number, pos: cc.Vec2) {
        this.node.setPosition(pos);
        this.game = game;
        this.scoreLable.string = "+" + score;
        this.anim.init(this);
    }

    onPlayEnd() {
        this.game.removeAddScorePrefab(this.node);
    }
}
