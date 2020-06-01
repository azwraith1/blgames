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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var rbwar;
(function (rbwar) {
    var RBWarZSPanel = (function (_super) {
        __extends(RBWarZSPanel, _super);
        function RBWarZSPanel() {
            var _this = _super.call(this) || this;
            _this.progressWidth = 994;
            _this.chaochuIndex = 6;
            //当前列数
            _this.currentColwn = 0;
            //当前行数
            _this.maxRow = 6;
            _this.isJian = false;
            _this.skinName = new RBWarZSPanelSkin();
            return _this;
        }
        RBWarZSPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createDBComponent();
            this.showWinPercent();
            this.showLuDan();
            this.showPattern();
        };
        RBWarZSPanel.prototype.showPattern = function () {
            var roomInfo = Global.roomProxy.roomInfo;
            var dataArr = roomInfo.lastWinPattern;
            var oushuArr = [];
            var jishuArr = [];
            for (var i = 0; i < dataArr.length; i++) {
                if (i % 2 == 0) {
                    oushuArr.push(dataArr[i]);
                }
                else {
                    jishuArr.push(dataArr[i]);
                }
            }
            for (var i = 0; i < oushuArr.length; i++) {
                var data = oushuArr[i];
                var groupChild = void 0;
                if (i >= this.group1.numChildren) {
                    groupChild = new rbwar.RBWarZSPattern();
                    groupChild.initModel(data.luckyWin);
                    this.group1.addChild(groupChild);
                }
                else {
                    groupChild = this.group1.getChildAt(i);
                    if (!groupChild) {
                        groupChild = new rbwar.RBWarZSPattern();
                        groupChild.initModel(data.luckyWin);
                        this.group1.addChild(groupChild);
                    }
                }
                groupChild.showContent(RBW_PATTERN[data.pattern]);
            }
            for (var i = 0; i < jishuArr.length; i++) {
                var data = jishuArr[i];
                var groupChild = void 0;
                if (i >= this.group2.numChildren) {
                    groupChild = new rbwar.RBWarZSPattern();
                    groupChild.initModel(data.luckyWin);
                    this.group2.addChild(groupChild);
                }
                else {
                    groupChild = this.group2.getChildAt(i);
                    if (!groupChild) {
                        groupChild = new rbwar.RBWarZSPattern();
                        groupChild.initModel(data.luckyWin);
                        this.group2.addChild(groupChild);
                    }
                }
                groupChild.showContent(RBW_PATTERN[data.pattern]);
            }
        };
        RBWarZSPanel.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.ROOM_FULSH, this.s_roomInfo, this);
        };
        RBWarZSPanel.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.ROOM_FULSH, this.s_roomInfo, this);
        };
        RBWarZSPanel.prototype.s_roomInfo = function () {
            for (var i = 1; i <= 20; i++) {
                var item = this['item' + i];
                item.clearData();
            }
            this.showWinPercent();
            this.showLuDan();
            this.showPattern();
        };
        RBWarZSPanel.prototype.showLuDan = function () {
            var roomInfo = Global.roomProxy.roomInfo;
            var dataArr = _.clone(roomInfo.lastRBReport);
            // dataArr = [
            // 	2,1,1,1,2,2,1,1,1,2,
            // 	2,1,2,2,1,2,1,2,1,1,
            // 	1,2,2,1,2,1,2,2,1,1,
            // 	2,1,2,1,1,2,2,2,1,1,
            // 	2,2,2,2,2,2,1,1,2,2,
            // 	2,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,1,2
            // 	]
            // dataArr = [1, 1, 2, 1, 1, 2, 2, 1, 2,
            // 	1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1
            // 	, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1,
            // 	2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2,
            // 	1, 1, 1, 2, 1, 1, 2, 2, 2, 1, 2, 1, 2];
            // let data = [[1,1,1,1,1,1,1], {2:2}]
            var index = -1;
            var lastValue = 0;
            var dataResult = [];
            while (dataArr.length > 0) {
                if (!dataResult[index] && index > -1) {
                    dataResult[index] = [];
                }
                var value = dataArr.shift();
                if (lastValue == value) {
                    dataResult[index].push(value);
                }
                else {
                    index++;
                    if (!dataResult[index]) {
                        dataResult[index] = [];
                    }
                    dataResult[index].push(value);
                    lastValue = value;
                }
            }
            var startLength = 0;
            if (dataResult.length > 20) {
                startLength = dataResult.length - 20;
                var offset = 0;
                var count1 = 6;
                var lianxuIndex = 0;
                for (var i = dataResult.length - 1, offsetIndex = 0; i >= startLength; i--, offsetIndex++) {
                    var data = dataResult[i];
                    var count = data.length;
                    var offerset = count - count1 - offsetIndex + lianxuIndex;
                    if (offerset > offset) {
                        offset = offerset;
                        count1--;
                        lianxuIndex++;
                    }
                    else {
                        lianxuIndex = 0;
                        count1 = 6;
                    }
                }
                startLength += offset;
            }
            for (var i = startLength, index_1 = 1; i < dataResult.length; i++, index_1++) {
                var arrData = dataResult[i];
                var data = arrData[0];
                var item = this['item' + index_1];
                this.showItemByArr(arrData, index_1);
            }
            var patterns = roomInfo.lastRBReport;
            for (var i = 1; i <= 20; i++) {
                var item = this['item' + i];
                var index_2 = patterns.length - 20 + (i - 1);
                item.showType(patterns[index_2]);
            }
        };
        RBWarZSPanel.prototype.pointMoveOne = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i, before, current, images;
                return __generator(this, function (_a) {
                    for (i = 2; i <= 20; i++) {
                        before = this['item' + (i - 1)];
                        current = this['item' + (i)];
                        images = current.images;
                        current.clearData();
                        before.change2Points(images);
                    }
                    return [2 /*return*/];
                });
            });
        };
        RBWarZSPanel.prototype.showImageByStartPoint = function (colwn, type) {
            var item = this['item' + colwn];
            if (item.checkPointsHas(this.chaochuIndex)) {
                this.chaochuIndex--;
                this.showImageByStartPoint(colwn + 1, type);
                return;
            }
            item.showImageByPoint(this.chaochuIndex, type);
        };
        RBWarZSPanel.prototype.showItemByArr = function (arrData, colwn) {
            return __awaiter(this, void 0, void 0, function () {
                var item, lastRow, i, type, row;
                return __generator(this, function (_a) {
                    item = this['item' + colwn];
                    lastRow = item.findLastRow();
                    for (i = 0; i < arrData.length; i++) {
                        type = arrData[i];
                        row = i + 1;
                        if (row > lastRow) {
                            item = this['item' + (colwn + (row - lastRow))];
                            if (item) {
                                item.showImageByPoint(lastRow, type);
                            }
                        }
                        else {
                            item.showImageByPoint(row, type);
                        }
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 展现胜利百分比
         */
        RBWarZSPanel.prototype.showWinPercent = function () {
            var roomInfo = Global.roomProxy.roomInfo;
            var report = roomInfo.lastRBReport;
            var redWinCount = rbwar.RBWUtils.getReportWinCount(report, 1);
            var blackWinCount = 20 - redWinCount;
            var percent1 = Math.floor(redWinCount / 20 * 100);
            var percent2 = 100 - percent1;
            this.percent1.text = percent1 + "%";
            this.percent2.text = percent2 + "%";
            this.progress1.width = this.progressWidth * percent1 / 100;
            this.progress2.width = 994 - this.progress1.width;
            this.progress2.x = 994 - this.progress2.width;
            if (percent1 > percent2) {
                this.person1.playNamesAndLoop(["normal_smell", "smell"]);
                this.person2.playNamesAndLoop(["normal_cry", "cry"]);
            }
            else if (percent1 < percent2) {
                this.person2.playNamesAndLoop(["normal_smell", "smell"]);
                this.person1.playNamesAndLoop(["normal_cry", "cry"]);
            }
            else {
                this.person1.playNamesAndLoop(["normal"]);
                this.person2.playNamesAndLoop(["normal"]);
            }
            var tipsX = this.progress1.width - this.tipsGroup.width + 53;
            if (tipsX >= 680) {
                tipsX = 680;
            }
            else if (tipsX < 220) {
                tipsX = 220;
            }
            this.tipsGroup.x = tipsX;
        };
        RBWarZSPanel.prototype.createDBComponent = function () {
            var person1 = DBComponent.create("rbw_person1_zs", "rbw_red_person");
            person1.scaleX = person1.scaleY = 0.2;
            person1.x = -50;
            person1.y = 15;
            this.tipsGroup.addChild(person1);
            this.person1 = person1;
            this.person1.playNamesAndLoop(["normal"]);
            var person2 = DBComponent.create("rbw_person2_zs", "rbw_black_person");
            person2.scaleX = person2.scaleY = 0.2;
            person2.x = this.tipsGroup.width + 50;
            person2.y = 15;
            this.person2 = person2;
            this.person2.playNamesAndLoop(["normal"]);
            this.tipsGroup.addChild(person2);
        };
        RBWarZSPanel.prototype.onTouchTap = function (e) {
            switch (e.target) {
                case this.closeBtn:
                    CF.sN(PanelNotify.CLOSE_RBWARZS);
                    break;
            }
        };
        return RBWarZSPanel;
    }(game.BaseComponent));
    rbwar.RBWarZSPanel = RBWarZSPanel;
    __reflect(RBWarZSPanel.prototype, "rbwar.RBWarZSPanel");
})(rbwar || (rbwar = {}));
