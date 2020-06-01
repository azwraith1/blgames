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
var WinNumberGroup = (function (_super) {
    __extends(WinNumberGroup, _super);
    function WinNumberGroup() {
        var _this = _super.call(this) || this;
        _this.skinName = "WinNumberGroupSkin";
        return _this;
    }
    WinNumberGroup.prototype.initDB = function () {
        var _this = this;
        this.rollDB = new DBComponent("jjc_zhuanlun");
        this.dbGroup.addChild(this.rollDB);
        this.dbGroup.visible = false;
        this.rollDB.callback = function () {
            if (_this.callBack)
                _this.callBack.call(_this.thisObj, _this);
            _this.dbGroup.visible = false;
            _this.winNumberItem.visible = true;
        };
    };
    WinNumberGroup.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.initDB();
    };
    WinNumberGroup.prototype.setGroupID = function (org) {
        this.groupId = org;
    };
    WinNumberGroup.prototype.getGroupID = function () {
        return this.groupId;
    };
    WinNumberGroup.prototype.playDB = function (time, txtVal, callBack, thisObj) {
        if (time === void 0) { time = -1; }
        this.dbGroup.visible = true;
        this.rollDB.playByFilename(time);
        this.winNumberItem.setWinTxt(txtVal);
        this.callBack = callBack;
        this.thisObj = thisObj;
    };
    return WinNumberGroup;
}(game.BaseUI));
__reflect(WinNumberGroup.prototype, "WinNumberGroup");
