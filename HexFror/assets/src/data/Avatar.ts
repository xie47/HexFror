const {ccclass, property} = cc._decorator;

@ccclass
export default class Avatar {
    data = {
        UnionID:"",
        nickName:"",
        avatarUrl:"",
        gender:0,
        country:"",
        province:"",
        city:"",
        maxScore: 0,
        adCount: 0,
        shardCount: 0,
        lastActiveTime: 0,

        vip:0,
        gameStyle:0,
    }

    static localAvatar: Avatar = null;
    static getLocalAvatar():Avatar {
        if (this.localAvatar == null) {
            this.localAvatar = new Avatar("", "local", "", 0, "", "", "");
        }
        return this.localAvatar;
    }

    constructor(UnionID, nickName, avatarUrl, gender, country, province, city) {
        this.data.UnionID = UnionID;
        this.loadData();
        this.data.nickName = nickName;
        this.data.avatarUrl = avatarUrl;
        this.data.gender = gender;
        this.data.country = country;
        this.data.province = province;
        this.data.city = city;
        this.saveData();
    }
    
    private loadData() {
        this.data = JSON.parse(cc.sys.localStorage.getItem(this.data.UnionID));
    }

    private saveData() {
        cc.sys.localStorage.setItem(this.data.UnionID, JSON.stringify(this.data));
    }

    addAdCount() {
        this.data.adCount++;
        this.saveData();
    }

    addShardCount() {
        this.data.shardCount++;
        this.saveData();
    }

    newScore(score) {
        if (score > this.data.maxScore) {
            this.data.maxScore = score;
            this.saveData();
        }
    }

    changeGameStyle(style) {
        this.data.gameStyle = style;
        this.saveData();
    }
}