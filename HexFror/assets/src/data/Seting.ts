class Seting {

    public static readonly Instance: Seting = new Seting();

    static VolumeEffectMax: number = 1;
    private data = {
        // 特效音乐音量 0-1
        volumeEffect: 1,
    
        // 背景音乐音量 0-1
        volumeBGSound: 1,
    }


    private constructor() {
        this.load();
    }

    getVolumeEffect() {
        return this.data.volumeEffect;
    }

    getVolumeBGSound() {
        return this.data.volumeBGSound;
    }

    setVolumeEffect(num) {
        if (num > Seting.VolumeEffectMax || num < 0) {
            return;
        }
        this.data.volumeEffect = num;
        this.save();
    }

    setVolumeBGSound(num) {
        if (num > Seting.VolumeEffectMax || num < 0) {
            return;
        }
        this.data.volumeBGSound = num;
        this.save();
    }

    private save() {
        cc.sys.localStorage.setItem('Seting', JSON.stringify(this.data));
    }

    private load() {
        let json: string = cc.sys.localStorage.getItem('Seting');
        if (json == null || json.length == 0) {
            return;
        }
        this.data = JSON.parse(json);
    }
}

export const GSeting = Seting.Instance;