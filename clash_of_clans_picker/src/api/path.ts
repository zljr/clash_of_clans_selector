import request from '@/utils/request'

export interface Troops {
  name: string
  path: string
  container: number
  category: string
}
export const getAllTroops = () => request.get('/getAllTroops')
