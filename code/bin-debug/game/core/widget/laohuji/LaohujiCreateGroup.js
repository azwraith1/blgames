var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var game;
(function (game) {
    var LaohujiCreateGroup = (function () {
        function LaohujiCreateGroup() {
        }
        LaohujiCreateGroup.createRoundGroup = function (atr_1, atr_2, length, canvas, group) {
            var bitmap;
            for (var i = 1; i < length * 2; i++) {
                bitmap = new eui.Image();
                var n1 = this.createNum_1();
                bitmap.source = RES.getRes("icon_3_json." + n1 + "");
                switch (i) {
                    case 2:
                        bitmap.source = RES.getRes("icon_3_json." + atr_1[0] + "");
                        break;
                    case 3:
                        bitmap.source = RES.getRes("icon_3_json." + atr_1[1] + "");
                        break;
                    case 4:
                        bitmap.source = RES.getRes("icon_3_json." + atr_1[2] + "");
                        break;
                    case this.length * 10 - 5:
                        bitmap.source = RES.getRes("icon_3_json." + atr_2[0] + "");
                        break;
                    case this.length * 10 - 4:
                        bitmap.source = RES.getRes("icon_3_json." + atr_2[1] + "");
                        break;
                    case this.length * 10 - 3:
                        bitmap.source = RES.getRes("icon_3_json." + atr_2[2] + "");
                        break;
                }
                bitmap.horizontalCenter = 0;
                bitmap.y = (i - 1) * 172;
                canvas.width = group.width;
                canvas.addChild(bitmap);
                canvas.x = 0;
                canvas.y = -(this.length - 4) * 172;
                group.addChild(canvas);
            }
            return group;
        };
        LaohujiCreateGroup.createNum_1 = function () {
            var n1 = Math.ceil(Math.random() * 12);
            if (n1 == 1)
                return this.createNum_1();
            return n1;
        };
        LaohujiCreateGroup.createNum_2 = function () {
            var n1 = Math.ceil(Math.random() * 12);
            if (n1 == 2)
                return this.createNum_2();
            return n1;
        };
        LaohujiCreateGroup.createNum_1_2 = function () {
            var n1 = Math.ceil(Math.random() * 12);
            if (n1 == 1 || n1 == 2)
                return this.createNum_1_2();
            return n1;
        };
        return LaohujiCreateGroup;
    }());
    game.LaohujiCreateGroup = LaohujiCreateGroup;
    __reflect(LaohujiCreateGroup.prototype, "game.LaohujiCreateGroup");
})(game || (game = {}));
