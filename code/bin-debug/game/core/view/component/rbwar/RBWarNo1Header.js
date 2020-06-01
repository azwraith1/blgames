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
    var RBWarNo1Header = (function (_super) {
        __extends(RBWarNo1Header, _super);
        function RBWarNo1Header() {
            return _super.call(this) || this;
        }
        RBWarNo1Header.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createPersons();
        };
        RBWarNo1Header.prototype.createPersons = function () {
            var person1 = GameCacheManager.instance.getCache("rbw_no1");
            if (!person1) {
                person1 = new DBComponent("rbw_no1");
                GameCacheManager.instance.setCache("rbw_no1", person1);
            }
            person1.x = 131;
            person1.y = 51;
            this.dbGroup.addChild(person1);
            this.person1 = person1;
            this.person1.playNamesAndLoop(["xunhuan"]);
            var person2 = GameCacheManager.instance.getCache("rbw_no11");
            if (!person2) {
                person2 = new DBComponent("rbw_no1");
                GameCacheManager.instance.setCache("rbw_no11", person2);
            }
            person2.x = 130;
            person2.y = 51;
            this.dbGroup1.addChild(person2);
            this.person2 = person2;
            this.person2.playNamesAndLoop(["touxiang"]);
        };
        return RBWarNo1Header;
    }(BaseHeader));
    rbwar.RBWarNo1Header = RBWarNo1Header;
    __reflect(RBWarNo1Header.prototype, "rbwar.RBWarNo1Header");
})(rbwar || (rbwar = {}));
