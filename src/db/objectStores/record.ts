import TypeObjectStore from '../type'

const webRecord: TypeObjectStore =
{
  keyPath: 'recordId',
  indexes: ['title', 'personNumber', 'pictureUrl', 'price']
}

const recordObjectStore =
{
  web_record: webRecord
}

export default recordObjectStore
