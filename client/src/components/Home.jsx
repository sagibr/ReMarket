function Home() {
  return (
    <main className="h-[89vh] flex items-center justify-center mx-auto max-w-7xl px-4  sm:px-6  lg:px-8  bg-gradient-to-r from-gray-800 to-gray-600">
      <div className=" h-96 sm:text-center lg:text-left flex-col flex justify-between">
        <div>
          <h1 className="text-4xl font-bold flex flex-col tracking-tight text-gray-300 sm:text-5xl md:text-6xl mt-20">
            <span className="block xl:inline">Buy, Sell</span>
            <span className="block text-blue-600 xl:inline">Earn</span>
            <br></br>
            <span className="block text-blue-400 opacity-40 text-3xl text-center">
              The best marketing site in the 🌍
            </span>
          </h1>
        </div>
        <p className="text-black text-center">
          #All rights reserved to Sagi and Noam company
        </p>
      </div>
    </main>
  );
}

export default Home;
