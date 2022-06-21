export default class DB {
  // 数据库名称
  private dbName: string
  // 数据库对象
  private db: any
  constructor(dbName: string) {
    this.dbName = dbName
  }

  // 打开数据库
  openStore(storeName: string, keyPath: string, indexes?: Array<string>) {
    const request = window.indexedDB.open(this.dbName, 1) // 返回一个对象，包含三个方法：onsuccess、onerror、onupgradeneeded
    request.onsuccess = (event: any) => {
      console.log('数据库打开成功')
      console.log(event)
      // 获取数据库对象
      this.db = event.target.result
    }
    request.onerror = (event) => {
      console.log('数据库打开失败')
      console.log(event)
    }
    request.onupgradeneeded = (event) => { // 初始化时会调用一次
      console.log('数据库升级成功')
      console.log(event)
      // 获取result对象
      const { result }: any = event.target
      // 创建存储对象
      const store = result.createObjectStore(storeName, { autoIncrement: true, keyPath })
      store.transaction.oncomplete = () => {
        console.log('存储对象创建成功')
      }
      // 创建索引
      if (indexes && indexes.length > 0) {
        indexes.map((index) => {
          store.createIndex(index, index, { unique: false })
        })
      }
    }
  }

  // 新增/修改数据
  updateItem(storeName: string, data: any) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.put({
      ...data,
      addTime: new Date().getTime()
    })
    request.onsuccess = (event: any) => {
      console.log('数据库写入成功')
      console.log(event)
    }
    request.onerror = (event: any) => {
      console.log('数据库写入失败')
      console.log(event)
    }
  }

  // 删除数据
  deleteItem(storeName: string, key: number | string) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.delete(key)
    request.onsuccess = (event: any) => {
      console.log('删除数据成功')
      console.log(event)
    }
    request.onerror = (event: any) => {
      console.log('删除数据失败')
      console.log(event)
    }
  }

  // 查询全部数据
  getList(storeName: string) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.getAll()
    request.onsuccess = (event: any) => {
      console.log('全部数据查询成功')
      console.log(event.target.result)
    }
    request.onerror = (event: any) => {
      console.log('全部数据查询失败')
      console.log(event)
    }
  }

  // 查询单条数据
  getItem(storeName: string, key: number | string) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.get(key)
    request.onsuccess = (event: any) => {
      console.log('单条数据查询成功')
      console.log(event.target.result)
    }
    request.onerror = (event: any) => {
      console.log('单条数据查询失败')
      console.log(event)
    }
  }
}