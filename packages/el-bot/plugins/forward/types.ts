import { ListenTarget, Target } from '../../types'

export type BaseListenType = 'all' | 'master' | 'admin' | 'friend' | 'group'

export interface ForwardItem {
  listen: ListenTarget
  target: Target
}

export type ForwardOptions = ForwardItem[]

export type AllMessageList = Record<number, number[]>
