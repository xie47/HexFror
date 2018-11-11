import GameStyle from "./GameStyle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager{

    public static Instance: GameManager = new GameManager();
    private constructor() {
    }

    tileWide:number = 140;

    tileHigh:number = 155;

    gameStyle: GameStyle[] = [];

    jsonMap: Map<string, cc.JsonAsset> = new Map;

    loadState = 0;

    calPosition(pos: cc.Vec2): cc.Vec2 {
        let positon = new cc.Vec2();
        positon.x = pos.x * this.tileWide  - pos.y * this.tileWide / 2;
        positon.y = pos.y * this.tileHigh;
        return positon;
    }

    calPos(positon: cc.Vec2): cc.Vec2 {
        let pos = new cc.Vec2();
        pos.y = positon.y / this.tileHigh + 0.5 | 0;
        pos.x = (positon.x + pos.y * this.tileWide / 2) / this.tileWide + 0.5 | 0;
        return pos;
    }

    private init() {
        this.jsonMap;
        for (let json of this.jsonMap.get("GameStyleConfig")["data"]) {
            let style = new GameStyle();
            style.init(json);
            this.gameStyle[style.id] = style;
        }
    }

    private loadJson() {
        this.loadState = 1;
        let array = ["Jsons/GameStyleConfig"];
        cc.loader.loadResArray(array, cc.JsonAsset, function (err, jsonArray) {
            if (err) {
                console.log(err);
                return;
            }
        
            for (let json of jsonArray) {
                GGameManager.jsonMap.set(json.json.type, json.json);
            }
            GGameManager.init();
            GGameManager.loadState = 2;
        });
    }

    load() {
        this.loadJson();
        
    }
}

export const GGameManager = GameManager.Instance;
