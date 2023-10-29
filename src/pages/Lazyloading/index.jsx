import React, { useState, useEffect, useCallback } from 'react';

const Lazyloading = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false); 
  const limit = 15;
  const observerRef = useCallback(
    (node) => {
      if (node !== null) {
        const options = {
          root: null,
          rootMargin: "0px",
          threshold: 1.0,
        };
        const observer = new IntersectionObserver(handleObserver, options);
        observer.observe(node);
      }
    },
    []
  );

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setIsLoading(true);
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoading) {
          
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemonList((prevList) => [...prevList, ...data.results]);
        setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); 
      }
    };

    fetchData();
  }, [offset, isLoading]);

  return (
    <div className="h-screen flex flex-col items-center p-4">
      <div className="container mt-16">
        <h1 className="text-3xl font-bold text-center  mt-5 mb-5">Pokemon</h1>
        <div className="container h-90 overflow-y-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-2xl text-blue-100">Caught</th>
              </tr>
            </thead>
            <tbody className="text-2xl capitalize">
  {pokemonList.map((pokemon, index) => (
    <tr key={pokemon.name} className={index % 2 === 0 ? 'bg-gray-600' : 'bg-gray-700'}>
      <td className="px-4 py-2 text-white">{pokemon.name}</td>
    </tr>
  ))}
</tbody>


          </table>
          {isLoading && (
            <div className="text-center text-5x1 mt-2 mb-2 text-white-500">Catching more pokemon's ...</div>
          )}
          <div ref={observerRef}></div>
        </div>
      </div>
    </div>
  );
};

export default Lazyloading;
