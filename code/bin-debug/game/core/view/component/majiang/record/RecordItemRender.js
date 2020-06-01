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
var majiang;
(function (majiang) {
    var RecordItemRender = (function (_super) {
        __extends(RecordItemRender, _super);
        function RecordItemRender() {
            var _this = _super.call(this) || this;
            _this.skinName = new majiang.RecordItemSkin();
            return _this;
        }
        RecordItemRender.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.beishuLabel.visible = false;
        };
        RecordItemRender.prototype.dataChanged = function () {
            this.updateShow(this.data);
        };
        RecordItemRender.prototype.renderTypeByScmj = function (type, info, value) {
            var mineIndex = Global.gameProxy.getMineIndex();
            var form = info.from;
            var texcontent;
            var texDirec = "(" + majiang.MajiangUtils.getDirStr(info.from, mineIndex) + ")";
            texDirec = "";
            if (type == 1) {
                // texcontent = MajiangUtils.getGangTypePTStr(info.gangType, value);
                //smart
                //this.setTextStyle(this.typeLabel, texcontent, texDirec);
                this.typeLabel.text = majiang.MajiangUtils.getGangTypeStr(info.gangType, value); //,info.from,mineIndex
                // this.typeLabel.text = texcontent + texDirec;
            }
            else if (type == 2) {
                texcontent = majiang.MajiangUtils.getHuTypeStr(type, value, info.from, mineIndex);
                //	this.typeLabel.text = MajiangUtils.getHuTypeStr(type, value, info.from, mineIndex);
                this.typeLabel.text = texcontent + texDirec;
            }
            else if (type == 6) {
                this.typeLabel.text = "呼叫转移";
            }
            else {
                texcontent = majiang.MajiangUtils.getBiliTypeStr(type, value, info.from);
                //this.typeLabel.text = MajiangUtils.getBiliTypeStr(type, value, info.from);
                this.typeLabel.text = texcontent + texDirec;
            }
        };
        RecordItemRender.prototype.updateShow = function (data) {
            var type = data.type;
            var info = data.info;
            var value = info.gainGold;
            this.valueLabel.text = value.toFixed(2) > 0 ? "+" + value : value;
            var gameId = Global.gameProxy.roomInfo['codeId'];
            if (gameId == 10001 || gameId == 10002) {
                this.renderTypeByScmj(type, info, value);
            }
            else {
                this.renderTypeByOtherMj(type, info, value);
            }
            // let dizhu = Global.gameProxy.getSceneDizhu();
            // this.beishuLabel.text = Math.floor(Math.abs(value / dizhu)) + "倍";
            this.changeColor(value);
        };
        RecordItemRender.prototype.renderTypeByOtherMj = function (type, info, value) {
            var mineIndex = Global.gameProxy.getMineIndex();
            if (type == 1) {
                this.typeLabel.text = majiang.MajiangUtils.getGangTypePTStr(info.gangType, value);
            }
            else if (type == 2) {
                this.typeLabel.text = majiang.MajiangUtils.getHuTypeStr(type, value, info.from, mineIndex);
            }
            else {
                this.typeLabel.text = majiang.MajiangUtils.getBiliTypeStr(type, value, info.from);
            }
        };
        /**
         * 改变底色
         * @param  {} value
         */
        RecordItemRender.prototype.changeColor = function (value) {
            var color = 0xffffff;
            if (value > 0) {
                color = 0xfff729;
            }
            this.valueLabel.textColor = this.beishuLabel.textColor = this.typeLabel.textColor = color;
        };
        return RecordItemRender;
    }(game.BaseItemRender));
    majiang.RecordItemRender = RecordItemRender;
    __reflect(RecordItemRender.prototype, "majiang.RecordItemRender");
})(majiang || (majiang = {}));
