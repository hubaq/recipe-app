import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Loader from '../Components/Loader';

function Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState(null); // Initially null
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setIsLoading(true);
        const res = await fetch(`https://dummyjson.com/recipes/${id}`);
        
        // Check for invalid ID (404 or invalid response)
        if (!res.ok) {
          throw new Error("Recipe not found");
        }

        const data = await res.json();
        setRecipe(data);
      } catch (error) {
        console.error(error.message);
        navigate('*'); // Redirect to NotFound page
      } finally {
        setIsLoading(false);
      }
    }

    // Check if the ID is numeric before fetching
    if (isNaN(Number(id))) {
      navigate('*'); // Redirect to NotFound page
    } else {
      fetchRecipe();
    }
  }, [id, navigate]);

  const handleCheckboxChange = (index) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(index)) {
        return prevCheckedItems.filter(item => item !== index);
      } else {
        return [...prevCheckedItems, index];
      }
    });
  };

  if (isLoading) return <Loader />;
  if (!recipe) return null; // Avoid rendering until recipe data is loaded

  return (
    <main className="w-full flex items-center justify-center p-6">
      <div className=" w-full md:w-[60%] flex flex-col items-start gap-4">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-4xl text-tertiary">{recipe.name}</h1>
          <div className="flex items-center justify-start gap-5">
            <div className="flex items-center gap-3">
              <img src='/public/mdi--clock-time-eight-outline 1.svg' alt="" />
              <p>{recipe.cookTimeMinutes}</p>
            </div>
            <div className="flex items-center gap-3">
              <img src='/public/mdi--fire.svg' alt="" />
              <p>{recipe.caloriesPerServing}</p>
            </div>
            <div className="flex items-center gap-3">
              <img src='/public/mdi--star.svg' alt="" />
              <p>{recipe.rating}</p>
            </div>
          </div>
        </div>
        <img src={recipe.image} className="w-full h-96 object-cover" alt="" />
        <h2 className="text-2xl text-tertiary mt-7">Ingredients</h2>
        <div className="grid md:grid-cols-2 gap-4 w-[40rem]">
          {recipe.ingredients?.map((item, i) => (
            <div className="flex gap-3 items-center" key={i}>
              <input
                type="checkbox"
                className="appearance-none w-4 h-4 rounded-full checked:bg-secondary ring-2 ring-secondary cursor-pointer ring-offset-2"
                checked={checkedItems.includes(i)}
                onChange={() => handleCheckboxChange(i)}
              />
              <p className={`text-base text-tertiary text-wrap ${checkedItems.includes(i) ? 'line-through' : ''}`}>
                {item}
              </p>
            </div>
          ))}
        </div>
        <h2 className="text-2xl text-tertiary mt-7">Instructions</h2>
        <div className="flex flex-col gap-5 w-full">
          {recipe.instructions?.map((instruction, i) => (
            <div className="flex items-start gap-5" key={i}>
              <span className="text-medium text-White bg-secondary w-6 flex flex-wrap items-center justify-center h-6 rounded-full">{i + 1}</span>
              <p className='text-tertiary w-[80%]'>{instruction}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Recipe;
