var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var AudioManager = (function () {
        function AudioManager() {
            this.pauseMusic = null;
            this.currentMusicName = "";
            this.sound = {};
            var sound = egret.localStorage.getItem(GameConfig.SOUND_NAME);
            if (sound) {
                if (parseInt(sound) == 1)
                    this._isPlaySound = true;
                else if (parseInt(sound) == 0)
                    this._isPlaySound = false;
            }
            else {
                this._isPlaySound = true;
                egret.localStorage.setItem(GameConfig.SOUND_NAME, "1");
            }
            var music = egret.localStorage.getItem(GameConfig.MUSIC_NAME);
            if (music) {
                if (parseInt(music) == 1)
                    this._isPlayMusic = true;
                else if (parseInt(music) == 2)
                    this._isPlayMusic = false;
            }
            else {
                this._isPlayMusic = true;
                egret.localStorage.setItem(GameConfig.MUSIC_NAME, "1");
            }
        }
        AudioManager.getInstance = function () {
            if (!this._audioManager)
                this._audioManager = new AudioManager();
            return this._audioManager;
        };
        /**
         * 背景音乐
         */
        AudioManager.prototype.playBackgroundMusic = function (muscName) {
            if (this.currentMusicName == muscName) {
                return;
            }
            this.currentMusicName = muscName;
            this.stopMusic();
            if (!this.isPlayMusic) {
                return;
            }
            if (this.backgroundMuiscChannel) {
                this.backgroundMuiscChannel.stop();
                this.backgroundMuisc = null;
            }
            if (!this.backgroundMuisc) {
                this.backgroundMuisc = this.getMusic(muscName);
                if (!this.backgroundMuisc) {
                    return;
                }
            }
            if (this.playBackgroundMusic) {
                this.backgroundMuiscChannel = this.backgroundMuisc.play(0);
            }
        };
        /**
         * 关闭首页背景
         * @param  {} muscName
         */
        AudioManager.prototype.closeBackgroundMusic = function () {
            if (this.backgroundMuiscChannel) {
                this.backgroundMuiscChannel.stop();
                this.backgroundMuisc = null;
            }
        };
        AudioManager.prototype.playMusic = function () {
            this.playBackgroundMusic(this.currentMusicName);
        };
        AudioManager.prototype.stopMusic = function () {
            this.closeBackgroundMusic();
        };
        /**
         * 获取音乐资源
         * @param  {} name
         */
        AudioManager.prototype.getMusic = function (name) {
            var data = GameCacheManager.instance.getCache(name);
            if (!data) {
                data = RES.getRes(this.currentMusicName);
                if (data) {
                    GameCacheManager.instance.setCache(name, data);
                }
            }
            return data;
        };
        AudioManager.prototype.playSound = function (url) {
            if (this._isPlaySound && GameConfig.IS_RUNNING) {
                // url += "_mp3";
                if (this.sound[url] && this.sound[url].sound) {
                    try {
                        this.sound[url].channel = this.sound[url].sound.play(0, 1);
                    }
                    catch (e) {
                        LogUtils.logI("playMusic 报错" + url);
                    }
                }
                else {
                    var sound = RES.getRes(url);
                    if (!sound) {
                        return;
                    }
                    if (sound) {
                        this.sound[url] = new SoundItem();
                        this.sound[url].sound = sound;
                    }
                    if (this.sound[url].sound) {
                        try {
                            this.sound[url].channel = this.sound[url].sound.play(0, 1);
                        }
                        catch (e) {
                            LogUtils.logI("播放出错");
                        }
                    }
                }
            }
        };
        AudioManager.prototype.playSoundAndLoop = function (url) {
            if (this._isPlaySound && GameConfig.IS_RUNNING) {
                // url += "_mp3";
                if (this.sound[url] && this.sound[url].sound) {
                    try {
                        this.sound[url].channel = this.sound[url].sound.play(0, -1);
                    }
                    catch (e) {
                        LogUtils.logI("playMusic 报错" + url);
                    }
                }
                else {
                    var sound = RES.getRes(url);
                    if (!sound) {
                        return;
                    }
                    if (sound) {
                        this.sound[url] = new SoundItem();
                        this.sound[url].sound = sound;
                    }
                    if (this.sound[url].sound) {
                        try {
                            this.sound[url].channel = this.sound[url].sound.play(0, -1);
                        }
                        catch (e) {
                            LogUtils.logI("播放出错");
                        }
                    }
                }
            }
        };
        AudioManager.prototype.stopSound = function (url) {
            // url += "_mp3";
            if (this.sound && this.sound[url]) {
                this.sound[url].channel.stop();
            }
        };
        Object.defineProperty(AudioManager.prototype, "isPlayMusic", {
            get: function () {
                return this._isPlayMusic;
            },
            set: function (value) {
                if (value) {
                    this._isPlayMusic = true;
                    var name_1 = this.currentMusicName;
                    this.currentMusicName = null;
                    this.playBackgroundMusic(name_1);
                    egret.localStorage.setItem(GameConfig.MUSIC_NAME, "1");
                }
                else {
                    this._isPlayMusic = false;
                    this.stopMusic();
                    egret.localStorage.setItem(GameConfig.MUSIC_NAME, "0");
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AudioManager.prototype, "isPlaySound", {
            get: function () {
                return this._isPlaySound;
            },
            set: function (value) {
                if (value) {
                    this._isPlaySound = true;
                    egret.localStorage.setItem(GameConfig.SOUND_NAME, "1");
                }
                else {
                    this._isPlaySound = false;
                    egret.localStorage.setItem(GameConfig.SOUND_NAME, "0");
                }
            },
            enumerable: true,
            configurable: true
        });
        return AudioManager;
    }());
    game.AudioManager = AudioManager;
    __reflect(AudioManager.prototype, "game.AudioManager");
    var SoundItem = (function () {
        function SoundItem() {
        }
        return SoundItem;
    }());
    __reflect(SoundItem.prototype, "SoundItem");
})(game || (game = {}));
