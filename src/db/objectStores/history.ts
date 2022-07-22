import TypeObjectStore from '../type'

const webRecord: TypeObjectStore =
{
  keyPath: 'historyId',
  indexes: ['title', 'personNumber', 'pictureUrl', 'price']
}

const historyObjectStore =
{
  web_history: webRecord
}

export default historyObjectStore
