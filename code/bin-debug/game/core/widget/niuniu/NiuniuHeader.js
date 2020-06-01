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
var niuniu;
(function (niuniu) {
    var NiuniuHeader = (function (_super) {
        __extends(NiuniuHeader, _super);
        function NiuniuHeader() {
            var _this = _super.call(this) || this;
            _this.skinName = new NiuNiuHeaderSkin();
            return _this;
        }
        NiuniuHeader.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        NiuniuHeader.prototype.setIndex = function (index) {
            this.index = index;
        };
        NiuniuHeader.prototype.showBeishu = function (value) {
            this.bqImage.visible = value <= 0;
            this.beishuLabel.visible = value > 0;
            if (value > 0) {
                this.beishuLabel.text = "x" + value;
            }
            this.beishuGroup.visible = true;
        };
        NiuniuHeader.prototype.hideBeishu = function () {
            this.beishuGroup.visible = false;
        };
        NiuniuHeader.prototype.initWithPlayer = function (playerInfo) {
            if (!playerInfo) {
                this.nameLabel.text = Global.playerProxy.playerData.nickname;
                this.headerImage.source = "hall_header_" + Global.playerProxy.playerData.sex + "_" + Global.playerProxy.playerData.figure_url + "_png";
                this.goldLabel.text = NumberFormat.formatGold_scence(Global.playerProxy.playerData.gold);
            }
            else {
                this.playerInfo = playerInfo;
                this.goldLabel.text = NumberFormat.formatGold_scence(playerInfo.gold);
                this.nameLabel.text = playerInfo.nickname;
                var headerId = playerInfo['figureUrl'] || playerInfo.figure_url;
                var headerSex = playerInfo['sex'] || playerInfo.sex;
                this.headerImage.source = "hall_header_" + headerSex + "_" + headerId + "_png";
            }
            this.gold = Global.playerProxy.playerData.gold;
        };
        NiuniuHeader.prototype.showIsZhuang = function (isZhuang) {
            this.zhuangImage.visible = isZhuang;
            if (!Global.runBack) {
                this.zhuangImage.scaleX = this.zhuangImage.scaleY = 0;
                egret.Tween.get(this.zhuangImage).to({ scaleX: 0, scaleY: 0 }, 50).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 200);
            }
        };
        NiuniuHeader.prototype.change2Left = function () {
            this.beishuGroup.x = 0 - this.beishuGroup.width;
        };
        NiuniuHeader.prototype.showLiushuiLabel = function (gainGold) {
            var str;
            if (gainGold >= 0) {
                str = "+" + gainGold;
            }
            else {
                str = gainGold + "";
            }
            this.liushuiLabel.text = str;
            var player = Global.roomProxy.getPlayerInfoByIndex(this.index);
            this.goldLabel.text = NumberFormat.formatGold_scence(player.gold);
            // egret.setTimeout(()=>{
            // 	this.updatePlayerGold();
            // }, this, 500);
        };
        NiuniuHeader.prototype.updatePlayerGold = function () {
            var player = Global.roomProxy.getPlayerInfoByIndex(this.index);
            egret.Tween.get(this, { onChange: this.onChange, onChangeObj: this }).to({ gold: player.gold }, 500, egret.Ease.quadInOut);
        };
        NiuniuHeader.prototype.onChange = function () {
            this.goldLabel.text = NumberFormat.formatGold_scence(this.gold);
        };
        return NiuniuHeader;
    }(eui.Component));
    niuniu.NiuniuHeader = NiuniuHeader;
    __reflect(NiuniuHeader.prototype, "niuniu.NiuniuHeader");
})(niuniu || (niuniu = {}));
