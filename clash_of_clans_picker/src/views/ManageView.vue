<script setup lang="ts">
import type { Troops } from '@/api/path'
import { getAllTroops } from '@/api/path'
import { useSingleTroopStore, useTotalTroopStore } from '@/stores'
import { Minus, Plus } from '@element-plus/icons-vue'
import { computed, onBeforeMount, ref } from 'vue'

const selectOptions = [
  {
    value: 'magics',
    label: '法术',
  },
  {
    value: 'machines',
    label: '机器',
  },
  {
    value: 'troops',
    label: '普通兵',
  },
  {
    value: 'super_troops',
    label: '超级兵',
  },
]

const singleTroopsStore = useSingleTroopStore()
const troopsCount = ref(singleTroopsStore.troop)

const loading = ref(false)
const value = ref('')
const categorys = ref('troops')
// 公共路径
const BASE_MAGICS_URL = '/images/magics/'
const BASE_TROOPS_URL = '/images/troops/'
const BASE_MACHINES_URL = '/images/machines/'
const BASE_SUPER_TROOPS_URL = '/images/super_troops/'

// 兵种最大空间
// 以国服无月卡16本为基准
const MAX_MAGICS_SPACE = 22
const MAX_TROOPS_SPACE = 640
const MAX_MACHINES_SPACE = 6

const totalTroopStore = useTotalTroopStore()
const selectMagicsSpace = ref(totalTroopStore.magics)
const selectMachinesSpace = ref(totalTroopStore.machines)
const selectTroopsSpace = ref(totalTroopStore.troops)

function handleSelectChange(value: string) {
  console.log(value)
  categorys.value = value
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}

// 添加兵种
function handleAdd(container: number, category: string, name: string) {
  // singleTroopsStore.setSingleTroop(troopsCount.value)
  switch (category) {
    case 'magics':
      if (selectMagicsSpace.value + container > MAX_MAGICS_SPACE) {
        ElMessage.error(`添加失败，超出最大${selectOptions[0].label}空间`)
      }
      else {
        selectMagicsSpace.value += container
        totalTroopStore.setTroop(selectMagicsSpace.value, selectMachinesSpace.value, selectTroopsSpace.value)
        singleTroopsStore.setSingleTroopCount(name)
        ElMessage.success(`添加${name}成功`)
      }
      break
    case 'machines':
      if (selectMachinesSpace.value + container > MAX_MACHINES_SPACE) {
        ElMessage.error(`添加失败，超出最大${selectOptions[1].label}空间`)
      }
      else {
        selectMachinesSpace.value += container
        totalTroopStore.setTroop(selectMagicsSpace.value, selectMachinesSpace.value, selectTroopsSpace.value)
        singleTroopsStore.setSingleTroopCount(name)
        ElMessage.success(`添加${name}成功`)
      }
      break
    case 'troops':
      if (selectTroopsSpace.value + container > MAX_TROOPS_SPACE) {
        ElMessage.error('添加失败，超出最大兵种空间')
      }
      else {
        selectTroopsSpace.value += container
        totalTroopStore.setTroop(selectMagicsSpace.value, selectMachinesSpace.value, selectTroopsSpace.value)
        singleTroopsStore.setSingleTroopCount(name)
        ElMessage.success(`添加${name}成功`)
      }
      break
    case 'super_troops':
      if (selectTroopsSpace.value + container > MAX_TROOPS_SPACE) {
        ElMessage.error('添加失败，超出最大兵种空间')
      }
      else {
        selectTroopsSpace.value += container
        totalTroopStore.setTroop(selectMagicsSpace.value, selectMachinesSpace.value, selectTroopsSpace.value)
        singleTroopsStore.setSingleTroopCount(name)
        ElMessage.success(`添加${name}成功`)
      }
      break
  }
}

// 删除兵种
function handleMinus(container: number, category: string, name: string) {
  // singleTroopsStore.setSingleTroop(troopsCount.value)
  switch (category) {
    case 'magics':
      if (selectMagicsSpace.value - container < 0) {
        ElMessage.error(`删除失败，低于最小${selectOptions[0].label}空间`)
      }
      else if (singleTroopsStore.getSingleTroopCount(name) === 0) {
        ElMessage.error('删除失败，该兵种已选择的数量为0')
      }
      else {
        selectMagicsSpace.value -= container
        totalTroopStore.setTroop(selectMagicsSpace.value, selectMachinesSpace.value, selectTroopsSpace.value)
        singleTroopsStore.setMinusSingleTroopCount(name)
        ElMessage.success(`删除${name}成功`)
      }
      break
    case 'machines':
      if (selectMachinesSpace.value - container < 0) {
        ElMessage.error(`删除失败，低于最小${selectOptions[1].label}空间`)
      }
      else if (singleTroopsStore.getSingleTroopCount(name) === 0) {
        ElMessage.error('删除失败，该兵种已选择的数量为0')
      }
      else {
        selectMachinesSpace.value -= container
        totalTroopStore.setTroop(selectMagicsSpace.value, selectMachinesSpace.value, selectTroopsSpace.value)
        singleTroopsStore.setMinusSingleTroopCount(name)
        ElMessage.success(`删除${name}成功`)
      }
      break
    case 'troops':
      if (selectTroopsSpace.value - container < 0) {
        ElMessage.error('删除失败，低于最小兵种空间')
      }
      else if (singleTroopsStore.getSingleTroopCount(name) === 0) {
        ElMessage.error('删除失败，该兵种已选择的数量为0')
      }
      else {
        selectTroopsSpace.value -= container
        totalTroopStore.setTroop(selectMagicsSpace.value, selectMachinesSpace.value, selectTroopsSpace.value)
        singleTroopsStore.setMinusSingleTroopCount(name)
        ElMessage.success(`删除${name}成功`)
      }
      break
    case 'super_troops':
      if (selectTroopsSpace.value - container < 0) {
        ElMessage.error('删除失败，低于最小兵种空间')
      }
      else if (singleTroopsStore.getSingleTroopCount(name) === 0) {
        ElMessage.error('删除失败，该兵种已选择的数量为0')
      }
      else {
        selectTroopsSpace.value -= container
        totalTroopStore.setTroop(selectMagicsSpace.value, selectMachinesSpace.value, selectTroopsSpace.value)
        singleTroopsStore.setMinusSingleTroopCount(name)
        ElMessage.success(`删除${name}成功`)
      }
  }
}

// 所有兵种
const allTroops = ref<Troops[]>([])
// 清除所有已选兵种
function handleDelete() {
  selectMagicsSpace.value = 0
  selectMachinesSpace.value = 0
  selectTroopsSpace.value = 0
  totalTroopStore.setTroop(0, 0, 0)
  singleTroopsStore.removeSingleTroop()
  ElMessage.success('清除成功')
}
// 分类的兵种
const magics_images = ref<Troops[]>([])
const troops_images = ref<Troops[]>([])
const machines_images = ref<Troops[]>([])
const super_troops_images = ref<Troops[]>([])
function divideIntoGroups(images: Troops[]) {
  const groups = []
  for (let i = 0; i < images.length; i += 6) {
    groups.push(images.slice(i, i + 6))
  }
  return groups
}
const groupMagics = computed(() => divideIntoGroups(magics_images.value))
const groupTroops = computed(() => divideIntoGroups(troops_images.value))
const groupMachines = computed(() => divideIntoGroups(machines_images.value))
const groupSuperTroops = computed(() => divideIntoGroups(super_troops_images.value))
onBeforeMount(async () => {
  const res = await getAllTroops()
  allTroops.value = res.data
  troopsCount.value = allTroops.value.map((item: Troops) => ({ ...item, count: 0 }))
  console.log(troopsCount.value)
  // singleTroopsStore.setSingleTroop(troopsCount.value)
  divideIntoCategories(allTroops.value)
})
function divideIntoCategories(troops: Troops[]) {
  troops.forEach((item) => {
    if (item.category === 'magics') {
      magics_images.value.push(item)
    }
    else if (item.category === 'machines') {
      machines_images.value.push(item)
    }
    else if (item.category === 'troops') {
      troops_images.value.push(item)
    }
    else if (item.category === 'super_troops') {
      super_troops_images.value.push(item)
    }
  })
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="header">
          <h1>部落冲突兵种空间计算</h1>
          <div style="align-self: flex-end;position: fixed;z-index: 999;font-size: 20px;">
            法术总量：{{ selectMagicsSpace }} |
            兵种总量：{{ selectTroopsSpace }} |
            攻城机器总量： {{ selectMachinesSpace }}
          </div>
        </div>
      </el-header>
      <el-container>
        <el-main v-loading="loading">
          <div style="display: flex;align-items: center;height: 100px;">
            <div style="align-self: flex-start;">
              <el-select
                v-model="value"
                filterable
                placeholder="请选择"
                style="width: 240px;"
                @change="handleSelectChange(value)"
              >
                <el-option
                  v-for="item in selectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div style="margin: 0 20px;padding-bottom: 68px;">
              <el-button type="danger" @click="handleDelete">
                清除已选兵种
              </el-button>
            </div>
          </div>

          <div v-show="categorys === 'magics'">
            <el-row v-for="(group, index) in groupMagics" :key="index" :gutter="20">
              <el-col v-for="item in group" :key="item.name" :span="4">
                <el-card>
                  <el-container>
                    <el-header style="display: flex;justify-content: center;align-items: center;margin: 20px 0 0 0;">
                      <el-tooltip placement="right" effect="light">
                        <template #content>
                          名称：{{ item.name }}<br>
                          空间：{{ item.container }}
                        </template>
                        <el-badge :value="singleTroopsStore.getSingleTroopCount(item.name)" class="item" color="green">
                          <div v-show="selectMagicsSpace + item.container > MAX_MAGICS_SPACE" class="overlay" />
                          <img :src="BASE_MAGICS_URL + item.path" style="width: 80px; height: 80px; cursor: pointer;" alt="">
                        </el-badge>
                      </el-tooltip>
                    </el-header>
                    <el-main style="display: flex;justify-content: center;align-items: center;">
                      <el-button type="primary" plain @click="handleAdd(item.container, item.category, item.name) ">
                        <el-icon><Plus /></el-icon>
                      </el-button>
                      {{ singleTroopsStore.getSingleTroopCount(item.name) }}
                      <el-button type="danger" plain @click="handleMinus(item.container, item.category, item.name)">
                        <el-icon><Minus /></el-icon>
                      </el-button>
                    </el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <div v-show="categorys === 'machines'">
            <el-row v-for="(group, index) in groupMachines" :key="index" :gutter="20">
              <el-col v-for="item in group" :key="item.name" :span="4">
                <el-card>
                  <el-container>
                    <el-header style="display: flex;justify-content: center;align-items: center;margin: 20px 0 0 0;">
                      <el-tooltip placement="right" effect="light">
                        <template #content>
                          名称：{{ item.name }}<br>
                          空间：{{ item.container }}
                        </template>
                        <el-badge :value="singleTroopsStore.getSingleTroopCount(item.name)" class="item" color="green">
                          <div v-show="selectMachinesSpace + item.container > MAX_MACHINES_SPACE" class="overlay" />
                          <img :src="BASE_MACHINES_URL + item.path" style="width: 80px; height: 80px; cursor: pointer;" alt="">
                        </el-badge>
                      </el-tooltip>
                    </el-header>
                    <el-main style="display: flex;justify-content: center;align-items: center;">
                      <el-button type="primary" plain @click="handleAdd(item.container, item.category, item.name)">
                        <el-icon><Plus /></el-icon>
                      </el-button>
                      {{ singleTroopsStore.getSingleTroopCount(item.name) }}
                      <el-button type="danger" plain @click="handleMinus(item.container, item.category, item.name)">
                        <el-icon><Minus /></el-icon>
                      </el-button>
                    </el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <div v-show="categorys === 'troops'">
            <el-row v-for="(group, index) in groupTroops" :key="index" :gutter="20">
              <el-col v-for="item in group" :key="item.name" :span="4">
                <el-card>
                  <el-container>
                    <el-header style="display: flex;justify-content: center;align-items: center;margin: 20px 0 0 0;">
                      <el-tooltip placement="right" effect="light">
                        <template #content>
                          名称：{{ item.name }}<br>
                          空间：{{ item.container }}
                        </template>
                        <el-badge :value="singleTroopsStore.getSingleTroopCount(item.name)" class="item" color="green">
                          <div v-show="selectTroopsSpace + item.container > MAX_TROOPS_SPACE" class="overlay" />
                          <img :src="BASE_TROOPS_URL + item.path" style="width: 80px; height: 80px; cursor: pointer;" alt="">
                        </el-badge>
                      </el-tooltip>
                    </el-header>
                    <el-main style="display: flex;justify-content: center;align-items: center;">
                      <el-button type="primary" plain @click="handleAdd(item.container, item.category, item.name)">
                        <el-icon><Plus /></el-icon>
                      </el-button>
                      {{ singleTroopsStore.getSingleTroopCount(item.name) }}
                      <el-button type="danger" plain @click="handleMinus(item.container, item.category, item.name)">
                        <el-icon><Minus /></el-icon>
                      </el-button>
                    </el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <div v-show="categorys === 'super_troops'">
            <el-row v-for="(group, index) in groupSuperTroops" :key="index" :gutter="20">
              <el-col v-for="item in group" :key="item.name" :span="4">
                <el-card>
                  <el-container>
                    <el-header style="display: flex;justify-content: center;align-items: center;margin: 20px 0 0 0;">
                      <el-tooltip placement="right" effect="light">
                        <template #content>
                          名称：{{ item.name }}<br>
                          空间：{{ item.container }}
                        </template>
                        <el-badge :value="singleTroopsStore.getSingleTroopCount(item.name)" class="item" color="green">
                          <div v-show="selectTroopsSpace + item.container > MAX_TROOPS_SPACE" class="overlay" />
                          <img :src="BASE_SUPER_TROOPS_URL + item.path" style="width: 80px; height: 80px; cursor: pointer;" alt="">
                        </el-badge>
                      </el-tooltip>
                    </el-header>
                    <el-main style="display: flex;justify-content: center;align-items: center;">
                      <el-button type="primary" plain @click="handleAdd(item.container, item.category, item.name)">
                        <el-icon><Plus /></el-icon>
                      </el-button>
                      {{ singleTroopsStore.getSingleTroopCount(item.name) }}
                      <el-button type="danger" plain @click="handleMinus(item.container, item.category, item.name)">
                        <el-icon><Minus /></el-icon>
                      </el-button>
                    </el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <el-backtop :right="30" :bottom="100" />
</template>

<style scoped lang="less">
  .common-layout {
    .header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      h1 {
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }
    }
  }
  .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
}
</style>
