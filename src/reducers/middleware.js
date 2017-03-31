 export  function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)
    let returnValue = next(action)
    console.log('after dispatch', getState())
    return returnValue
  }
}