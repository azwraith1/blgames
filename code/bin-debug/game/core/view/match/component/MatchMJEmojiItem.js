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
/*
 * @Author: MC Lee
 * @Date: 2019-11-28 18:34:59
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-17 16:58:07
 * @Description: 麻将比赛付费表情
 */
var MatchMJEmojiItem = (function (_super) {
    __extends(MatchMJEmojiItem, _super);
    function MatchMJEmojiItem() {
        var _this = _super.call(this) || this;
        _this.skinName = new MatchMJEmojiItemSkin();
        return _this;
    }
    MatchMJEmojiItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    };
    MatchMJEmojiItem.prototype.initData = function (index, gold) {
        this.index = index;
        this.gold = gold;
        this.iconImage.source = RES.getRes("emoji_icon_" + index + "_png");
        this.numberLabel.text = gold + "元";
    };
    MatchMJEmojiItem.prototype.onTouch = function () {
        CF.dP(ENo.EMOJI_SEND, { index: this.index, gold: this.gold });
    };
    return MatchMJEmojiItem;
}(eui.Component));
__reflect(MatchMJEmojiItem.prototype, "MatchMJEmojiItem");
