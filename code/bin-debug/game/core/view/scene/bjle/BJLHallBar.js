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
var bjle;
(function (bjle) {
    var BJLHallBar = (function (_super) {
        __extends(BJLHallBar, _super);
        function BJLHallBar(data) {
            var _this = _super.call(this) || this;
            _this.lock = false;
            /**
             * 初始化棋子，并装入到对应的组里面。
             */
            _this.tesu9 = 0;
            _this.maxLie = 0;
            _this.startLength = 1; //第几列
            _this.MaxLength = 6; //每列最大长度
            _this.index = 0;
            _this.idx = 1;
            _this.config = data;
            _this.skinName = new BJLHallBarSkin();
            return _this;
        }
        BJLHallBar.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            game.UIUtils.setAnchorPot(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
            game.UpdateTickerManager.instance.add(this);
        };
        BJLHallBar.prototype.changeLanguageUI = function () {
            TextUtils.cBtnRes(this.runGame, "bjl_hall_jryx");
        };
        BJLHallBar.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
            game.UpdateTickerManager.instance.remove(this);
        };
        BJLHallBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var res = this.config["playway"] == 2 ? "bjl_mipai_bar" + CF.tic : "bjl_hall_ld_png";
            this.rbw_zh.source = res;
            if (this.config["playway"] == 2)
                this.rbw_zh.y = -22;
            this.showBarByConfig(this.config);
        };
        BJLHallBar.prototype.updateConfig = function (newData) {
            if (newData.sceneId == this.config.sceneId && newData.sceneIndex == this.config.sceneIndex) {
                this.config = newData;
                this.showBarByConfig(this.config);
            }
        };
        BJLHallBar.prototype.update = function (dt) {
            var endTime = this.config.remainTime;
            var cha = endTime - game.DateTimeManager.instance.now;
            var timeStr = "";
            if (cha <= 0) {
                timeStr = "00";
            }
            else {
                timeStr = NumberFormat.getTimeStrByDown(cha);
            }
            this.timeLable.text = timeStr;
        };
        BJLHallBar.prototype.onTouchEnded = function () {
            var _this = this;
            majiang.MajiangUtils.playClick(); //管理声音的
            if (this.lock) {
                return;
            }
            this.lock = true;
            egret.setTimeout(function () {
                this.lock = false;
            }, this, 1000);
            var playerGold = Global.playerProxy.playerData.gold;
            RotationLoadingShu.instance.load(["bjl_game"], "", function () {
                CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: 10010, sceneId: _this.gameId, sceneIndex: _this.sceneindex });
            });
            egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
        };
        BJLHallBar.prototype.showBarByConfig = function (num) {
            var zt = num["roomState"];
            this.showRoomStatus(zt);
            var xiane = num["betRang"];
            this.zhunru.text = CF.tigc(133) + "\n" + xiane[0] + " - " + xiane[1];
            var ludan = num["wayBillInfoSet"];
            this.sceneindex = num["sceneIndex"];
            this.gameId = num["sceneId"];
            this.testNums(ludan);
        };
        BJLHallBar.prototype.showRoomStatus = function (stus) {
            switch (stus) {
                case 0:
                    this.runstats.source = RES.getRes("bjle_game_zbz" + CF.tic);
                    break;
                case 1:
                    this.runstats.source = RES.getRes("bjle_game_zbz" + CF.tic);
                    break;
                case 2:
                    this.runstats.source = RES.getRes("bjle_game_zbz" + CF.tic);
                    break;
                case 3:
                    this.runstats.source = RES.getRes("bjle_game_xzz" + CF.tic);
                    break;
                // case 4:
                case 5:
                    this.runstats.source = RES.getRes("bjle_game_bpz" + CF.tic);
                    break;
                case 6:
                    this.runstats.source = RES.getRes("bjle_game_pjz" + CF.tic);
                    break;
                case 7:
                case 8:
                case 9:
                    this.runstats.source = RES.getRes("bjl_mpz" + CF.tic);
                    break;
            }
        };
        /**
         * 路单赋值
         */
        BJLHallBar.prototype.testNums = function (num) {
            var index = 1;
            //数据格式定义：1庄赢，2庄对，3闲对 ，4庄闲对；
            //				5闲赢，6庄对，7闲对，8庄闲对；
            //             9和局 ，10庄对，11闲对，12庄闲对。
            //数据处理
            var dataArr = num.concat([]);
            if (num.length == 0) {
                return;
            }
            var newList = bjle.BaseBjlLd.changVlue(dataArr);
            var lists = bjle.BaseBjlLd.arryIntoArry(newList);
            var arry;
            if (lists.length <= 20) {
                this.initQizi(lists);
            }
            else {
                var index_1 = 0;
                var nums = lists.splice(-20);
                var num_1 = nums[nums.length - 1];
                if (num_1.length > 6) {
                    index_1 = num_1.length - 6;
                }
                var nums1 = nums.splice((-20 + index_1));
                this.initQizi(nums1);
            }
        };
        BJLHallBar.prototype.initQizi = function (arryList) {
            if (!arryList || arryList.length == 0) {
                return;
            }
            this.chushihua();
            var islock = true;
            for (var i = 0; i < arryList.length; i++) {
                if (i >= 20) {
                    return;
                }
                islock = true;
                this.startLength = i + 1;
                this.index = 0;
                var list = arryList[i];
                for (var j = 0; j < list.length; j++) {
                    var qizi = new bjle.BJLHallPoint();
                    if (this.maxLie <= i) {
                        this.MaxLength = 6;
                    }
                    if (this.index >= this.MaxLength) {
                        if (this.MaxLength < 2) {
                            return;
                        }
                        if (islock) {
                            this.MaxLength--;
                            islock = false;
                        }
                        qizi.initNums(list[j]);
                        if (list[j] == 9) {
                            this.startLength;
                        }
                        else {
                            this.startLength++;
                        }
                        if (this.startLength > this.maxLie) {
                            this.maxLie = this.startLength;
                        }
                        if (this["item" + this.startLength]) {
                            this["item" + this.startLength].setPosition(qizi, this.MaxLength + 1);
                            this["item" + this.startLength].addChild(qizi);
                        }
                        this.index++;
                    }
                    else {
                        if (list[j] == 9) {
                            if (j == 0) {
                                this["item" + (i + 1)].setPosition(qizi, 1);
                                this.tesu9 = 1;
                            }
                            else {
                                if (list[j - 1] == 9) {
                                    this["item" + (i + 1)].setPosition(qizi, this.tesu9);
                                }
                                else {
                                    this.index;
                                    this.tesu9 = this.index;
                                    this["item" + (i + 1)].setPosition(qizi, this.index);
                                }
                            }
                            qizi.initNums(list[j]);
                        }
                        else {
                            this.index++;
                            qizi.initNums(list[j]);
                            this["item" + (i + 1)].setPosition(qizi, this.index);
                        }
                        this["item" + (i + 1)].addChild(qizi);
                    }
                }
            }
        };
        BJLHallBar.prototype.chushihua = function () {
            this.MaxLength = 6;
            this.maxLie = 0;
            this.startLength = 1; //第几列
            this.MaxLength = 6; //每列最大长度
            this.index = 0;
            this.idx = 1;
            for (var i = 0; i < 20; i++) {
                this["item" + (i + 1)].removeChildren();
            }
        };
        return BJLHallBar;
    }(game.BaseUI));
    bjle.BJLHallBar = BJLHallBar;
    __reflect(BJLHallBar.prototype, "bjle.BJLHallBar", ["IUpdate"]);
})(bjle || (bjle = {}));
