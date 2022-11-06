import { Link } from "react-router-dom"

function Home() {
  return (
    <main className="h-[89vh] w-screen  bg-gradient-to-t from-blue-200  to-white   ">
      <br></br>
      <div className=" h-96 sm:text-center lg:text-left flex-col flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold flex flex-col tracking-tight text-black sm:text-5xl md:text-6xl lg:mt-20 text-center mt-40">
            <span className="block xl:inline">Everything The World</span>
            <span className="block text-blue-600 xl:inline">Has To Offer</span>
            <br></br>
            <span className="block text-gray-400 text-2xl text-center">
              buying and selling on every platform
            </span>
          </h1>
          <Link to={"/products"} className="m-auto mt-20">
            <button className=" mt-10 bg-blue-600 w-fit m-auto text-white rounded-lg px-4 py-2 hover:bg-blue-500">
              Products
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home
