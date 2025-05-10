import type { Troops } from '@/api/path'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type troopCount = Troops & { count: number }
export const useSingleTroopStore = defineStore('singleTroop', () => {
  const troop = ref<troopCount[]>([])
  const setSingleTroop = (troops: any) => {
    troop.value = troops
    console.log(troop)
  }
  const getSingleTroopCount = (name: string) => {
    return troop.value.find(item => item.name === name)?.count || 0
  }
  const setSingleTroopCount = (name: string) => {
    troop.value.forEach((item) => {
      if (item.name === name) {
        item.count++
      }
    })
  }
  const setMinusSingleTroopCount = (name: string) => {
    troop.value.forEach((item) => {
      if (item.name === name) {
        item.count--
      }
    }) 
  }
  const removeSingleTroop = () => {
    troop.value.forEach((item) => {
      item.count = 0
    })
  }
  return { troop, getSingleTroopCount, setSingleTroop, removeSingleTroop, setSingleTroopCount, setMinusSingleTroopCount }
}, {
  persist: true,
})
