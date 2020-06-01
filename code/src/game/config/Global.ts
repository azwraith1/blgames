/*
 * @Author: Li MengChan 
 * @Date: 2018-06-25 14:23:49 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-08-26 17:30:09
 * @Description: 全局的代理类处理
 */
module Global {

  export var playerProxy: game.PlayerProxy;

  export var netProxy: game.NetProxy;

  export var gameProxy: game.GameProxy;

  export var pomelo: game.PomeloManager;

  export var alertMediator: game.AlertMediator;

  // export var sangongProxy: game.SangongProxy;

  export var roomProxy: game.RoomProxy;

  export var zajinhuaProxy: game.ZajinhuaProxy;

  export var runBack: boolean = false;

  export var runGame: boolean = false;
  export var oritationChange: boolean = false;


  export var platfromType: string = "bole";

  export var slotProxy: any;


}