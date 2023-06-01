// 用户自定义 store，用法查看文档 http://doc.ssr-fc.com/docs/features$communication#React%20%E5%9C%BA%E6%99%AF
import { state as countState, reducer as countReducer } from './count'
import { state as searchState, reducer as searchReducer } from './search'

const state = {
  ...countState,
  ...searchState
}

function reducer (state: any, action: any) {
  // 调用多个 reducer 并将新的 state 返回
  // 如果你有更好的写法，欢迎与我们讨论
  return countReducer(state, action) || searchReducer(state, action)

}

export {
  state,
  reducer
}
