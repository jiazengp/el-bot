import type { Bot } from 'el-bot'
import axios from 'axios'
import { utils } from 'el-bot'
import { check } from 'mirai-ts'

let niubiJson: any = null

const niubi = {
  url: 'https://el-bot-api.vercel.app/api/words/niubi',
  match: [
    {
      re: '来点(\\S*)笑话',
    },
    {
      is: 'nb',
    },
  ],
}

/**
 * 获取随机句子
 * @param name
 */
async function getRandomSentence(name: string) {
  let sentence = ''
  if (niubiJson) {
    const index = Math.floor(Math.random() * niubiJson.length)
    sentence = utils.renderString(niubiJson[index], name, 'name')
  }
  else {
    const { data } = await axios.get(niubi.url)
    sentence = utils.renderString(data[0], name, 'name')
  }
  return sentence
}

export interface NiubiOptions {}

export default function (ctx: Bot, _options: NiubiOptions = {}) {
  const { mirai } = ctx

  // 覆盖默认配置
  mirai.on('message', async (msg) => {
    let name = '我'

    if (!utils.isUrl(niubi.url))
      niubiJson = await import(niubi.url)

    niubi.match.forEach(async (obj) => {
      const str = check.match(msg.plain.toLowerCase(), obj)
      if (!str)
        return

      else if (Array.isArray(str) && str[1])
        name = str[1]

      msg.messageChain.some((singleMessage) => {
        if (singleMessage.type === 'At' && singleMessage.display) {
          name = `「${singleMessage.display.slice(1)}」`
          return true
        }
        return false
      })

      const sentence = await getRandomSentence(name)
      msg.reply(sentence)
    })
  })

  // 进群时
  mirai.on('MemberJoinEvent', async (msg) => {
    const sentence = await getRandomSentence(msg.member.memberName)
    mirai.api.sendGroupMessage(sentence, msg.member.group.id)
  })
}
