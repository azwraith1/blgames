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
var rbwar;
(function (rbwar) {
    var RbwPlayerList = (function (_super) {
        __extends(RbwPlayerList, _super);
        function RbwPlayerList() {
            var _this = _super.call(this) || this;
            _this.richManList = [];
            _this.skinName = new RbwarPlayerListSkin();
            return _this;
        }
        RbwPlayerList.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.richManList = [];
            var data = Global.roomProxy.roomInfo;
            var playerList = data.playerList;
            this.showList(playerList);
        };
        RbwPlayerList.prototype.showList = function (data) {
            this.playerGroup.removeChildren();
            var playerCount = data.playerCount;
            this.richManList = data.richManList.concat([]);
            var xyx = data.winRate1st;
            this.richManList.unshift(xyx);
            this.playerNums.text = "当前房间玩家数量：" + playerCount;
            for (var i = 0; i < this.richManList.length - 1; i++) {
                var n = new rbwar.RbwPlayerListBar(this.richManList[i], i);
                this.playerGroup.addChild(n);
            }
        };
        RbwPlayerList.prototype.onTouchTap = function (e) {
            switch (e.target) {
                case this.closeBtn:
                case this.rcts:
                    this.rcts.visible = false;
                    CF.sN(PanelNotify.CLOSE_RBWARPL);
                    break;
            }
        };
        return RbwPlayerList;
    }(game.BaseComponent));
    rbwar.RbwPlayerList = RbwPlayerList;
    __reflect(RbwPlayerList.prototype, "rbwar.RbwPlayerList");
})(rbwar || (rbwar = {}));
