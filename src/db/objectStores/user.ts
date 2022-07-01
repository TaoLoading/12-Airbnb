import TypeObjectStore from '../type'

const webUser: TypeObjectStore =
{
  keyPath: 'userId',
  indexes: ['mobile', 'password', 'status']
}

const userObjectStore =
{
  web_user: webUser
}

export default userObjectStore
