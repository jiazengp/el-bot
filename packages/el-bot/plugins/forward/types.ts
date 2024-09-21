import { Target } from '../../types'

export type BaseListenType = 'all' | 'master' | 'admin' | 'friend' | 'group'

/**
 * 监听格式
 */
export type Listen = Target | (BaseListenType | number)[]

export interface ForwardItem {
  listen: Listen
  target: Target
}

export type ForwardOptions = ForwardItem[]

export type AllMessageList = Record<number, number[]>
