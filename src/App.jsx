import React from 'react';
import HeaderComp from './components/shared/HeaderComp'
import routes from './app/routes'
import { Toaster } from 'react-hot-toast'
import { useRoutes } from 'react-router-dom'

function App() {
  const showRoutes = useRoutes(routes)

  return (
    <div >
      <HeaderComp />
      <Toaster position='bottom-center' />
      <div>
        {showRoutes}
      </div>
    </div>
  );
}

export default App;
