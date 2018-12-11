import { Logger } from "../log/Logger";
import MainScene from "../MainScene";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Login extends cc.Component{

    private mainView:MainScene = null;
    show(mainView:MainScene) {
        this.mainView = mainView;
        this.wxGetSetting();
    }

    onLoad() {
        this.wxCreateUserInfoButton();
    }

    private wxGetSetting() {
        var thiz = this;
        window.wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    Logger.debug("用户授权已授权 下一步 获取用户信息");
                    thiz.wxGetUserInfo();
                }
            },
        })
    }

    private wxGetUserInfo() {
        var thiz = this;
        window.wx.getUserInfo({
            withCredentials:false,
            lang:"zh_CN",
            success(res) {
                Logger.debug("获取用户信息 下一步 开始游戏");
                thiz.onGetUserInfoSuccess(res.userInfo);
            },
        })
    }

    private onGetUserInfoSuccess(info) {
        this.mainView.initAvatar(info.nickName, info.nickName, info.avatarUrl, info.gender, info.country, info.province, info.city);
        this.mainView.showGameView();
    }

    private wxCreateUserInfoButton() {
        let systemInfo =  window.wx.getSystemInfoSync();
        let width = systemInfo.windowWidth;
        let height = systemInfo.windowHeight;
        let button = window.wx.createUserInfoButton({
            type: 'text',
            text: '授权登录',
            style: {
                left: width * 0.33,
                top: height * 0.81,
                width: width * 0.13,
                height: height * 0.1,
                lineHeight: 40,
                backgroundColor: '#eeeeee',
                color: '#000000',
                textAlign: 'center',
                fontSize: 10,
                borderRadius: 3
            }
        });

        let thiz = this;

        button.onTap((res) => {
            Logger.debug("onTap get res=" + res);
            switch(res.errMsg) {
                case 'getUserInfo:ok': 
                    thiz.onGetUserInfoSuccess(res.userInfo);
            }
        });
    }
    

    localAvatar() {
        this.mainView.showGameView();
    }
}