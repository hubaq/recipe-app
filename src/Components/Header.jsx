import { NavLink } from "react-router-dom"

function Header() {
  return (
    <header className="w-full p-5 bg-White border-b-2 border-mainColor font-Montserrat flex items-center justify-center">
      <div className=" w-full md:w-[85%] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="nuxt.svg" alt="" width={'50px'}/>
          <h1 className="text-2xl hidden md:block text-tertiary font-medium">Nuxtcipes</h1>
       </div>
        <NavLink to='/recipes'>
           <h1 className="text-xl cursor-pointer hover:text-secondary transition-colors duration-150 text-tertiary font-medium">Home</h1>
       </NavLink>
      </div>
    </header>
  )
}

export default Header