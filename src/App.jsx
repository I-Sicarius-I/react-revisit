import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
    method: "GET",
    headers : {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {

    const [searchTerm, setSearchTerm] = useState("")
    const [movieList, setMovieList] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true)
            setErrorMessage('')

            try{

                //try how Spinner looks
                // const sleep = ms => new Promise(r => setTimeout(r, ms))
                // await sleep(1000)

                const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

                const response = await fetch(endpoint, API_OPTIONS);
                
                if(!response.ok){
                    throw new Error('Failed to fetch movies.')
                }

                const data = await response.json();

                if(data.success === false){
                    setErrorMessage(data.error || 'Failed to fetch movies');
                    setMovieList([])
                    return;
                }

                setMovieList(data.results || [])
            }
            catch(e)
            {
                console.error(`Error fetching movies: ${e}`);
                setErrorMessage('Error fetching movies. Please try again later.')
            }
            finally
            {
                setIsLoading(false)
            }
        };

        fetchMovies();
    }, [])

    return (
        <main>
            <div className="pattern"></div>

            <div className="wrapper">

                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>
                        Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle
                    </h1>
                </header>

                <section className='all-movies'>

                    <h2 className='mt-[40px]'>
                        All Movies
                    </h2>

                    {isLoading ? (
                        <Spinner/>
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <p key={movie.id} className='text-white'>{movie.title}</p>
                            ))}
                        </ul>
                    )}
                </section>


                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </div>
        </main>
    )
}

export default App
