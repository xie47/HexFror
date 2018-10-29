import { Logger } from "../log/Logger";
import { BattleConst } from "./BattleConst";

export class Battle {
    private mapSize = 0;
    private sideSize = 0;

    map: number[][] = null;
    private score = 0;


    init(sideSize: number) {
        if (sideSize < BattleConst.MapSideSizeMin) {
            Logger.info("[Battle.init] sideSize=%d, MapSideSizeMin=%d", sideSize, BattleConst.MapSideSizeMin);
            sideSize = BattleConst.MapSideSizeMin;
        } 
        this.sideSize = sideSize;
        this.mapSize = this.sideSize * 2 - 1;
        this.resetMap();

        this.addAction(new Action(BattleConst.ActionType.Init, this.sideSize, cc.v2(0, 0)));
    }

    private resetMap() {
        this.map = [];
        for (let x = 0; x < this.mapSize; x++) {
            this.map[x] = [];
            for (let y = 0; y < this.mapSize; y++) {
                if (y+this.sideSize > x && x+this.sideSize > y) {
                    this.map[x][y] = BattleConst.BlockStatue.Empty;
                }
                else {
                    this.map[x][y] = BattleConst.BlockStatue.Nil;
                }
            }
        }
    }

    public havePosAddStyle(blockStyle: number): boolean {
        for (let x = 0; x < this.mapSize; x++) {
            for (let y = 0; y < this.mapSize; y++) {
                if (this.isPosBlockEmpty(x, y) && this.verifyAdd(cc.v2(x,y), blockStyle)) {
                    return true;
                }
            }
        }
        return  false;
    }

    public verifyAdd(center: cc.Vec2, blockStyle: number): boolean {
        let blockList = BattleConst.getBlocksWithCenter(blockStyle, center);
        for (let pos of blockList) {
            if (!this.isPosBlockEmpty(pos.x, pos.y)) {
                return false;
            }
        }
        return true;
    }

    public add(center: cc.Vec2, blockStyle: number, changeList: cc.Vec2[]): number {
        let addScore = 0;
        if (!this.verifyAdd(center, blockStyle)) {
            return addScore;
        }

        let blockNum = 0;
        this.addAction(new Action(BattleConst.ActionType.Add, blockStyle, center));

        let blockList = BattleConst.getBlocksWithCenter(blockStyle, center);
        for (let pos of blockList) {
            if (this.setBlockFill(pos.x, pos.y, changeList)) {
                blockNum++;
            }
        }
        addScore = blockNum * 10;
        this.changeScore(addScore);
        return addScore;
    }

    public tryRemoveFull(removeList: cc.Vec2[]): number {
        let listX = this.getXFull();
        let listY = this.getYFull();
        let listZX = this.getZXFull();
        let listZY = this.getZYFull();

        let addScore =0
        let count = listX.length + listY.length + listZX.length + listZY.length;
        if (count == 0) {
            return addScore;
        }

        let blockNum = 0;
        blockNum += this.removeX(listX, removeList);
        blockNum += this.removeY(listY, removeList);
        blockNum += this.removeZX(listZX, removeList);
        blockNum += this.removeZY(listZY, removeList);

        addScore = blockNum * 10 * count;
        this.changeScore(addScore);
        return addScore;
    }

    //--------------------------------------------------------------------------
    public getXFull(): number[] {
        let list = [];
        let bOk: boolean;
        for (let x = 0; x < this.mapSize; x++) {
            bOk = true;
            for (let y = 0; y < this.mapSize; y++) {
                if (this.isPosBlockEmpty(x,y)) {
                    bOk = false;
                    break;
                }
            }
            if (bOk) {
                list.push(x);
            }
        }
        return list;
    }

    public getYFull(): number[] {
        let list = [];
        let bOk: boolean;
        for (let y = 0; y < this.mapSize; y++) {
            bOk = true;
            for (let x = 0; x < this.mapSize; x++) {
                if (this.isPosBlockEmpty(x,y)) {
                    bOk = false;
                    break;
                }
            }
            if (bOk) {
                list.push(y);
            }
        }
        return list;
    }

    public getZXFull(): number[] {
        let list = [];
        let bOk: boolean;
        for (let x = 0; x < this.sideSize; x++) {
            bOk = true;
            for (let y = 0; x+y < this.mapSize; y++) {
                if (this.isPosBlockEmpty(x + y,y)) {
                    bOk = false;
                    break;
                }
            }
            if (bOk) {
                list.push(x);
            }
        }
        return list;
    }

    public getZYFull(): number[] {
        let list = [];
        let bOk: boolean;
        for (let y = 0; y < this.sideSize; y++) {
            bOk = true;
            for (let x = 0; x+y < this.mapSize; x++) {
                if (this.isPosBlockEmpty(x, x + y)) {
                    bOk = false;
                    break;
                }
            }
            if (bOk) {
                list.push(y);
            }
        }
        return list;
    }
    //--------------------------------------------------------------------------
    public removeX(list: number[], removeList: cc.Vec2[]): number {
        let removeNum = 0;
        for (let x of list) {
            for (let y = 0; y < this.mapSize; y++) {
                if(this.setBlockEmpty(x, y, removeList)) {
                    removeNum++;
                }
            }
        }
        return removeNum;
    }

    public removeY(list: number[], removeList: cc.Vec2[]): number {
        let removeNum = 0;
        for (let y of list) {
            for (let x = 0; x < this.mapSize; x++) {
                if(this.setBlockEmpty(x, y, removeList)) {
                    removeNum++;
                }
            }
        }
        return removeNum;
    }

    public removeZX(list: number[], removeList: cc.Vec2[]): number {
        let removeNum = 0;
        for (let x of list) {
            for (let y = 0; x+y < this.mapSize; y++) {
                if(this.setBlockEmpty(x + y, y, removeList)) {
                    removeNum++;
                }
            }
        }
        return removeNum;
    }

    public removeZY(list: number[], removeList: cc.Vec2[]): number {
        let removeNum = 0;
        for (let y of list) {
            for (let x = 0; x+y < this.mapSize; x++) {
                if(this.setBlockEmpty(x, x + y, removeList)) {
                    removeNum++;
                }
            }
        }
        return removeNum;
    }
    //--------------------------------------------------------------------------
    private setBlockEmpty(x, y, changeList: cc.Vec2[]): boolean {
        if (this.isPosValid(x, y)) {
            if (this.map[x][y] == BattleConst.BlockStatue.Fill) {
                this.map[x][y] = BattleConst.BlockStatue.Empty;
                changeList.push(cc.v2(x, y));
                return true;
            }
        }
        return false;
    }

    private isPosValid(x, y): boolean {
        if (x < 0 || x > this.mapSize || y < 0 || y > this.mapSize) {
            return false;
        } 
        return y+this.sideSize > x && x+this.sideSize > y;
    }

    private setBlockFill(x, y, changeList: cc.Vec2[]): boolean {
        if (this.isPosValid(x, y)) {
            if (this.map[x][y] == BattleConst.BlockStatue.Empty) {
                this.map[x][y] = BattleConst.BlockStatue.Fill;
                changeList.push(cc.v2(x, y));
                return true;
            }
        }
        Logger.error("[Battle.setBlockFill] x=%d y=%d", x, y);
        return false;
    }

    private isPosBlockEmpty(x,y): boolean {
        if (this.isPosValid(x, y)) {
            return this.map[x][y] == BattleConst.BlockStatue.Empty;
        }
        return false;
    }
    //--------------------------------------------------------------------------
    private changeScore(score) {
        this.score += score;
    }

    getScore(): number{
        return this.score;
    }
    //--------------------------------------------------------------------------

    private actionList = [];
    private addAction(action: Action) {
        this.actionList.push(action);
    }

    getFightLog(): string {
        return JSON.stringify(this.actionList);
    }
    //--------------------------------------------------------------------------
}

class Action {
    type: number;
    style: number;
    pos: cc.Vec2;

    constructor(type: number, style: number, pos: cc.Vec2) {
        this.type = type;
        this.style = style;
        this.pos = pos;
    }
}