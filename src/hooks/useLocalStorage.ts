const useLocalStorage = () => {
  const getSimpleItem = (title: string) => {
    return localStorage.getItem(title) as string
  }
  const getJSONItem = (title: string) => {
    return JSON.parse(localStorage.getItem(title) as string)
  }
  const addSimpleItem = (title: string, value: string) => {
    localStorage.setItem(title, value)
    return {title, value}
  }
  const addJSONItem = (title: string, value: {}) => {
    localStorage.setItem(title, JSON.stringify(value))
    return {title, value}
  }
  return {getSimpleItem, getJSONItem, addSimpleItem, addJSONItem}
}

export {
  useLocalStorage
}