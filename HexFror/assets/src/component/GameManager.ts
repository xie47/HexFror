import GameStyle from "./GameStyle";

export default class GameManager{

    public static Instance: GameManager = new GameManager();
    private constructor() {
    }

    private tileWide:number = 150;

    private tileHigh:number =140;

    private gameStyle: GameStyle[] = [];

    private jsonMap: Map<string, cc.JsonAsset> = new Map;

    private loadState = 0;

    getGameStyleAll(): GameStyle[] {
        return this.gameStyle;
    }

    getGameStyle(index) {
        return this.gameStyle[index];
    }

    calPosition(pos: cc.Vec2, scale): cc.Vec2 {
        let positon = new cc.Vec2();
        positon.x = (pos.x * this.tileWide  - pos.y * this.tileWide / 2) * scale;
        positon.y = (pos.y * this.tileHigh) * scale;
        return positon;
    }

    calPos(positon: cc.Vec2, scale): cc.Vec2 {
        let pos = new cc.Vec2();
        pos.y = positon.y / (this.tileHigh * scale) + 0.5 | 0;
        pos.x = (positon.x + pos.y * (this.tileWide * scale) / 2) / (this.tileWide * scale) + 0.5 | 0;
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
        let thiz = this;
        let array = ["Jsons/GameStyleConfig"];
        cc.loader.loadResArray(array, cc.JsonAsset, function (err, jsonArray) {
            if (err) {
                console.log(err);
                return;
            }
        
            for (let json of jsonArray) {
                thiz.jsonMap.set(json.json.type, json.json);
            }
            thiz.init();
            thiz.loadState = 2;
        });
    }

    load() {
        this.loadJson();
        
    }
    
}

export const GGameManager = GameManager.Instance;
