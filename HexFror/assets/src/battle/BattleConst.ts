import { Logger } from "../log/Logger";

export class BattleConst {
    static BlockStatue = cc.Enum({
        Nil : 1,
        Empty : 2,
        Fill: 3,
    });

    static MapSideSizeMin = 3;

    static StyleBlockMax = 4;
    static BlockStyleEnum = [
        [new cc.Vec2(0,0)], 

        [new cc.Vec2(0,0), new cc.Vec2(1,0), new cc.Vec2(2,0), new cc.Vec2(3,0)], 
        [new cc.Vec2(0,0), new cc.Vec2(1,0), new cc.Vec2(2,0), new cc.Vec2(1,1)], 
        [new cc.Vec2(0,0), new cc.Vec2(1,0), new cc.Vec2(2,0), new cc.Vec2(2,1)], 
        [new cc.Vec2(0,1), new cc.Vec2(1,1), new cc.Vec2(2,1), new cc.Vec2(1,0)], 
        [new cc.Vec2(0,1), new cc.Vec2(1,1), new cc.Vec2(2,1), new cc.Vec2(0,0)], 

        [new cc.Vec2(0,0), new cc.Vec2(0,1), new cc.Vec2(0,2), new cc.Vec2(0,3)], 
        [new cc.Vec2(0,0), new cc.Vec2(0,1), new cc.Vec2(0,2), new cc.Vec2(1,1)], 
        [new cc.Vec2(0,0), new cc.Vec2(0,1), new cc.Vec2(0,2), new cc.Vec2(1,2)], 
        [new cc.Vec2(1,0), new cc.Vec2(1,1), new cc.Vec2(1,2), new cc.Vec2(0,1)], 
        [new cc.Vec2(1,0), new cc.Vec2(1,1), new cc.Vec2(1,2), new cc.Vec2(0,0)], 


        [new cc.Vec2(0,0), new cc.Vec2(1,1), new cc.Vec2(2,2), new cc.Vec2(3,3)], 
        [new cc.Vec2(0,0), new cc.Vec2(1,1), new cc.Vec2(2,2), new cc.Vec2(0,1)], 
        [new cc.Vec2(0,0), new cc.Vec2(1,1), new cc.Vec2(2,2), new cc.Vec2(2,1)], 
        [new cc.Vec2(0,0), new cc.Vec2(1,1), new cc.Vec2(2,2), new cc.Vec2(1,2)], 
        [new cc.Vec2(0,0), new cc.Vec2(1,1), new cc.Vec2(2,2), new cc.Vec2(1,0)],  

        [new cc.Vec2(0,0), new cc.Vec2(0,1), new cc.Vec2(1,0), new cc.Vec2(1,1)], 
        [new cc.Vec2(0,0), new cc.Vec2(0,1), new cc.Vec2(1,1), new cc.Vec2(1,2)], 
        [new cc.Vec2(0,0), new cc.Vec2(1,0), new cc.Vec2(1,1), new cc.Vec2(2,1)],
        
        [new cc.Vec2(0,0), new cc.Vec2(2,0), new cc.Vec2(1,1), new cc.Vec2(2,1)],
        [new cc.Vec2(0,1), new cc.Vec2(2,1), new cc.Vec2(0,0), new cc.Vec2(1,0)],
        [new cc.Vec2(0,0), new cc.Vec2(0,2), new cc.Vec2(1,1), new cc.Vec2(1,2)],
        [new cc.Vec2(1,0), new cc.Vec2(1,2), new cc.Vec2(0,0), new cc.Vec2(0,1)],
        [new cc.Vec2(0,0), new cc.Vec2(2,2), new cc.Vec2(0,1), new cc.Vec2(1,2)],
        [new cc.Vec2(0,0), new cc.Vec2(2,2), new cc.Vec2(1,0), new cc.Vec2(2,1)]
    ];

    static getBlocks(blockStyle: number): cc.Vec2[] {
        if (blockStyle >= this.BlockStyleEnum.length) {
            Logger.error("[BattleConst.getBlocks] blockStyle=%d", blockStyle);
            return [];
        }
        return this.BlockStyleEnum[blockStyle];
    }

    static ActionType = cc.Enum({
        Init : 1,
        Add : 2,

    });
}   