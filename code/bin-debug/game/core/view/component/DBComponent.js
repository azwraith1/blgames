var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var DBComponent = (function (_super) {
    __extends(DBComponent, _super);
    function DBComponent(dbName, autoPos) {
        if (autoPos === void 0) { autoPos = true; }
        var _this = _super.call(this) || this;
        _this.autoPos = true;
        _this.autoPos = autoPos;
        _this.dnName = dbName;
        _this.createDb();
        return _this;
    }
    DBComponent.prototype.resetPosition = function () {
        if (this.armature) {
            this.armature.x = this.width / 2;
            this.armature.y = this.height / 2;
        }
    };
    DBComponent.prototype.onAddedCall = function () {
        if (!this.autoPos) {
            return;
        }
        if (this.armature) {
            this.width = this.armature.width;
            this.height = this.armature.height;
        }
        else {
            LogUtils.logD("res ---" + this.dnName + "---  not found 404");
        }
    };
    DBComponent.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.onAddedCall();
    };
    DBComponent.prototype.createDb = function () {
        var armature = DBFactory.instance.getDBAsync1(this.dnName);
        if (armature) {
            this.armature = armature;
            this.addChild(armature);
            this.armature.touchEnabled = false;
            this.armature.addEventListener(egret.Event.COMPLETE, this.completeCall, this);
        }
    };
    DBComponent.prototype.completeCall = function () {
        if (this.callback) {
            this.callback();
            return;
        }
        this.stop();
        game.UIUtils.removeSelf(this);
        GameCacheManager.instance.setCache(this.dnName, this);
    };
    DBComponent.prototype.play = function (name, times) {
        if (name === void 0) { name = "default"; }
        try {
            this.currentName = name;
            this.visible = true;
            this.armature.animation.play(name, times);
        }
        catch (e) {
        }
    };
    DBComponent.prototype.play1 = function (name, times) {
        if (name === void 0) { name = "default"; }
        if (this.armature) {
            this.currentName = name;
            this.visible = true;
            this.armature.animation.play(name, times);
        }
    };
    DBComponent.prototype.gotoAndStop = function (name, frame) {
        if (name === void 0) { name = "default"; }
        if (this.armature) {
            this.currentName = name;
            this.visible = true;
            this.armature.animation.gotoAndStop(name, 1);
        }
    };
    DBComponent.prototype.playByFilename = function (times) {
        if (this.armature) {
            this.currentName = this.dnName;
            this.visible = true;
            this.armature.animation.play(this.currentName, times);
        }
    };
    DBComponent.prototype.stop = function () {
    };
    DBComponent.prototype.dbDispose = function () {
        if (this.armature) {
            this.currentName = this.dnName;
            this.armature.dispose();
        }
    };
    DBComponent.prototype.playDefault = function (times) {
        if (this.armature) {
            this.currentName = "default";
            this.visible = true;
            this.armature.animation.gotoAndPlayByFrame("default", 0, times);
        }
    };
    DBComponent.prototype.playNamesAndLoop = function (names) {
        var _this = this;
        async.eachSeries(names, function (name, callback) {
            _this.callback = callback;
            _this.play(name, 1);
        }, function () {
            _this.play(_this.currentName, -1);
        });
    };
    DBComponent.prototype.playNamesAndLoop1 = function (names) {
        var _this = this;
        async.eachSeries(names, function (name, callback) {
            _this.callback = callback;
            _this.play(name, 1);
        }, function () {
            _this.play(_this.currentName, 3);
        });
    };
    DBComponent.prototype.playByNames = function (names) {
        var _this = this;
        async.eachSeries(names, function (name, callback) {
            _this.callback = callback;
            _this.play(name, 1);
        }, function () {
        });
    };
    DBComponent.create = function (cacheName, effectName) {
        var component = GameCacheManager.instance.getCache(cacheName);
        if (!component) {
            component = new DBComponent(effectName);
            GameCacheManager.instance.setCache(cacheName, component);
        }
        return component;
    };
    DBComponent.clearCache = function (cacheName) {
        GameCacheManager.instance.clearCache(cacheName);
    };
    DBComponent.prototype.playByTime = function (name1, times) {
        if (this.armature) {
            this.currentName = name1;
            this.visible = true;
            this.armature.animation.gotoAndPlayByFrame(name1, 1, times);
        }
    };
    DBComponent.prototype.play_first = function (name1, times) {
        if (this.armature) {
            this.currentName = name1;
            this.armature.animation.gotoAndPlayByFrame(name1, 1, times);
        }
    };
    DBComponent.dbMovie = function (name, movieName) {
        var anime_data = RES.getRes(name + "_ske_json");
        var anime_texture = RES.getRes(name + "_tex_png");
        var anime_texture_data = RES.getRes(name + "_tex_json");
        var db = new dragonBones.EgretFactory();
        db.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(anime_data));
        db.addTextureAtlas(new dragonBones.EgretTextureAtlas(anime_texture, anime_texture_data));
        var anime = db.buildArmatureDisplay(movieName);
        return anime;
    };
    DBComponent.prototype.realease = function () {
        game.UIUtils.removeSelf(this);
        GameCacheManager.instance.setCache(this.dnName, this);
    };
    return DBComponent;
}(game.BaseUI));
__reflect(DBComponent.prototype, "DBComponent");
