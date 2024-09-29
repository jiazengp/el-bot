import consola from 'consola'
import { AvailableIntentsEventsEnum, createOpenAPI, createWebsocket, GetWsParam, IMessage, SessionEvents } from 'qq-guild-bot'

export type EventType = keyof typeof SessionEvents | keyof typeof AvailableIntentsEventsEnum

export interface BaseEventType {
  eventType: EventType
  eventId: string
}

export interface EventTypesMap {
  GUILD_MESSAGES: BaseEventType & {
    msg: IMessage
  }
  [key: string]: BaseEventType
}

/**
 * fix qq-guild-bot types
 */
export interface QQWebsocketClient extends ReturnType<typeof createWebsocket> {
  on: <T extends EventType>(eventName: T, callback: (data: EventTypesMap[T]) => void) => void
}

/**
 * QQ 机器人平台
 */
export function createQqSDK(qqConfig: GetWsParam) {
  const client = createOpenAPI(qqConfig)
  consola.success('🐧 已创建 QQ Client')

  const ws = createWebsocket(qqConfig) as QQWebsocketClient

  ws.on('READY', (_data) => {
    consola.success('🐧 QQ Websocket 已连接')
  })
  consola.success('🐧 已创建 QQ Websocket 链接')

  return {
    client,
    ws,
  }
}
