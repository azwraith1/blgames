var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManager = (function () {
    function SoundManager() {
        /**
         * 特效集合
         */
        this.effectList = [];
        /**
         * key value 形式
         */
        this.effectJsons = {};
        CF.aE(ENo.RUN_BACKEND, this.appPause, this);
        CF.aE(ENo.RUN_FORTEND, this.appResume, this);
    }
    Object.defineProperty(SoundManager.prototype, "musicVolume", {
        get: function () {
            return this._musicVolume;
        },
        set: function (value) {
            var beforeValue = this._musicVolume;
            this._musicVolume = value;
            egret.localStorage.setItem(GameConfig.SOUND_VOMULE, value + "");
            if (this.music && beforeValue == 0) {
                this.music.volume(value);
                var bg = this.musicSource;
                this.musicSource = null;
                this.playMusic(bg, true);
                return;
            }
            if (value == 1 && !this.music) {
                this.playMusic(this.musicSource, true);
            }
            else {
                this.music && this.music.volume(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "effectVolume", {
        get: function () {
            return this._effectVolume;
        },
        set: function (value) {
            this._effectVolume = value;
            egret.localStorage.setItem(GameConfig.EFFECT_VOMULE, value + "");
            for (var i = 0; i < this.effectList.length; i++) {
                this.effectList[i].volume(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    SoundManager.getInstance = function () {
        if (SoundManager.s_instance == null) {
            SoundManager.s_instance = new SoundManager();
            SoundManager.s_instance.init();
        }
        return SoundManager.s_instance;
    };
    SoundManager.prototype.init = function () {
        var sound = egret.localStorage.getItem(GameConfig.SOUND_VOMULE);
        if (sound) {
            if (parseInt(sound) == 1)
                this._musicVolume = 1;
            else if (parseInt(sound) == 0)
                this._musicVolume = 0;
        }
        else {
            this._musicVolume = 1;
            egret.localStorage.setItem(GameConfig.SOUND_VOMULE, "1");
        }
        var music = egret.localStorage.getItem(GameConfig.EFFECT_VOMULE);
        if (music) {
            if (parseInt(music) == 1)
                this._effectVolume = 1;
            else if (parseInt(music) == 0)
                this._effectVolume = 0;
        }
        else {
            this._effectVolume = 1;
            egret.localStorage.setItem(GameConfig.EFFECT_VOMULE, "1");
        }
    };
    /**
     * app暂停
     */
    SoundManager.prototype.appPause = function () {
        this._lastmusicVolume = this._musicVolume, this._lasteffectVolume = this._effectVolume;
        if (this._musicVolume != 0) {
            this.music && this.music.volume(0);
        }
        if (this._effectVolume != 0) {
            for (var i = 0; i < this.effectList.length; i++) {
                this.effectList[i].volume(0);
            }
        }
        this.stopAllEffects();
    };
    /**
     * app重新开始
     */
    SoundManager.prototype.appResume = function () {
        if (this._lastmusicVolume != 0) {
            this.musicVolume = this._lastmusicVolume;
            this._lastmusicVolume = 0;
        }
        if (this._lasteffectVolume != 0) {
            this.effectVolume = this._lasteffectVolume;
            this._lasteffectVolume = 0;
        }
    };
    /**
     * 播放声音
     * @param  {string} musicName
     * @param  {} loop=true
     */
    SoundManager.prototype.playMusic = function (musicName, loop) {
        var _this = this;
        if (loop === void 0) { loop = true; }
        if (!this._musicVolume || this._musicVolume == 0) {
            this.musicSource = musicName;
            return;
        }
        if (musicName) {
            if (this.musicSource == musicName && this.music) {
                return;
            }
            if (this.music) {
                this.music.stop(), this.music = null;
            }
            this.musicSource = musicName;
            this.musicLoop = loop;
            var musicRes = RES.getRes(musicName);
            if (musicRes) {
                this.music = new Howl({
                    src: [musicRes.url],
                    loop: loop,
                    volume: this._musicVolume
                });
                this.music.play();
            }
            else {
                RES.getResAsync(musicName, function (musicRes, t) {
                    _this.musicSource = null;
                    t == _this.musicSource && _this.playMusic(_this.musicSource, _this.musicLoop);
                }, this);
            }
            musicRes = null;
        }
    };
    SoundManager.prototype.stopMusic = function () {
        this.musicSource = null, this.music && (this.music.stop(), this.music = null);
    };
    SoundManager.prototype.pauseMusic = function () {
        if (this.music) {
            this.music.stop();
        }
    };
    SoundManager.prototype.remuseMusic = function () {
        if (this.music) {
            this.music.play();
        }
    };
    /**
     * 播放特效
     * @param  {} effectName
     * @param  {} loop
     * @param  {} volume
     */
    SoundManager.prototype.playEffect = function (effectName, loop, volume) {
        var _this = this;
        if (loop === void 0) { loop = false; }
        if (volume === void 0) { volume = this._effectVolume; }
        if (Global.runBack) {
            return;
        }
        if (!this._effectVolume || this._effectVolume == 0) {
            return;
        }
        var playVolue = !volume ? this._effectVolume : volume;
        var effectRes = RES.getRes(effectName);
        if (effectRes) {
            var holw_1 = new Howl({
                src: [effectRes.url],
                loop: loop,
                volume: playVolue,
                onload: function () {
                    for (var i = 0; i < _this.effectList.length; i++) {
                        if (_this.effectList[i] == holw_1) {
                            _this.effectList.splice(i, 1);
                        }
                    }
                    _this.effectList.push(holw_1);
                    _this.effectJsons[effectName] = holw_1;
                    holw_1.play();
                }
            });
        }
        else {
            RES.getResAsync(effectName, function (e, t) {
            }, this);
        }
    };
    /**
     * 停止所有特效
     */
    SoundManager.prototype.stopAllEffects = function () {
        for (; this.effectList.length;)
            this.effectList.shift().stop();
    };
    /**
     * 停止音效
     */
    SoundManager.prototype.stopEffectByName = function (effectName) {
        if (this.effectJsons[effectName]) {
            this.effectJsons[effectName].stop();
            delete this.effectJsons[effectName];
        }
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
