
const {ccclass, property} = cc._decorator;

@ccclass
export default class AvatarRank extends cc.Component {

    @property(cc.Label) 
    labRank : cc.Label = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Label) 
    labName : cc.Label = null;
    
    @property(cc.Label) 
    labScore : cc.Label = null;
}
