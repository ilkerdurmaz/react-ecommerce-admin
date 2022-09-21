import React from 'react';
import HeaderComp from './components/shared/HeaderComp'
import { Toaster } from 'react-hot-toast'
import { useRoutes } from 'react-router-dom'
import routes from './app/routes'

function App() {
  const showRoutes = useRoutes(routes)

  return (
    <div >
      <HeaderComp />
      <Toaster position='top-right' />
      <div>
        {showRoutes}
      </div>
    </div>
  );
}

export default App;
