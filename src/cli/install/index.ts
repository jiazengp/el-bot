import { CAC } from "cac";
import inquirer from "inquirer";
import { log } from "mirai-ts";
import Repo from "./repo";

export default function (cli: CAC) {
  cli
    .command("install [project]", "安装依赖")
    .alias("i")
    .action((project: string) => {
      if (project === "mirai") {
        installMirai();
      }
    });
}

/**
 * 安装 mirai
 */
function installMirai() {
  // 一些想说的话
  log.info(
    "本项目使用原生的脚本启动 mirai。\n这只是辅助，本项目基于 mirai-api-http 且专注于机器人本身逻辑，但不提供任何关于如何下载启动 mirai 的解答，你应该自行掌握如何使用 mirai。\n在使用 el-bot 过程中遇到的问题，欢迎提 ISSUE，或加入我们的 QQ 群 707408530 / tg 群 https://t.me/elpsy_cn。"
  );
  log.warning("也许你可以在群内发现你需要的文件。");
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "mirai-api-http",
        message: "是否下载最新版本 mirai-api-http？（使用 el-bot 务必安装！）",
      },
    ])
    .then((answers) => {
      const tooltip =
        "可以从群文件中下载 mirai-api-http-*.jar，手动放置到 /plugins 目录下。";

      if (answers["mirai-api-http"]) {
        const miraiApiHttp = new Repo("project-mirai", "mirai-api-http");
        log.info(`若下载较慢，${tooltip}`);
        miraiApiHttp.downloadLatestRelease("./mirai/plugins");
      }
    });
}
