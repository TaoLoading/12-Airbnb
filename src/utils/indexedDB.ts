export default class DB {
  // 数据库名称
  private dbName: string
  // 数据库对象
  private db: any
  constructor(dbName: string) {
    this.dbName = dbName
  }

  // 打开数据库
  openStore(stores: any) {
    const request = window.indexedDB.open(this.dbName, 1) // 返回一个对象，包含三个方法：onsuccess、onerror、onupgradeneeded
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        // console.log('数据库打开成功')
        // 获取数据库对象
        this.db = event.target.result
        // 处理resolve，保证Promise的执行
        resolve(true)
      }
      request.onerror = (event) => {
        // console.log('数据库打开失败')
        reject(false)
      }
      request.onupgradeneeded = (event) => { // 初始化时会调用一次
        // console.log('数据库升级成功')
        // 获取result对象
        const { result }: any = event.target

        // 初始化多个store仓库
        for (const storeName in stores) {
          const { keyPath, indexes } = stores[storeName]
          // 没有表则新建表
          if (!result.objectStoreNames.contains(storeName)) {
            // keyPath：主键，主键（key）是默认建立索引的属性； autoIncrement：是否自增；createObjectStore会返回一个对象仓库objectStore(即新建一个表)
            const store = result.createObjectStore(storeName, { autoIncrement: true, keyPath })
            if (indexes && indexes.length) {
              indexes.map((v: string) =>
                // createIndex可以新建索引，unique字段是否唯一
                store.createIndex(v, v, { unique: false })
              )
            }
            store.transaction.oncomplete = (e: any) => {
              // console.log('创建对象仓库成功')
            }
          }
        }
      }
    })
  }

  // 新增/修改数据
  updateItem(storeName: string, data: any) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.put({
        ...data,
        addTime: new Date().getTime()
      })
      request.onsuccess = (event: any) => {
        // console.log('数据库写入成功')
        resolve(event)
      }
      request.onerror = (event: any) => {
        // console.log('数据库写入失败')
        reject(event)
      }
    })
  }

  // 删除数据
  deleteItem(storeName: string, key: number | string) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.delete(key)
      request.onsuccess = (event: any) => {
        // console.log('删除数据成功')
        resolve(event)
      }
      request.onerror = (event: any) => {
        // console.log('删除数据失败')
        reject(event)
      }
    })
  }

  // 查询全部数据
  getList(storeName: string) {
    const store = this.db.transaction([storeName]).objectStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = (event: any) => {
        // console.log('全部数据查询成功')
        resolve(event.target.result)
      }
      request.onerror = (event: any) => {
        // console.log('全部数据查询失败')
        reject(event)
      }
    })
  }

  // 查询单条数据
  getItem(storeName: string, key: number | string) {
    const store = this.db.transaction([storeName]).objectStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.get(key)
      request.onsuccess = (event: any) => {
        // console.log('单条数据查询成功')
        resolve(event.target.result)
      }
      request.onerror = (event: any) => {
        // console.log('单条数据查询失败')
        reject(event)
      }
    })
  }
}
