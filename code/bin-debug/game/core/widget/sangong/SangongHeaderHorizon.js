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
var sangong;
(function (sangong) {
    var SangongHeaderHorizon = (function (_super) {
        __extends(SangongHeaderHorizon, _super);
        function SangongHeaderHorizon() {
            return _super.call(this) || this;
            //this.skinName = "resource/skins/widget/sangong/HZMJGameSceneSkin.exml";
            //	D:\MuTouProject\code\resource\skins\widget\sangong
        }
        /**
 * @ smart
 * 抢庄或不抢庄
 */
        SangongHeaderHorizon.prototype.showQZ = function (index, isQiangZhuang) {
            var resName = "sg_bq_png";
            if (isQiangZhuang) {
                resName = "sg_qz_png";
            }
            this.topQZ.visible = true;
            this.topQZ.source = RES.getRes(resName);
        };
        SangongHeaderHorizon.prototype.exchange45 = function (dir) {
            //smart 倍数位置修改
            if (dir == 1) {
            }
            else if (dir == 2) {
                this.beishuGroup.x = -102;
                this.beishuGroup.y = 33;
                this.beishuLabel.right = 14;
            }
            else if (dir == 3) {
                this.beishuGroup.x = -102;
                this.beishuGroup.y = 70;
                this.beishuLabel.right = 14;
            }
            else if (dir == 4) {
                this.beishuGroup.x = 143;
                this.beishuGroup.y = 70;
                this.beishuLabel.left = 19;
            }
            else if (dir == 5) {
                this.beishuGroup.x = 135;
                this.beishuGroup.y = 33;
                this.beishuLabel.left = 19;
            }
        };
        return SangongHeaderHorizon;
    }(sangong.SangongHeader));
    sangong.SangongHeaderHorizon = SangongHeaderHorizon;
    __reflect(SangongHeaderHorizon.prototype, "sangong.SangongHeaderHorizon");
})(sangong || (sangong = {}));
