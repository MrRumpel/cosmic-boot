import { useContext } from 'react'
import { useStoreContext } from 'ssr-common-utils'
import { Input, Button } from 'antd'
import { IData } from '~/typings/data'
import { IContext } from 'ssr-types'

interface ChildState extends IData {
  childSpace?: {
    test: string
  }
}
function ChildNode (props: { fn: Function, data?: string }) {
  const { state, dispatch } = useContext<IContext<ChildState>>(
    useStoreContext()
  )
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch?.({
      type: 'updateContext',
      payload: {
        childSpace: {
          test: e.target.value
        }
      }
    })
  }
  return (
    <div>
      <Input
        value={state?.childSpace?.test ?? ''}
        onChange={handleChange}
        placeholder={props.data ?? '无父级数据'}
      />
      <Button type="primary" onClick={() => props.fn()}>
        测试
      </Button>
    </div>
  )
}

export default ChildNode
