import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './Layout'
import { routes, routeArray } from './config/routes'

function App() {
  return (
    <BrowserRouter>
      <div className="bg-background-dark text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to={routes.channels.path} replace />} />
{routeArray.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={<route.component />}
              />
            ))}
            <Route path="/direct/:userId" element={<routes.direct.component />} />
            <Route path="/direct/group/:groupId" element={<routes.direct.component />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          className="z-[9999]"
        />
      </div>
    </BrowserRouter>
  )
}

export default App