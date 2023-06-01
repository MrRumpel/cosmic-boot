import { createContext } from 'react'

const state = {
  searchState: {
    text: ''
  }
}
function reducer (state: any, action: any) {
  console.info(state, action)
  switch (action.type) {
    case 'updateSearchValue':
      return { ...state, ...action.payload }
  }
}
export { state, reducer }
export interface ChildState {
  searchState?: {
    text: string
  }
}
export interface RAction {
  type: 'updateSearchValue' // 操作类型
  payload?: ChildState // 操作数
}
export const STORE_CONTEXT = createContext<{
  state: ChildState
  dispatch: React.Dispatch<RAction>
}>({
  state: { searchState: { text: '' } },
  dispatch: () => console.info('testDispatch')
})
