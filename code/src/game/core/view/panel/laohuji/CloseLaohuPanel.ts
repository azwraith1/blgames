/*
 * @Author: real_MCLEE 
 * @Date: 2019-05-27 18:39:49 
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-11-26 16:58:33
 * @Description: 
 */
module game {
    export class CloseLaohuPanel extends game.BaseScene {
        leave_btn: eui.Button;
        cancel_leave_btn: eui.Button;

        public constructor() {
            super();
            this.skinName = new CloseLaohuPanelSkin();
        }
        public createChildren() {
            super.createChildren();
            this.leave_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quitRoom, this);
            this.cancel_leave_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                SoundManager.getInstance().playEffect("button_dntg_mp3");
                CF.sN(PanelNotify.CLOSE_LEAVE_LAOHU_PANEL);
            }, this);
        }
        /**
         * 退出slot游戏
         * @param  {} name
         */
        private async quitRoom(name) {
            this.leave_btn.touchEnabled = false;
            SoundManager.getInstance().playEffect("button_dntg_mp3");
            game.LaohuUtils.currentSceneId = null;
            var quitResp: any = await Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {});
            if (quitResp) {
                if (quitResp.error && quitResp.error.code != 0) {
                    let text = quitResp.error.msg;
                    Global.alertMediator.addAlert(text, () => {
                    }, null, true);
                    CF.sN(PanelNotify.CLOSE_LEAVE_LAOHU_PANEL);
                    CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                    CF.sN(SceneNotify.CLOSE_SDXL);
                    CF.sN(SceneNotify.CLOSE_CBZZ);
                    CF.sN(SceneNotify.CLOSE_SDMN);
                    CF.sN(SceneNotify.CLOSE_BSKG);
                    CF.sN(SceneNotify.CLOSE_DNTG);
                    CF.sN(SceneNotify.CLOSE_RDSG);
                    CF.sN(SceneNotify.CLOSE_AYLS);
                    CF.sN(SceneNotify.CLOSE_GDZW);
                    CF.sN(SceneNotify.CLOSE_BSCS);
                    CF.sN(SceneNotify.CLOSE_CEBY);
                    CF.sN(SceneNotify.CLOSE_LUCKY7);
                    CF.sN(SceneNotify.CLOSE_CSD);
                    CF.sN(SceneNotify.CLOSE_XYSG);
                    CF.sN(SceneNotify.CLOSE_XCBS);
                    CF.sN(SceneNotify.CLOSE_SGWS);
                    CF.sN(SceneNotify.CLOSE_SNYX);
                    return;
                }
                game.LaohuUtils.free_time_times = 0;
                game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = 0;
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.bets = [];
                game.LaohuUtils.muls = [];
                Global.gameProxy.clearRoomInfo();
                Global.playerProxy.playerData.gold = quitResp.gold;
                CF.sN(PanelNotify.CLOSE_LEAVE_LAOHU_PANEL);

                CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                CF.sN(SceneNotify.CLOSE_SDXL);
                CF.sN(SceneNotify.CLOSE_CBZZ);
                CF.sN(SceneNotify.CLOSE_SDMN);
                CF.sN(SceneNotify.CLOSE_BSKG);
                CF.sN(SceneNotify.CLOSE_DNTG);
                CF.sN(SceneNotify.CLOSE_RDSG);
                CF.sN(SceneNotify.CLOSE_AYLS);
                CF.sN(SceneNotify.CLOSE_GDZW);
                CF.sN(SceneNotify.CLOSE_BSCS);
                CF.sN(SceneNotify.CLOSE_CEBY);
                CF.sN(SceneNotify.CLOSE_ZCJL);
                CF.sN(SceneNotify.CLOSE_WSZW);
                CF.sN(SceneNotify.CLOSE_LUCKY7);
                CF.sN(SceneNotify.CLOSE_CSD);
                CF.sN(SceneNotify.CLOSE_XYSG);
                CF.sN(SceneNotify.CLOSE_XCBS);
                CF.sN(SceneNotify.CLOSE_SGWS);
                CF.sN(SceneNotify.CLOSE_SNYX);
                return;
            }
            let text = TextUtils.instance.getCurrentTextById(105);
            Global.alertMediator.addAlert(text, () => {
            }, null, true);
        }

    }
}