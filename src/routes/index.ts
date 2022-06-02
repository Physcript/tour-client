
import StartPage from '../pages/StartPage'
import LRPage from '../pages/LRPage'

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


const router: IRoute[] = [
  ...mainRoute,
  ...lrRoute
]


export default router
