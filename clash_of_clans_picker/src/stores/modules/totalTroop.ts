import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTotalTroopStore = defineStore('totalTroop', () => {
  const magics = ref<number>(0)
  const machines = ref<number>(0)
  const troops = ref<number>(0)
  //   设置各个分类的总量
  const setTroop = (magic: number, machine: number, troop: number) => {
    machines.value = machine
    troops.value = troop
    magics.value = magic
  }
  const removeTroop = () => {
    setTroop(0, 0, 0)
  }
  return { magics, machines, troops, setTroop, removeTroop }
}, {
  persist: true,
})
