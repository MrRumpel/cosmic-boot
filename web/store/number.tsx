import React, { createContext, useReducer } from 'react'

export interface RState {
  count: number
}
export interface RAction {
  type: 'add' | 'sub' | 'reset' // 操作类型
  payload?: number // 操作数
}

export const reducer = (state: RState, action: RAction) => {
  switch (action.type) {
    case 'add':
      return { count: state.count + 1 }
    case 'sub':
      return { count: state.count > 0 ? state.count - 1 : 0 }
    case 'reset':
      return { count: action.payload ? action.payload : 0 }
  }
}

// 创建context，约定数据类型，设置初始值
export const Context = createContext<{
  state: RState
  dispatch: React.Dispatch<RAction>
} | null>(null)

// ContextProvide组件
const ContextProvide: React.FC<{
  children: React.ReactNode[]
}> = (props) => {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return <Context.Provider value={{ state, dispatch }}>
    {props.children}
  </Context.Provider>

}

export default ContextProvide
