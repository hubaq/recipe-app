import { useState } from "react";
import { useEffect } from "react";



const useFetch = (url) => {

    const [recipe, setRecipe] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')


    useEffect(() => {
        async function fetchRecipes() {
            try {
                setIsLoading(true)
                const res = await fetch(url);
                const data = await res.json()
                console.log(data.recipes)
                setRecipe(data.recipes)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchRecipes()
    }, [url])

    return { recipe, isLoading, error }
}

export default useFetch