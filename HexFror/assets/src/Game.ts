import Block from "./Block";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    private 

    @property(cc.Node)
    private canvas: cc.Node = null;

    @property(cc.Prefab)
    private blockPre: cc.Prefab = null;

    @property
    private sideLength: number = 3;

    @property
    private blockWide: number = 0;

    @property
    private blockHigh: number = 0;

    private mapSize: number = 0;

    private map: cc.Node[][] = null;

    private blockStatueMap: number[][] = null;

    private BlockStatue = cc.Enum({
        Nil : 1,
        Empty : 2,
        Fill: 3,
    });

    onLoad() {
        this.init(this.sideLength);
    }

    init(size: number) {
        this.initMap(size);
    }

    private initMap(size) {
        if (size < 1) {
            size = 1;
        }
        this.sideLength = size;
        this.mapSize = this.sideLength * 2 - 1;
        this.map = [];
        this.blockStatueMap = [];
        for (let x = 0; x < this.mapSize; x++) {
            this.map[x] = [];
            this.blockStatueMap[x] = [];
            for (let y = 0; y < this.mapSize; y++) {
                if (y+this.sideLength > x && x+this.sideLength > y) {
                    let block = cc.instantiate(this.blockPre);
                    block.getComponent(Block).init(new cc.Vec2(x, y),0, 0);
                    this.canvas.addChild(block);
                    this.map[x][y] = block;

                    this.blockStatueMap[x][y] = this.BlockStatue.Empty;
                }
                else {
                    this.blockStatueMap[x][y] = this.BlockStatue.Nil;
                }
            }
        }
    }

    start () {

    }

    verifySet(node: cc.Node, blockList: cc.Vec2[], colorType): boolean {
        let tarPos = node.convertToWorldSpace(cc.v2(0,0));
        let cenPos = this.canvas.convertToWorldSpace(cc.v2(0,0));

        let fromY = (tarPos.y - cenPos.y) / this.blockHigh + 0.5 | 0;

        let fromX = (tarPos.x - cenPos.x + fromY * this.blockWide / 2) / this.blockWide + 0.5 | 0;
        if (!this.addBlockVerify(fromX, fromY, blockList)) {
            return false;
        }
        this.addBlock(fromX, fromY, blockList, colorType);
        this.verifyDel();
        return true;
    }

    private addBlockVerify(fromX, fromY, blockList: cc.Vec2[]): boolean {
        for (let pos of blockList) {
            let x = fromX + pos.x;
            let y = fromY + pos.y;
            if (this.blockStatueMap[x][y] != this.BlockStatue.Empty) {
                return false;
            }
        }
        return true;
    }

    private addBlock(fromX, fromY, blockList: cc.Vec2[], colorType) {
        for (let pos of blockList) {
            let x = fromX + pos.x;
            let y = fromY + pos.y;
            this.blockStatueMap[x][y] = this.BlockStatue.Fill;
            this.map[x][y].getComponent(Block).changeBGColor(colorType);
        }
    }
    
    verifyDel(): number {
        let bOk: boolean;
        let delX = [];
        for (let x = 0; x < this.mapSize; x++) {
            bOk = true;
            for (let y = 0; y < this.mapSize; y++) {
                if (this.blockStatueMap[x][y] == this.BlockStatue.Empty) {
                    bOk = false;
                    break;
                }
            }
            if (bOk) {
                delX.push(x);
            }
        }
        
        let delY = [];
        for (let y = 0; y < this.mapSize; y++) {
            bOk = true;
            for (let x = 0; x < this.mapSize; x++) {
                if (this.blockStatueMap[x][y] == this.BlockStatue.Empty) {
                    bOk = false;
                    break;
                }
            }
            if (bOk) {
                delY.push(y);
            }
        }

        let delXZ = [];
        for (let x = 0; x < this.sideLength; x++) {
            bOk = true;
            for (let y = 0; x+y < this.mapSize; y++) {
                if (this.blockStatueMap[x+y][y] == this.BlockStatue.Empty) {
                    bOk = false;
                    break;
                }
            }
            if (bOk) {
                delXZ.push(x);
            }
        }
        let delYZ = [];
        for (let y = 0; y < this.sideLength; y++) {
            bOk = true;
            for (let x = 0; x+y < this.mapSize; x++) {
                if (this.blockStatueMap[x][x+y] == this.BlockStatue.Empty) {
                    bOk = false;
                    break;
                }
            }
            if (bOk) {
                delYZ.push(y);
            }
        }

        for (let x of delX) {
            for (let y = 0; y < this.mapSize; y++) {
                this.setBlockEmpty(x, y);
            }
        }
        for (let y of delY) {
            for (let x = 0; x < this.mapSize; x++) {
                this.setBlockEmpty(x, y);
            }
        }
        for (let x of delXZ) {
            for (let y = 0; x+y < this.mapSize; y++) {
                this.setBlockEmpty(x, y);
            }
        }
        for (let y of delYZ) {
            for (let x = 0; x+y < this.mapSize; x++) {
                this.setBlockEmpty(x, y);
            }
        }
        return delX.length + delY.length + delXZ.length + delYZ.length;
    }
    
    private setBlockEmpty(x, y): boolean{
        if (this.blockStatueMap[x][y] == this.BlockStatue.Fill) {
            this.blockStatueMap[x][y] = this.BlockStatue.Empty;
            this.map[x][y].getComponent(Block).delColor();
            return true;
        }
        return false;
    }


}
