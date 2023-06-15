const useLocalStorage = (title: string) => {
  const getSimpleItem = () => {
    return localStorage.getItem(title) as string
  }
  const getJSONItem = () => {
    return JSON.parse(localStorage.getItem(title) as string)
  }
  const addSimpleItem = ( value: string) => {
    localStorage.setItem(title, value)
    return {title, value}
  }
  const addJSONItem = ( value: {}) => {
    localStorage.setItem(title, JSON.stringify(value))
    return {title, value}
  }
  return {getSimpleItem, getJSONItem, addSimpleItem, addJSONItem}
}

export {
  useLocalStorage
}