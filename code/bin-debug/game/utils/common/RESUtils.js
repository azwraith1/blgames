var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RESUtils = (function () {
    function RESUtils() {
    }
    RESUtils.getGroupTotal = function (resGroups) {
        if (!resGroups || resGroups.length < 1) {
            return 0;
        }
        var count = 0;
        for (var i = 0; i < resGroups.length; i++) {
            if (RES.isGroupLoaded(resGroups[i])) {
                count += 0;
            }
            else {
                var items = RES.getGroupByName(resGroups[i]);
                count += items.length;
            }
            // for (let j = 0; j < items.length; j++) {
            // 	let item = items[j];
            // 	// if (!item.loaded) {
            // 		count += 1;
            // 	// }
            // }
        }
        return count;
    };
    RESUtils.destoryResByGroupName = function (name) {
        if (RES.isGroupLoaded(name)) {
            RES.destroyRes(name, false);
        }
    };
    /**
     * 比赛场信息的重连
     */
    RESUtils.getRESNameByRaceReconnect = function () {
        var raceState = Global.gameProxy.roomState.raceState;
        if (raceState == 1) {
            //进入轮空界面
            return { now: ["match_mjxzdd"], back: ["match_hall"] };
        }
        else if (raceState == 2) {
            //进入比赛界面
            var gid = Global.gameProxy.roomState.gid;
            if (!gid) {
                gid = "mjxzdd";
            }
            return { now: ["match_" + gid], back: ["match_hall"] };
        }
        else if (raceState == 4) {
            return { now: ["match_mjxzdd"], back: ["match_hall"] };
        }
    };
    RESUtils.getRESNameByReconnect = function () {
        if (Global.gameProxy.roomState && Global.gameProxy.roomState.state == 1) {
            switch (Global.gameProxy.roomState.gid) {
                case "scmj":
                case "mjxlch":
                    return { now: ["majiang_game"], back: ["majiang_hall"] };
                case "mjxzdd":
                    return { now: ["majiang_game"], back: ["majiang_hall"] };
                case "blnn":
                    return { now: ["niuniu_game"], back: ["niuniu_hall"] };
                case "dzmj":
                    return { now: ["majiang_game"], back: ["dzmj_hall"] };
                case "gdmj":
                    return { now: ["gdmj_game"], back: ["gdmj_hall"] };
                case "zjh":
                    return { now: ["zhajinhua_game"], back: ["zhajinhua_hall"] };
                case "baccarat":
                    return { now: ["bjl_game"], back: ["bjl_hall"] };
                case "ermj":
                    return { now: ["ermj_game", "majiang_game"], back: ["gdmj_hall"] };
                case "slot":
                    return null;
                case "baicao":
                    return { now: ["baicao_game"], back: ["baicao_hall"] };
                case "superbaicao":
                    return { now: ["superbaicao_game"], back: ["superbaicao_hall"] };
                default:
                    return { now: [Global.gameProxy.roomState.gid + "_game"], back: [Global.gameProxy.roomState.gid + "_hall"] };
            }
        }
    };
    RESUtils.getResNameByGid = function () {
        if (Global.gameProxy.roomState && Global.gameProxy.roomState.raceState) {
            return this.getRESNameByRaceReconnect();
        }
        if (Global.gameProxy.roomState && Global.gameProxy.roomState.state == 1) {
            var data = this.getRESNameByReconnect();
            if (Global.gameProxy.roomState.club) {
                data.back.push("club_hall");
            }
            if (Global.gameProxy.roomState.matchType == 4) {
                data.now.push("match_common");
                data.back.push("match_hall");
            }
            return data;
        }
        //clubnew
        if (Global.gameProxy.roomState && Global.gameProxy.roomState.club) {
            var club = Global.gameProxy.roomState.club;
            switch (club.gameId) {
                case GAME_ID.ZJH:
                    return { now: ["zhajinhua_game"], back: ["club_hall"] };
                case GAME_ID.MJXZDD:
                    return { now: ["majiang_game"], back: ["club_hall"] };
                case GAME_ID.BLNN:
                    return { now: ["niuniu_game"], back: ["club_hall"] };
                case GAME_ID.ERMJ:
                    return { now: ["ermj_game", "majiang_game"], back: ["club_hall"] };
                case GAME_ID.HBMJ:
                    return { now: ["hbmj_game", "majiang_game"], back: ["club_hall"] };
                case GAME_ID.BDZ:
                    return { now: ["bdz_game"], back: ["club_hall"] };
                case GAME_ID.GDMJ:
                    return { now: ["gdmj_game", "majiang_game"], back: ["club_hall"] };
                case GAME_ID.BAICAO:
                    return { now: ["baicao_game"], back: ["club_hall"] };
                case GAME_ID.SUPERBAICAO:
                    return { now: ["superbaicao_game"], back: ["club_hall"] };
            }
        }
        if (ServerConfig.gid && ServerConfig.gid != "") {
            switch (ServerConfig.gid) {
                case "slot":
                    var scene = game.Utils.getURLQueryString("scene");
                    if (scene) {
                        return { now: [scene + "_hall", scene + "_game", "slot_hall_new"], back: [scene + "_back"] };
                    }
                    else {
                        return { now: ["slot_hall_new"], back: [] };
                    }
                default:
                    var resConf = ResGroupConf[ServerConfig.gid];
                    return { now: resConf.hall, back: [] };
            }
        }
        return null;
    };
    /**
     * 拼接资源组名
     * @group 资源数组
     * @return 资源组名
     */
    RESUtils.combGroupName = function (groupArr) {
        var groupName = "";
        if (typeof (groupArr) == "string") {
            groupName = groupArr;
        }
        else {
            var len = groupArr.length;
            if (len == 0) {
                groupName = groupArr[0];
            }
            else {
                for (var i = 0; i < len; i++) {
                    groupName += "->" + groupArr[i];
                }
                RES.createGroup(groupName, groupArr);
            }
        }
        return groupName;
    };
    ;
    return RESUtils;
}());
__reflect(RESUtils.prototype, "RESUtils");
