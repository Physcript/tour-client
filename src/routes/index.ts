
import StartPage from '../pages/StartPage'
import LRPage from '../pages/LRPage'


import IRoute from '../interfaces/route'
import TestPage from '../pages/TestPage'


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

const testRoute: IRoute[] = [
  {
    path: '/test',
    element: TestPage,
    auth: false
  }
]

const router: IRoute[] = [
  ...mainRoute,
  ...lrRoute,
  ...testRoute
]


export default router
