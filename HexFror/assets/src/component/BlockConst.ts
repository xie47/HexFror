export class BlockConst {
    static Wide: 46;
    static High: 42;

    static MaskEnum = [
        [new cc.SpriteFrame("assets\\res\\image\\shadow.png")]
    ];

    static ColorEnum = [
        [
            new cc.Color(52, 84, 107, 255), 
            new cc.Color(252, 244, 233, 255), 
            new cc.Color(243, 207, 209, 255), 
            new cc.Color(98, 169, 199, 255), 
            new cc.Color(170, 209, 226, 255), 
            new cc.Color(229, 229, 241, 255)
        ]
    ];

    static calPosition(pos: cc.Vec2): cc.Vec2 {
        return new cc.Vec2(pos.x * BlockConst.Wide  - pos.y * BlockConst.Wide / 2, pos.y * BlockConst.High);
    }

    static calPos(positon: cc.Vec2): cc.Vec2 {
        let pos = new cc.Vec2();
        pos.y = positon.y / BlockConst.High + 0.5 | 0;
        pos.x = (positon.x + pos.y * BlockConst.Wide / 2) / BlockConst.Wide + 0.5 | 0;
        return pos;
    }
}