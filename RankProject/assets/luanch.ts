import AvatarRank from "./AvatarRank";

const {ccclass, property} = cc._decorator;

@ccclass
export default class luanch extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    start () {
        let _self = this;

        wx.onMessage( data => {
            console.log(data.message);
        });

        // https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.getUserInfo.html
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            lang: 'zh_CN',
            success: (res) => {
                console.log('success', res.data);
                let userInfo = res.data[0];
                _self.createUserBlock(userInfo);
            },
            fail: (res) => {
                reject(res);
            }
        });
        
        // https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.getFriendCloudStorage.html
        wx.getFriendCloudStorage({
            success: function (res) {
                for (let i = 0; i < 6; i++) {
                    let friendInfo = res.data[i];
                    if (!friendInfo) {
                        _self.createPrefab();
                        continue;
                    }
                    _self.createUserBlock(friendInfo);
                }
            },
            fail: function (res) {
                console.error(res);
            }
        });
    }

    createUserBlock (user) {
        let avatarRank = this.createPrefab().getComponent(AvatarRank);

        avatarRank.labRank.string = "" + 0;
        // getUserInfo will return the nickName, getFriendCloudStorage will return the nickname.
        avatarRank.labName.string = user.nickName ? user.nickName : user.nickname;
        avatarRank.labScore.string = "" + 0;
        cc.loader.load({
            url: user.avatarUrl, type: 'png'
        }, (err, texture) => {
            if (err) console.error(err);
            avatarRank.icon.spriteFrame = new cc.SpriteFrame(texture);
        });
    }

    createPrefab () {
        let node = cc.instantiate(this.prefab);
        node.parent = this.content;
        return node;
    }

    onLoad() {
        wx.onMessage(data => {
            if(data.message == "rankMain"){ //主场景
                cc.director.loadScene("rankMain");
            }else if(data.message == "friendRank"){ //好友排行榜
                cc.director.loadScene("friendRank");
            }else if(data.message == "fiveRank"){ //5人排行榜
                cc.director.loadScene("fiveRank");
            }else{ 
                var str = data.message.substr(0,9);
                if(str == "groupRank"){ //群排行榜(这里将群的shareTicket加在"groupRank"后一起传过来)
                    common.groupShareTicket = data.message.substr(9, data.message.length - 9);
                    cc.director.loadScene("groupRank");
                }
            }
        });
    }
}
