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
    var ChatBarItemRender = (function (_super) {
        __extends(ChatBarItemRender, _super);
        function ChatBarItemRender() {
            var _this = _super.call(this) || this;
            _this.skinName = new ChatBarItemSkin();
            return _this;
        }
        ChatBarItemRender.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        ChatBarItemRender.prototype.dataChanged = function () {
            this.chat_language.text = this.data["message"];
        };
        return ChatBarItemRender;
    }(game.BaseItemRender));
    majiang.ChatBarItemRender = ChatBarItemRender;
    __reflect(ChatBarItemRender.prototype, "majiang.ChatBarItemRender");
})(majiang || (majiang = {}));
