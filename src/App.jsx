import React from 'react';
import HeaderComp from './components/shared/HeaderComp'
import routes from './app/routes'
import { useRoutes } from 'react-router-dom'

function App() {
  const showRoutes = useRoutes(routes)

  return (
    <div>
      <HeaderComp />
      <div>
        {showRoutes}
      </div>
    </div>
  );
}

export default App;
