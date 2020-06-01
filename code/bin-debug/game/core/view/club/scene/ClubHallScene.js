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
/*
 * @Author: reel MC Lee
 * @Date: 2020-01-07 15:09:52
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2020-03-03 13:36:50
 * @Description:
 */
var ClubHallScene = (function (_super) {
    __extends(ClubHallScene, _super);
    function ClubHallScene() {
        var _this = _super.call(this) || this;
        /**
         * 背景音乐
         */
        _this.bgMusic = "main_bg_mp3";
        /**
         * 加入俱乐部大厅
         * @param  {egret.Event} e
         */
        _this.lockReq = false;
        _this.skinName = "ClubHallSceneSkin" + CF.tis;
        return _this;
    }
    ClubHallScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (ServerConfig.OP_RETURN_TYPE == "3") {
            this.backBtn.visible = false;
        }
        this.initList();
        this.userName.text = Global.playerProxy.playerData.nickname;
        var headerImage = "hall_header_" + Global.playerProxy.playerData.sex + "_" + Global.playerProxy.playerData.figure_url + "_png";
        this.headerImage.source = headerImage;
        this.updateGold();
        this.initHallAni();
    };
    ClubHallScene.prototype.initHallAni = function () {
        this.titleAni = DBComponent.create("club_hall_title_bg", "club_hall_title_bg");
        this.titleAni.play("", 0);
        this.titleAni.horizontalCenter = this.titleAni.bottom = 0;
        this.titleAniGroup.addChild(this.titleAni);
        this.titleAni.resetPosition();
    };
    ClubHallScene.prototype.initList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp, atr, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, game.PomeloManager.instance.request(ServerPostPath.hall_clubHandler_c_getClubList, {})];
                    case 1:
                        resp = _a.sent();
                        this["dianImag"].visible = resp.isNewMail;
                        if (resp) {
                            if (resp.error) {
                                Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                                return [2 /*return*/];
                            }
                            if (resp.isCreator) {
                                this.joinClubBtn.horizontalCenter = 225;
                                this.createClubBtn.visible = true;
                            }
                            if (resp.list.length > 0) {
                                //smart
                                ClubManager.instance.list = resp.list;
                                //smart
                                this["roleGroup"].visible = false;
                                atr = [];
                                for (i = 0; i < resp.list.length; i++) {
                                    atr.push(resp.list[i]);
                                }
                                this.clubItemList.itemRenderer = ClubListItem;
                                this.clubItemList.dataProvider = new eui.ArrayCollection(atr);
                            }
                            else {
                                if (resp.list.length == 0)
                                    this.clubItemList.removeChildren();
                                this["roleGroup"].visible = true;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ClubHallScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.CLUB_FLASH_CLUB_LIST, this.initList, this);
        CF.aE(ENo.CLUB_JOIN_CLUB, this.joinMyClub, this);
        CF.aE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
        CF.aE(ENo.CLUB_HALL_QUIT_TOUCH, this.quit, this);
    };
    ClubHallScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.CLUB_FLASH_CLUB_LIST, this.initList, this);
        CF.rE(ENo.CLUB_JOIN_CLUB, this.joinMyClub, this);
        CF.rE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
        CF.rE(ENo.CLUB_HALL_QUIT_TOUCH, this.quit, this);
    };
    ClubHallScene.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.createClubBtn:
                this.playerCreateClub();
                break;
            case this.joinClubBtn:
                this.playerJoinClub();
                break;
            case this.backBtn:
                this.quitClub();
                break;
            case this.myClubBtn:
                this.showMyClub();
                break;
            case this.headerImage:
                CF.sN(PanelNotify.OPEN_HEADER);
                break;
            case this["clubtipsBtn"]:
                this.showTips();
                break;
            case this.mailBtn:
                this.showMails();
                break;
            case this["setBtn"]:
                CF.sN(PanelNotify.OPEN_SETTING, { setIndex: 1 });
                break;
        }
    };
    ClubHallScene.prototype.changHeader = function (e) {
        var data = e.data;
        this.headerImage.source = "hall_header_" + data.sex + "_" + data.figureUrl + "_png";
        Global.playerProxy.playerData.figure_url = data.figureUrl;
        Global.playerProxy.playerData.sex = data.sex;
    };
    /**
     * 打开加入club窗口
     */
    ClubHallScene.prototype.playerCreateClub = function () {
        var createClub = ClubCreatePanel.instance;
        this.resizeGroup.addChild(createClub);
        createClub.horizontalCenter = createClub.verticalCenter = 0;
        var func = function () {
            createClub.creatClub();
        };
        createClub.createClub.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
    };
    /**
     * 打开加入club窗口
     */
    ClubHallScene.prototype.playerJoinClub = function () {
        return __awaiter(this, void 0, void 0, function () {
            var JoinClub;
            return __generator(this, function (_a) {
                JoinClub = ClubJoinPanel.instance;
                this.resizeGroup.addChild(JoinClub);
                JoinClub.horizontalCenter = JoinClub.verticalCenter = 0;
                return [2 /*return*/];
            });
        });
    };
    ClubHallScene.prototype.joinMyClub = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var clubData;
            return __generator(this, function (_a) {
                clubData = e.data.club;
                ClubManager.instance.currentClub = clubData;
                ClubInnerHallScene.instance.show();
                CF.sN(SceneNotify.CLOSE_CLUB_HALL);
                return [2 /*return*/];
            });
        });
    };
    /**
     * 显示我的Club
     */
    ClubHallScene.prototype.showMyClub = function () {
    };
    ClubHallScene.prototype.showTips = function () {
        var tips = ClubTipsPanel.instance;
        this.resizeGroup.addChild(tips);
        tips.horizontalCenter = tips.verticalCenter = 0;
    };
    ClubHallScene.prototype.showMails = function () {
        var mails = CLubMailPanel.instance;
        mails.verticalCenter = mails.horizontalCenter = 0;
        this.resizeGroup.addChild(mails);
        this["dianImag"].visible = false;
    };
    ClubHallScene.prototype.quitClub = function () {
        RotationLoading.instance.load(["main"], "", function () {
            CF.sN(SceneNotify.CLOSE_CLUB_HALL);
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
        });
    };
    ClubHallScene.prototype.quit = function (e) {
        var quit = ClubQuitTips.instance;
        quit.setClubId(e.data.clubId);
        quit.horizontalCenter = quit.verticalCenter = 0;
        this.resizeGroup.addChild(quit);
    };
    return ClubHallScene;
}(game.BaseScene));
__reflect(ClubHallScene.prototype, "ClubHallScene");
