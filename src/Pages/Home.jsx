/* eslint-disable react/prop-types */
import Discover from "../Components/Discover"
import Hero from "../Components/Hero"
import useFetch from "../utils/useFetch"

function Home({heroRef}) {
  const memorizeProps = useFetch('https://dummyjson.com/recipes')
  const {recipe,error,isLoading} = memorizeProps
  return (
    <div>
      <Hero heroRef={heroRef} />
      <Discover recipe={ recipe} error={error} isLoading={isLoading} />
    </div>
  )
}

export default Home