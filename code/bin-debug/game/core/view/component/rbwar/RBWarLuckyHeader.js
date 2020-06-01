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
    var RBWarLuckyHeader = (function (_super) {
        __extends(RBWarLuckyHeader, _super);
        function RBWarLuckyHeader() {
            return _super.call(this) || this;
        }
        RBWarLuckyHeader.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createPersons();
        };
        RBWarLuckyHeader.prototype.createPersons = function () {
            var person2 = GameCacheManager.instance.getCache("rbw_luckey");
            if (!person2) {
                person2 = new DBComponent("rbw_luckey");
                GameCacheManager.instance.setCache("rbw_luckey", person2);
            }
            person2.x = 128;
            person2.y = 58;
            this.dbGroup.addChild(person2);
            this.person2 = person2;
            this.person2.playNamesAndLoop(["xunhuan"]);
            var person1 = GameCacheManager.instance.getCache("rbw_luckey1");
            if (!person1) {
                person1 = new DBComponent("rbw_luckey");
                GameCacheManager.instance.setCache("rbw_luckey1", person1);
            }
            person1.x = 120;
            person1.y = 58;
            this.dbGroup1.addChild(person1);
            this.person1 = person1;
            this.person1.playNamesAndLoop(["touxiang"]);
        };
        return RBWarLuckyHeader;
    }(BaseHeader));
    rbwar.RBWarLuckyHeader = RBWarLuckyHeader;
    __reflect(RBWarLuckyHeader.prototype, "rbwar.RBWarLuckyHeader");
})(rbwar || (rbwar = {}));
