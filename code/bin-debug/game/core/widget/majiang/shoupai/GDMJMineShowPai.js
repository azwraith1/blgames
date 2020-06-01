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
var GDMJMineShowPai = (function (_super) {
    __extends(GDMJMineShowPai, _super);
    function GDMJMineShowPai(arr, stus) {
        return _super.call(this, arr, stus) || this;
    }
    /**
     * 重写一下这个
     */
    GDMJMineShowPai.prototype.showColors = function () {
        var mineInfo = Global.gameProxy.getMineGameData();
        mineInfo.cards = this.colorArr;
        this.colorArr1 = Global.gameProxy.getMineSHoupaiArrLz();
        this.show();
    };
    GDMJMineShowPai.prototype.show = function () {
        if (this.value == 2) {
            var baoCard = Global.gameProxy.roomInfo.baoCards[0];
            var imgs = void 0;
            this.mineHuShow.visible = true;
            for (var i = 0; i <= 13; i++) {
                var color = this.colorArr1[i];
                imgs = this['color' + i];
                if (color) {
                    var value = this.colorArr1[i];
                    this['image' + i].visible = true;
                    imgs.source = RES.getRes("color_value_" + value + "_png");
                    // if(value == baoCard){
                    // let img = new eui.Image("gdmj_tip_lai_png")
                    // img.scaleX = img.scaleY = 0.7;
                    // imgs.parent.addChild(img);
                    // img.x = this['image' + i].x;
                    // img.y = this['image' + i].y;
                    // }
                }
                else {
                    this['image' + i].visible = false;
                    imgs.source = "";
                }
            }
        }
    };
    return GDMJMineShowPai;
}(majiang.MineShowPai));
__reflect(GDMJMineShowPai.prototype, "GDMJMineShowPai");
