import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function NotFound() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        navigate(`${query}`)
      }
    }, [query])
  })
  return (
    <main className="bg-mainColor w-full h-screen flex items-center justify-center">
      <div className="bg-White  shadow-md w-[40rem] flex flex-col gap-4 px-10 py-16  items-center">
        <h1 className="text-8xl font-extrabold">4<span className="text-secondary">0</span>4</h1>
        <h1 className="text-tertiary font-semibold">THE PAGE YOU REQUESTED COULD NOT BE FOUND</h1>
        <div className="flex gap-4 px-3 py-2 w-[50%] h-10 border-2 border-mainColor rounded-3xl">
          <input type="text" name="" id="" value={query} onChange={(e) => setQuery(e.target.value)} className="h-full text-tertiary" placeholder="search..." />
          <img src="search.svg" alt="" />
        </div>
      </div>
    </main>
  )
}

export default NotFound