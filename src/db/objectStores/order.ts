import TypeObjectStore from '../type'

const webOrder: TypeObjectStore =
{
  keyPath: 'orderId',
  indexes: ['title', 'personNumber', 'pictureUrl', 'price']
}

const orderObjectStore =
{
  web_order: webOrder
}

export default orderObjectStore
