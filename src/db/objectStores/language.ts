import TypeObjectStore from '../type'

const webLang: TypeObjectStore =
{
  keyPath: 'id',
  indexes: ['name']
}

const languageObjectStore = {
  language: webLang
}

export default languageObjectStore
