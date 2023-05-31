// import { useContext } from 'react'
// import { SProps, IContext } from 'ssr-types'
// import { IData } from '~/typings/data'
// import { useStoreContext } from 'ssr-common-utils'

import ChildNode from '~/web/components/childNode'

const getToken = async (code) => {
  const params = new URLSearchParams({ code })
  const data = await (await window.fetch(`/api/getToken?${params}`)).json()
  return data
}

export default function Auth () {
  // const { state } = useContext<IContext<IData>>(useStoreContext())
  return <div><ChildNode data={`auth${location.search}`}/></div>
}
