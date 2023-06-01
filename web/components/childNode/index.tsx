import { memo, useContext, useReducer } from 'react'
import { Input, Button } from 'antd'
import { IContext } from 'ssr-types'
import ContextProvide, { Context, RAction } from '~/web/store/number'
import { useStoreContext } from 'ssr-common-utils'
import { ChildState, STORE_CONTEXT } from '~/web/store/search'
import { reducer } from '~/web/store'

const Show = () => {
  const { state } = useContext(Context)!
  return <div>当前数字是：{state.count}</div>
}

const UI: React.FC<{ dispatch: React.Dispatch<RAction> }> = memo((props) => {
  console.log('Increase')
  return <button onClick={() => props.dispatch({ type: 'add' })}> + </button>
})

const Increase = () => {
  const { dispatch } = useContext(Context)!
  return <UI dispatch={dispatch} />
}

const Decrease = () => {
  console.log('Decrease')
  const { dispatch } = useContext(Context)!
  return <button onClick={() => dispatch({ type: 'sub' })}> - </button>
}

const Reset = memo(() => {
  console.log('Reset')
  const { dispatch } = useContext(Context)!
  const initialValue = 8
  return (
    <button onClick={() => dispatch({ type: 'reset', payload: initialValue })}>
      {' '}
      重置{' '}
    </button>
  )
})
function ChildNode (props: { fn: Function, data?: string }) {
  const [store] = useReducer(reducer, { searchState: { text: '' } });
  const { state, dispatch } = useContext(store)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch?.({
      type: 'updateSearchValue',
      payload: {
        searchState: {
          text: e.target.value
        }
      }
    })
  }

  return (
    <div>
      <Input
        value={state?.searchState?.text ?? ''}
        onChange={handleChange}
        placeholder={props.data ?? '无父级数据'}
      />
      <ContextProvide>
        <Show />
        <Increase />
        <Decrease />
        <Reset />
      </ContextProvide>
      <ContextProvide>
        <Show />
        <Increase />
        <Decrease />
        <Reset />
      </ContextProvide>
      <Button type="primary" onClick={() => props.fn()}>
        测试
      </Button>
    </div>
  )
}

export default ChildNode
