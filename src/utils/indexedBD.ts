export default class DB {
  private dbName: string
  constructor(dbName: string) {
    this.dbName = dbName
  }

  // 打开数据库
  openStore(storeName: string, keyPath: string, indexes?: Array<string>) {
    const request = window.indexedDB.open(this.dbName, 1) // 返回一个对象，包含三个方法：onsuccess、onerror、onupgradeneeded
    request.onsuccess = (event) => {
      console.log('数据库打开成功')
      console.log(event)
    }
    request.onerror = (event) => {
      console.log('数据库打开失败')
      console.log(event)
    }
    request.onupgradeneeded = (event) => { // 初始化时会调用一次
      console.log('数据库升级成功')
      console.log(event)
      // 拿到result对象
      const { result }: any = event.target
      // 创建存储对象
      const store = result.createObjectStore(storeName, { autoIncrement: true, keyPath })
      store.transaction.oncomplete = () => {
        console.log('存储对象创建成功')
      }
      // 创建索引
      if (indexes && indexes.length > 0) {
        indexes.map((index) => {
          store.createIndex(index, index, { unique: true })
        })
      }
    }
  }
}