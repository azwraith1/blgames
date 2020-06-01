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
// TypeScript file
var slot;
(function (slot) {
    var SlotRankItem = (function (_super) {
        __extends(SlotRankItem, _super);
        function SlotRankItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "SlotRankItemSkin";
            return _this;
        }
        SlotRankItem.prototype.dataChanged = function () {
            this.updateShow(this.data);
        };
        SlotRankItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        SlotRankItem.prototype.updateShow = function (data) {
            this.rank = data.rank;
            this.gold = data.score;
            this.name = data.ext.nickname;
            this.sex = data.ext.sex;
            this.avatar = data.ext.figure_url;
            switch (this.rank) {
                case 1:
                    this.currentState = "1";
                    this.validateNow();
                    break;
                case 2:
                    this.currentState = "2";
                    this.validateNow();
                    break;
                case 3:
                    this.currentState = "3";
                    this.validateNow();
                    break;
                case 4:
                    this.currentState = "4";
                    this.userRank.text = this.rank + "";
                    this.validateNow();
                    break;
                default:
                    this.currentState = "4";
                    this.userRank.text = this.rank + "";
                    this.validateNow();
                    break;
            }
            this.userHead.source = RES.getRes("hall_header_" + this.sex + "_" + this.avatar + "_png");
            this.userName.text = this.name + "";
            this.userGold.text = this.gold + "";
        };
        return SlotRankItem;
    }(game.BaseItemRender));
    slot.SlotRankItem = SlotRankItem;
    __reflect(SlotRankItem.prototype, "slot.SlotRankItem");
})(slot || (slot = {}));
