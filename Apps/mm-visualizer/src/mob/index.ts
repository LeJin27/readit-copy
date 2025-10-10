
export interface Mob {
  id: string
  name: string
  size: number
  image?: string
  description?: string
  last_update?: string
}

export interface NewMob {
  name?: string
  size?: number
  image?: string
  description?: string
}
