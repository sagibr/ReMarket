import { useSelector } from "react-redux"

function Home() {
  const user = useSelector((state) => state.user.user)

  return (
    <main className="h-[89vh]   mx-auto max-w-7xl px-4  sm:px-6  lg:px-8  bg-gradient-to-r from-gray-800 to-gray-600">
      <br></br>
      <h1 className="text-blue-500 text-xl ">Welcome {user.name}!</h1>
      <div className=" h-96 sm:text-center lg:text-left flex-col flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold flex flex-col tracking-tight text-gray-300 sm:text-5xl md:text-6xl mt-20">
            <span className="block xl:inline">Buy, Sell</span>
            <span className="block text-blue-600 xl:inline">Earn</span>
            <br></br>
            <span className="block text-blue-400 text-3xl text-center">
              The best marketing site in the 🌍
            </span>
          </h1>
        </div>
        <p className="text-black text-center opacity-50 mt-32">
          #All rights reserved to Sagi and Noam the kings company
        </p>
      </div>
    </main>
  )
}

export default Home
