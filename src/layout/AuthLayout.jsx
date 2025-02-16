import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto h-screen md:grid md:grid-cols-2 items-center gap-10 p-5">
          <Outlet />  
      </main>
    </>
  )
}

export default AuthLayout;