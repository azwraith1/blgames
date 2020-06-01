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
var WinNumberPanel = (function (_super) {
    __extends(WinNumberPanel, _super);
    function WinNumberPanel() {
        var _this = _super.call(this) || this;
        _this.rollNumber = 2;
        _this.delta = 3;
        _this.skinName = "WinNumberPanelSkin";
        return _this;
    }
    Object.defineProperty(WinNumberPanel, "instance", {
        get: function () {
            if (!WinNumberPanel._instance) {
                WinNumberPanel._instance = new WinNumberPanel();
            }
            return WinNumberPanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    WinNumberPanel.prototype.initDB = function (name) {
        if (name === void 0) { name = "jjc_zhuanzhou"; }
        var db = new DBComponent(name);
        var loopName = name + "_loop";
        db.playNamesAndLoop([name, loopName]);
        this.dbGroup.addChild(db);
    };
    WinNumberPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.initDB();
        var winGroup;
        for (var i = 0; i < 5; ++i) {
            var winGroup_1 = this["group" + i];
            winGroup_1.setGroupID(i);
            winGroup_1.visible = false;
        }
    };
    WinNumberPanel.prototype.hide = function () {
        game.UIUtils.removeSelf(this);
        WinNumberPanel._instance = null;
        this.callback && this.callback();
    };
    WinNumberPanel.prototype.show = function (winNumber, callback) {
        var _this = this;
        //this.initDB(winNumber);
        this.callback = callback;
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.setAutoTimeout(function () {
            _this.initWinNumber(winNumber);
        }, this, 200);
    };
    WinNumberPanel.prototype.revertNumber = function (number) {
        if (number <= 99999) {
            return number + "";
        }
        else {
            return Math.floor(number / 10000) + "w";
        }
    };
    WinNumberPanel.prototype.initWinNumber = function (winNumber) {
        var winNum = this.revertNumber(winNumber);
        var winGroup;
        this.dataLenth = winNum.length;
        var tempArr = [];
        var tempData;
        //倒序
        for (var i = this.dataLenth - 1; i >= 0; i--) {
            tempArr.push(winNum[i]);
        }
        for (var i = 0; i < 5; ++i) {
            tempData = tempArr[i];
            var winGroup_2 = this["group" + i];
            var count = this.rollNumber + i * this.delta;
            if (tempData) {
                winGroup_2.visible = true;
                winGroup_2.playDB(count, tempData, this.playFinish, this);
            }
            else {
                winGroup_2.playDB(count, "0", this.playFinish, this);
                winGroup_2.visible = true;
            }
        }
        SoundManager.getInstance().playEffect("wszw_reel_num_mp3", true);
    };
    WinNumberPanel.prototype.playFinish = function (item) {
        var _this = this;
        var _id = item.getGroupID();
        if (_id == 4) {
            SoundManager.getInstance().stopEffectByName("wszw_reel_num_mp3");
            SoundManager.getInstance().playEffect("cjnn_flyGoldMc_mp3");
        }
        if (_id == 4) {
            this.setAutoTimeout(function () { _this.hide(); }, this, 1000);
            SoundManager.getInstance().stopEffectByName("cjnn_flyGoldMc_mp3");
        }
    };
    return WinNumberPanel;
}(game.BaseComponent));
__reflect(WinNumberPanel.prototype, "WinNumberPanel");
