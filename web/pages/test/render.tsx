// import { useContext } from 'react'
// import { SProps, IContext } from 'ssr-types'
// import { IData } from '~/typings/data'
// import { useStoreContext } from 'ssr-common-utils'
import { Input, Row, Col, Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import ChildNode from '~/web/components/childNode'

const getToken = async (code) => {
  const params = new URLSearchParams({ code })
  const data = await (await window.fetch(`/api/getToken?${params}`)).json()
  return data
}

const goLogin = async (username, pass) => {
  const params = new URLSearchParams({ username, pass })
  const data = await (await window.fetch(`/api/login?${params}`)).json()
  return data
}

export default function Test () {
  // const { state } = useContext<IContext<IData>>(useStoreContext())
  const [username, setUsername] = React.useState('')
  const [pass, setPass] = React.useState('')
  const history = useHistory()
  return (
    <div>
      <Row>
        <Col span={4}>
          <ChildNode data='test' />
        </Col>
        <Col span={4}>
          <Input
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Col>
        <Col span={4}>
          <Input.Password
            placeholder="密码"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            onClick={async () =>
              await goLogin(username, pass).then((token) =>
                history.push(`/auth?token=${token.data}`)
              )
            }
          >
            登录
          </Button>
        </Col>
      </Row>
    </div>
  )
}
