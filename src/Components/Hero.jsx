
function Hero() {
  return (
    <section className="bg-mainColor w-full flex items-center justify-center py-16 ">
      <div className=" w-full md:w-[85%] pt-24 flex items-center md:items-start md:flex-row flex-col-reverse justify-between">
        <div className="flex flex-col gap-4 items-center md:items-start mt-14">
          <h1 className="text-4xl max-w-[280px] text-center md:text-start md:max-w-[420px] text-tertiary leading-10">Master the Kitchen with Ease: Unleash Your Inner Chef Today!</h1>
          <p className="text-tertiary  text-center md:text-start text-xl max-w-[220px] md:max-w-[280px]">Discover recipes helping you to find the easiest way to cook.</p>
          <button className=" bg-secondary py-2 px-5 text-White rounded-md">Browse Recipes</button>
        </div>
        <div className=" w-72 md:w-80">
          <img src="Salad.png" alt="" />
        </div>
      </div>
    </section>
  )
}

export default Hero