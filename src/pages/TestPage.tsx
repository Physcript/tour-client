import React from 'react'

import CreatePost from '../components/CreatePost'

export interface ITestPage {}

const TestPage = (props: React.FC<ITestPage>) => {
  return (
    <div>
      <CreatePost />
    </div>
  )
}

export default TestPage
