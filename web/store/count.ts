const state = {
  countState: {
    value: 0
  }
}
function reducer (state: any, action: any) {
  switch (action.type) {
    case 'updateCountValue':
      return { ...state, ...action.payload }
  }
}
export {
  state,
  reducer
}
