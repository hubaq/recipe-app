/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom"
import Loader from "./Loader"
import { useState } from "react"

function Discover({ recipe, error, isLoading }) {
  const [visibleCount, setVisibleCount] = useState(12)


  function handleLoadMore() {
    if (visibleCount < recipe.length) {
      setVisibleCount(prev => prev + 18)

    }
    else if (visibleCount === recipe.length) {
      setVisibleCount(prev => prev - 18)
    }
  }
  return (
    <section className=" w-full flex items-center justify-center py-16">
      <div className="w-[90%] flex flex-col items-start gap-4">
        <div>
          <h1 className="text-3xl text-tertiary">Discover, Create, Share</h1>
          <p className="text-tertiary text-xl">Checkout our most popular recipes!</p>
        </div>
        <div className="w-full flex justify-between items-center flex-wrap">

          {isLoading && <Loader />}
          {recipe.length > 0 ? (
            recipe.slice(0, visibleCount).map(item => (
              <div className="w-96 bg-White shadow-md mt-4 rounded-b-xl" key={item.id}>
                <img src={item.image} alt="" className="rounded-t-xl object-cover" />
                <h2 className="text-tertiary mx-4 my-3 text-lg">{item.name}</h2>
                <div className="flex items-center gap-5 mx-4 my-3">
                  <div className="flex items-center gap-3">
                    <img src='/public/mdi--clock-time-eight-outline 1.svg' alt="" />
                    <p>{item.cookTimeMinutes}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src='/public/mdi--fire.svg' alt="" />
                    <p>{item.caloriesPerServing}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src='/public/mdi--star.svg' alt="" />
                    <p>{item.rating}</p>
                  </div>
                </div>
                <NavLink to={`${item.id}`}>
                  <button className="mb-3 mx-4 bg-secondary px-4 py-2 rounded-md text-White">View</button>
                </NavLink>
              </div>
            ))
          ) : <h1>No Recipe Available Now</h1>}
        </div>
        {recipe.length > 0 && <button className="text-White bg-secondary self-center py-2 px-4" onClick={handleLoadMore}>{visibleCount < 13 ? "Load more" : 'Load less'}</button>}
      </div>
    </section>
  )
}

export default Discover