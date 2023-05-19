import { defineStore } from 'pinia'

export interface SessionStore {
  userId: string | null
}

export const useSessionStore = defineStore('session', {
  state: (): SessionStore => ({
    userId: null,
  }),

  actions: {
    setUserId(userId: string) {
      this.userId = userId
    },
  },
})
