import axios from "axios";
import fs from "fs";
import { log } from "mirai-ts";
import download from "download";
import ProgressBar from "progress";

/**
 * Repo 类
 */
export default class Repo {
  /**
   * Latest Release 信息链接
   * https://developer.github.com/v3/repos/releases/#get-the-latest-release
   */
  url: string;
  /**
   * 版本
   */
  version: string;
  /**
   * release 下载链接
   */
  browser_download_url: string;
  constructor(public owner: string, public repo: string) {
    this.url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
    this.version = '';
    this.browser_download_url = '';
  }

  async getLatestVersion() {
    const browser_download_url = await axios
      .get(this.url)
      .then((res) => {
        this.version = res.data.tag_name;
        this.browser_download_url = res.data.assets[0].browser_download_url;
        log.info("Latest Version: " + this.version);
        return this.browser_download_url;
      })
      .catch((err) => {
        log.error(err.message);
        log.error("获取最新版本失败");
      });
    return browser_download_url;
  }

  async downloadLatestRelease(dest = ".") {
    if (!this.browser_download_url) {
      const lastestVersion = await this.getLatestVersion();
      if (!lastestVersion) return;
    }

    const filename = this.browser_download_url.split("/").pop();
    const path = dest + "/" + filename;

    if (fs.existsSync(path)) {
      log.error(`${path} 已存在！`);
      return;
    }

    try {
      download(this.browser_download_url, path)
        .on('response', res => {
          const bar = new ProgressBar(`下载至 ${dest} [:bar] :percent (:rate KB/s :total KB) :etas`, {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: 0
          });

          bar.total = parseInt(res.headers['content-length'], 10) / 1000;
          res.on('data', (data: any) => bar.tick(data.length / 8000));
        })
        .then(() => console.log('done'));;
    } catch (err) {
      console.log(err);
    }
  }
};
