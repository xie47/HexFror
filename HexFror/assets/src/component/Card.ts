import { BattleConst } from "../battle/BattleConst";
import Game from "./Game";
import Tile from "./Tile";
import GameStyle from "./GameStyle"; 

const {ccclass, property} = cc._decorator;

@ccclass
export default class Card extends cc.Component{

    @property(cc.Node) 
    private board: cc.Node = null;

    @property(cc.Node) 
    private cardNode: cc.Node = null;

    @property(cc.Node) 
    private lockNode: cc.Node = null;

    @property(cc.Node) 
    private touchNode: cc.Node = null;

    @property(cc.Prefab)
    private TilePre: cc.Prefab = null;

    @property
    private scale: number = 0.8;

    private style: number = 0;

    private game: Game = null;
    private tileArray: cc.Node[] = [];

    private color: cc.Color;

    private lastEventPos: cc.Vec2 = null;

    private gameStyle:GameStyle = null;

    private bLock = false;


    init(game: Game, gameStyle:GameStyle) {
        this.game = game;
        this.gameStyle = gameStyle;
        for (let i = 0; i < BattleConst.StyleBlockMax; i++) {
            this.tileArray[i] = cc.instantiate(this.TilePre);
            let tile = this.tileArray[i].getComponent(Tile);
            tile.init(gameStyle, cc.v2(), this.game.tileScale);
        }
        this.updateScale(this.scale);
        this.addEvent();
    }

    changeStyle(style:number) {
        this.style = style;
        this.color = this.gameStyle.randColor();

        this.board.removeAllChildren();

        let list = BattleConst.getBlocks(this.style);
        for (let index = 0; index < list.length; ++index) {
            let tile = this.tileArray[index].getComponent(Tile);
            tile.changePos(list[index]);
            tile.on(this.color);
            this.board.addChild(this.tileArray[index]);
        }
    }

    updateLock(bLock) {
        this.bLock = bLock;
        this.lockNode.active = bLock;
    }

    isLock() {
        return this.bLock;
    }

    getStyle(): number {
        return this.style;
    }
    getColor(): cc.Color {
        return this.color;
    }

    onDestroy() {
        this.removeEvent();
    }
    //-----------------------------------------------------------------------------
    private addEvent() {
        this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private removeEvent() {
        this.touchNode.off(cc.Node.EventType.TOUCH_START, this.onTouchBegin);
        this.touchNode.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove);
        this.touchNode.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd);
    }

    private onTouchBegin(event: cc.Event.EventTouch) {
        this.updateScale(1);
        this.lastEventPos = event.getLocation();
    }

    private onTouchMove(event: cc.Event.EventTouch) {
        this.cardNode.setPosition(this.cardNode.position.x + event.getLocation().x - this.lastEventPos.x, this.cardNode.position.y + event.getLocation().y - this.lastEventPos.y);
        this.lastEventPos = event.getLocation();
        this.game.preShow(this.board.convertToWorldSpace(cc.v2(0,0)), this.getStyle(), this.getColor());
    }
    
    private onTouchEnd(event: cc.Event.EventTouch) {
        this.game.preShowClear();
        let addOk = this.game.verifySet(this.board.convertToWorldSpace(cc.v2(0,0)), this.getStyle(), this.getColor());
        this.cardNode.setPosition(0,0);
        this.updateScale(this.scale);
        if (addOk) {
            this.refreshStyle();
        }
    }

    private refreshStyle() {
        this.game.resetCard(this);
        this.game.verifyGameOver();
    }

    //-----------------------------------------------------------------------------
    updateScale(scale) {
        this.board.scaleX = scale;
        this.board.scaleY = scale;
    }
}
