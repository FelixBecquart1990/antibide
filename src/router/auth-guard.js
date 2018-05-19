import {store} from '../store'

export default (to, from, next) => {
  // check is the user is signed in
  console.log(store.getters.user)
  if (store.getters.user) {
    next('/')
  } else {
    next('/signin')
  }
}
