import { MessageType, Config } from "mirai-ts";
import { bot } from "../../index";
import { isMaster, isAdmin } from "./global";

/**
 * 是否监听发送者
 * @param {Object} sender
 */
function isListening(sender: MessageType.Sender, listen: string | Config.Listen) {
  if (typeof listen === 'string') {

    // 监听所有
    if (listen === "all") {
      return true;
    }

    // 监听 master
    if (listen === "master" && isMaster(sender.id)) {
      return true;
    }

    // 监听管理员
    if (listen === "admin" && isAdmin(sender.id)) {
      return true;
    }

  } else {

    // 语法糖
    if (Array.isArray(listen)) {
      // 无论 QQ 号还是 QQ 群号
      if (listen.includes(sender.id) || (sender.group && listen.includes(sender.group.id))) return true;

      if (listen.includes('master') && isMaster(sender.id)) {
        return true;
      }

      if (listen.includes("admin") && isAdmin(sender.id)) {
        return true;
      }

      // 只监听好友
      if (listen.includes('friend') && !sender.group) {
        return true;
      }

      if (listen.includes('group') && sender.group) {
        return true;
      }
    }

    // 指定 QQ
    if (listen.friend && listen.friend.includes(sender.id)) {
      return true;
    }

    if (sender.group) {
      // 群
      if (
        listen === "group" ||
        (listen.group && listen.group.includes(sender.group.id))
      ) {
        return true;
      }
    } else {
      // 私聊时，判断是否监听 friend（其余在上方指定 QQ 时已判断过）
      if (listen === "friend") {
        return true;
      }
    }
  }

  return false;
}

/**
 * 通过配置发送消息
 * @param {MessageChain} messageChain
 * @param {object} target
 */

async function sendMessageByConfig(
  messageChain: string | MessageType.MessageChain,
  target: Config.Target
): Promise<number[]> {
  const mirai = bot.mirai;
  let messageList: number[] = [];

  if (Array.isArray(messageChain)) {
    messageChain.forEach(msg => {
      if (msg.type === "Image") {
        delete msg.imageId;
      }
    });
  }

  if (target.friend) {
    await Promise.all(target.friend.map(async (qq) => {
      const { messageId } = await mirai.api.sendFriendMessage(messageChain, qq);
      messageList.push(messageId);
    }));
  }

  if (target.group) {
    await Promise.all(target.group.map(async (qq) => {
      const { messageId } = await mirai.api.sendGroupMessage(messageChain, qq);
      messageList.push(messageId);
    }));
  }

  return messageList;
}

/**
 * 渲染 ES6 字符串
 * @param template 字符串模版
 * @param data 数据
 * @param name 参数名称
 */
function renderString(template: string, data: string | object, name: string) {
  return Function(name, "return `" + template + "`")(data);
}

/**
 * 从配置直接获取监听状态（包括判断 listen 与 unlisten）
 * @param sender 发送者
 * @param config 配置
 */
function getListenStatusByConfig(sender: MessageType.Sender, config: any): boolean {
  let listenFlag = true;
  if (config.listen) {
    listenFlag = isListening(sender, config.listen || "all");
  } else if (config.unlisten) {
    listenFlag = !isListening(sender, config.unlisten || "all");
  }
  return listenFlag;
}

export {
  isListening,
  renderString,
  sendMessageByConfig,
  getListenStatusByConfig,
};
