import Discover from "../Components/Discover"
import Hero from "../Components/Hero"
import useFetch from "../utils/useFetch"

function Home() {
  const { recipe, isLoading, error } = useFetch('https://dummyjson.com/recipes')
  return (
    <div>
      <Hero />
      <Discover recipe={ recipe} error={error} isLoading={isLoading} />
    </div>
  )
}

export default Home