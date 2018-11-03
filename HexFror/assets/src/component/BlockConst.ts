
export class BlockConst {
    static Wide:number = 46;
    static High:number = 42;

    static MaskEnum = [
        //[new cc.SpriteFrame("assets\\res\\image\\shadow.png")]
    ];

    static ColorEnum = [
        [
            new cc.Color(84, 84, 84, 255), 
            new cc.Color(52, 84, 107, 255), 
            new cc.Color(252, 244, 233, 255), 
            new cc.Color(243, 207, 209, 255), 
            new cc.Color(98, 169, 199, 255), 
            new cc.Color(170, 209, 226, 255), 
            new cc.Color(229, 229, 241, 255)
        ],
        [
            new cc.Color(84, 84, 84, 255), 
            new cc.Color(179, 226, 245, 255), 
            new cc.Color(207, 238, 233, 255), 
            new cc.Color(250, 221, 248, 255), 
            new cc.Color(255, 245, 216, 255), 
            new cc.Color(103, 171, 192, 255), 
            new cc.Color(237, 210, 225, 255)
        ],
        [
            new cc.Color(84, 84, 84, 255), 
            new cc.Color(44, 110, 114, 255), 
            new cc.Color(26, 175, 155, 255), 
            new cc.Color(243, 181, 186, 255), 
            new cc.Color(187, 146, 168, 255), 
            new cc.Color(95, 61, 93, 255), 
            new cc.Color(32, 118, 80, 255)
        ]
    ];

    static calPosition(pos: cc.Vec2): cc.Vec2 {
        let positon = new cc.Vec2();
        positon.x = pos.x * BlockConst.Wide  - pos.y * BlockConst.Wide / 2;
        positon.y = pos.y * BlockConst.High;
        return positon;
    }

    static calPos(positon: cc.Vec2): cc.Vec2 {
        let pos = new cc.Vec2();
        pos.y = positon.y / BlockConst.High + 0.5 | 0;
        pos.x = (positon.x + pos.y * BlockConst.Wide / 2) / BlockConst.Wide + 0.5 | 0;
        return pos;
    }
}

