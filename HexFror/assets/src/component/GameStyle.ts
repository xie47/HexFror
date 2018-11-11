const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStyle {
    id: number = 0;
    bg: cc.SpriteFrame = null;
    
    tileOn: cc.SpriteFrame = null;
    tileOff: cc.SpriteFrame = null;
    light: cc.SpriteFrame = null;

    offColor: cc.Color = null;
    colorArray: cc.Color[] = [];

    randColor():cc.Color {
        let length = this.colorArray.length;
        let rand = 1 + (Math.random() * (length - 1) | 0);
        return this.colorArray[rand];
    }

    init(json) {
        this.id = json.ID;
        let _this = this; 
        cc.loader.loadRes(json.bg, cc.SpriteFrame, function(err,spriteFrame){
            _this.bg = spriteFrame;
　　　　 });
        cc.loader.loadRes(json.tile, cc.SpriteFrame, function(err,spriteFrame){ 
            _this.tileOff = new cc.SpriteFrame(spriteFrame, new cc.Rect(0, 0, 140, 155));
            _this.tileOn = new cc.SpriteFrame(spriteFrame, new cc.Rect(140, 0, 140, 155));
　　　　 });
        cc.loader.loadRes(json.light, cc.SpriteFrame, function(err,spriteFrame){ 
            _this.light = spriteFrame;
　　　　 });
        this.offColor = this.createColor(json.color0);
        this.colorArray.push(this.createColor(json.color1));
        this.colorArray.push(this.createColor(json.color2));
        this.colorArray.push(this.createColor(json.color3));
        this.colorArray.push(this.createColor(json.color4));
        this.colorArray.push(this.createColor(json.color5));
    }

    createColor(hexStr) {
        let color = new cc.Color();
        color.fromHEX(hexStr);
        return color;
    }
}