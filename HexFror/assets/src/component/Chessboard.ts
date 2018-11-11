
import StyleMap from "./StyleMap";
import { Battle } from "../battle/Battle";
import { BattleConst } from "../battle/BattleConst";
import ScoreFx from "../anim/ScoreFx";
import Tile from "./Tile";
import GameStyle from "./GameStyle";
import MainScene from "../MainScene";
import { GGameManager } from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Chessboard extends cc.Component {

    @property(cc.Node)
    private board: cc.Node = null;

    @property(cc.Sprite)
    private bg: cc.Sprite = null;

    @property(cc.Prefab)
    private tilePre: cc.Prefab = null;

    @property([StyleMap])
    private styleMapArray: StyleMap[] = [];

    private map: Tile[][] = null;

    private sideSize: number = 5;

    private battle: Battle = null;

    private bOver: boolean = false;

    private gameStyle: GameStyle = null;

    private mainScene: MainScene = null;

    onLoad() {
        GGameManager;
        this.battle = new Battle();
    }
    
    startGame (mainScene:MainScene, sideSize, style:GameStyle) {
        this.mainScene = mainScene;
        this.sideSize = sideSize;
        this.gameStyle = style;
        this.restartGame();
    }

    restartGame() {
        this.bOver = false;
        this.init();
    }

    
    private init() {
        this.battle.init(this.sideSize);
        this.bg.spriteFrame = this.gameStyle.bg;
        this.initMap();
        for (let styleMap of this.styleMapArray) {
            styleMap.init(this, this.gameStyle);
            this.changeStyleMap(styleMap);
        }
    }

    private initMap() {
        this.board.removeAllChildren();
        this.map = [];
        for (let x = 0; x < this.battle.map.length; x++) {
            this.map[x] = [];
            for (let y = 0; y < this.battle.map[x].length; y++) {
                if (this.battle.map[x][y] != BattleConst.BlockStatue.Nil) {
                    let tile = cc.instantiate(this.tilePre);
                    tile.getComponent(Tile).init(this.gameStyle, new cc.Vec2(x, y));
                    this.board.addChild(tile);
                    this.map[x][y] = tile.getComponent(Tile);
                }
            }
        }
    }

    changeStyleMap(styleMap: StyleMap) {
        styleMap.changeStyle(this.randStyleMap());
        this.verifyGameOver();
    }

    private randStyleMap() {
        let length = BattleConst.BlockStyleEnum.length;
        return Math.random() * (length - 1) | 0;
    }


    verifyGameOver() {
        for (let styleMap of this.styleMapArray) {
            if (this.battle.havePosAddStyle(styleMap.getStyle())) {
                return;
            }
        }
        this.mainScene.gameOver();
    }

    verifySet(tarWorldPos:cc.Vec2, style:number, color:cc.Color): boolean {
        if (this.bOver) {
            return false;
        }
        let canvasWorldPos = this.board.convertToWorldSpace(cc.v2(0,0));

        let position = cc.v2(tarWorldPos.x - canvasWorldPos.x, tarWorldPos.y - canvasWorldPos.y);

        let cenPos = GGameManager.calPos(position);
        let changeList = [];
        let score = this.battle.add(cenPos, style, changeList);
        if (score > 0) {
            for (let pos of changeList) {
                this.map[pos.x][pos.y].on(color);
            }
            this.addScore(position, score);
            this.verifyDel(position);
            return true;
        }
        return false;
    }
    
    private verifyDel(position: cc.Vec2) {
        let changeList = [];
        let score = this.battle.tryRemoveFull(changeList);
        
        if (score > 0) {
            this.addScore(position, score);
        }
        this.setBlockEmpty(changeList);
    }

    private setBlockEmpty(list: cc.Vec2[]) {
        for (let pos of list) {
            this.map[pos.x][pos.y].off();
        }
    }

    //----------------score-------------------
    @property(cc.Label)
    private curScoreNode: cc.Label = null;

    @property(cc.Prefab)
    private addScorePrefab: cc.Prefab = null;

    private poolAddScorePrefab: cc.NodePool = null;

    private addScore(pos: cc.Vec2, change) {
        this.curScoreNode.string = "" + this.battle.getScore();
        let preNode = this.getAddScorePrefab();
        preNode.init(this, change, pos);
    }

    private getAddScorePrefab(): ScoreFx {
        if (this.poolAddScorePrefab == null) {
            this.poolAddScorePrefab = new cc.NodePool();
        }
        let node = this.poolAddScorePrefab.get();
        if (node == null) {
            node = cc.instantiate(this.addScorePrefab);
        }
        this.board.addChild(node);
        return node.getComponent(ScoreFx);
    }

    public removeAddScorePrefab(node) {
        this.board.removeChild(node);
        this.poolAddScorePrefab.put(node);
    } 
    //---------------------------------------

    private preShowArray: cc.Vec2[] = [];
    private centerPos: cc.Vec2 = new cc.Vec2();
    preShow(tarWorldPos:cc.Vec2, style:number, color:cc.Color) {
        let canvasWorldPos = this.board.convertToWorldSpace(cc.v2(0,0));

        let position = cc.v2(tarWorldPos.x - canvasWorldPos.x, tarWorldPos.y - canvasWorldPos.y);

        let cenPos = GGameManager.calPos(position);

        if (cenPos.x == this.centerPos.x && cenPos.y == this.centerPos.y) {
            return;
        }
        this.centerPos = cenPos;
        this.preShowClear();
        if (this.battle.verifyAdd(cenPos, style)) {
            let blockList = BattleConst.getBlocksWithCenter(style, this.centerPos);
            for (let pos of blockList) {
                this.map[pos.x][pos.y].on(color);
                this.preShowArray.push(pos);
            }
        }
    }

    preShowClear() {
        this.setBlockEmpty(this.preShowArray);
        this.preShowArray = [];
    }
    //---------------------------------------
}
