
import StartPage from '../pages/StartPage'
import LRPage from '../pages/LRPage'
import PostPage from '../pages/PostPage'

import IRoute from '../interfaces/route'


const mainRoute: IRoute[] = [
  {
    path: '/',
    element: StartPage,
    auth: false
  }
]
const lrRoute: IRoute[] = [
  {
    path: '/register',
    element: LRPage,
    auth: false
  },
  {
    path: '/login',
    element: LRPage,
    auth: false
  }
]

const postRoute: IRoute[] = [
  {
    path: '/panel',
    element: PostPage,
    auth: true
  }
]

const router: IRoute[] = [
  ...mainRoute,
  ...lrRoute,
  ...postRoute
]


export default router
