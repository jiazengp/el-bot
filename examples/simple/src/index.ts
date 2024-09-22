import { createBot } from 'el-bot'

export async function main() {
  const bot = await createBot()
  await bot.start()
}

main()
