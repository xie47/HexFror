
import StyleMap from "./StyleMap";
import Block from "./Block";
import { Battle } from "../battle/Battle";
import { BattleConst } from "../battle/BattleConst";
import ScoreFx from "../anim/ScoreFx";
import { BlockConst } from "./BlockConst";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Chessboard extends cc.Component {

    @property(cc.Node)
    private canvas: cc.Node = null;

    @property(cc.Prefab)
    private blockPre: cc.Prefab = null;

    @property([StyleMap])
    private styleMapArray: StyleMap[] = [];

    private map: Block[][] = null;

    @property
    private sideSize:number = 6;

    private battle: Battle = null;

    private bOver: boolean = false;

    private colorType: number = 0;
    private maskType: number = 0;
    private colorArray: cc.Color[] = null;

    onLoad() {
        this.battle = new Battle();
    }

    private init() {
        this.colorArray = BlockConst.ColorEnum[this.colorType];
        this.battle.init(this.sideSize);
        this.initMap();
        for (let styleMap of this.styleMapArray) {
            styleMap.init(this);
            this.changeStyleMap(styleMap);
        }
    }

    changeStyleMap(styleMap: StyleMap) {
        styleMap.changeStyle(this.randStyleMap(), this.maskType, this.randColor());
        this.verifyGameOver();
    }

    private randStyleMap() {
        let length = BattleConst.BlockStyleEnum.length;
        return Math.random() * (length - 1) | 0;
    }

    private randColor() : cc.Color {
        let length = this.colorArray.length;
        let rand = 1 + (Math.random() * (length - 2) | 0);
        return this.colorArray[rand];
    }

    private defaultColor() {
        return this.colorArray[0];
    }

    private initMap() {
        this.canvas.removeAllChildren();
        this.map = [];
        for (let x = 0; x < this.battle.map.length; x++) {
            this.map[x] = [];
            for (let y = 0; y < this.battle.map[x].length; y++) {
                if (this.battle.map[x][y] != BattleConst.BlockStatue.Nil) {
                    let block = cc.instantiate(this.blockPre);
                    block.getComponent(Block).init(new cc.Vec2(x, y), 0, this.defaultColor());
                    this.canvas.addChild(block);
                    this.map[x][y] = block.getComponent(Block);
                }
            }
        }
    }

    startGame (sideSize, maskType, colorType) {
        this.sideSize = sideSize;
        this.maskType = maskType;
        this.colorType = colorType;
        this.restartGame();
    }

    restartGame() {
        this.bOver = false;
        this.init();
    }

    verifyGameOver() {
        for (let styleMap of this.styleMapArray) {
            if (this.battle.havePosAddStyle(styleMap.getStyle())) {
                return;
            }
        }
        this.gameOver();
    }

    private gameOver() {
        this.showGameOverNode();
    }

    verifySet(tarWorldPos:cc.Vec2, style:number, color:cc.Color): boolean {
        if (this.bOver) {
            return false;
        }
        let canvasWorldPos = this.canvas.convertToWorldSpace(cc.v2(0,0));

        let position = cc.v2(tarWorldPos.x - canvasWorldPos.x, tarWorldPos.y - canvasWorldPos.y);

        let cenPos = BlockConst.calPos(position);
        let changeList = [];
        let score = this.battle.add(cenPos, style, changeList);
        if (score > 0) {
            for (let pos of changeList) {
                this.map[pos.x][pos.y].changeBGColor(color);
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
            this.map[pos.x][pos.y].changeBGColor(this.defaultColor());
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
        this.canvas.addChild(node);
        return node.getComponent(ScoreFx);
    }

    public removeAddScorePrefab(node) {
        this.canvas.removeChild(node);
        this.poolAddScorePrefab.put(node);
    } 
    //---------------------------------------

    //--------------gameOver-------------------
    @property(cc.Node)
    private gameOverNode: cc.Node = null;

    private showGameOverNode() {
        this.gameOverNode.active = true;
    }

    private hideGameOverNode() {
        this.gameOverNode.active = false;
    }

    //---------------------------------------
    private preShowArray: cc.Vec2[] = [];
    private centerPos: cc.Vec2 = new cc.Vec2();
    preShow(tarWorldPos:cc.Vec2, style:number, color:cc.Color) {
        let canvasWorldPos = this.canvas.convertToWorldSpace(cc.v2(0,0));

        let position = cc.v2(tarWorldPos.x - canvasWorldPos.x, tarWorldPos.y - canvasWorldPos.y);

        let cenPos = BlockConst.calPos(position);

        if (cenPos.x == this.centerPos.x && cenPos.y == this.centerPos.y) {
            return;
        }
        this.centerPos = cenPos;
        this.preShowClear();
        if (this.battle.verifyAdd(cenPos, style)) {
            let blockList = BattleConst.getBlocksWithCenter(style, this.centerPos);
            for (let pos of blockList) {
                this.map[pos.x][pos.y].changeBGColor(color);
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
