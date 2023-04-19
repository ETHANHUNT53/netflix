import React, { useEffect, useState } from 'react'
import './Home.scss'
import axios from 'axios'
import { Link } from 'react-router-dom';

const apiKey = "410fc96a1a6ca8693d2ab617401f1632";
const url = "https://api.themoviedb.org/3/movie";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying="now_playing";
const popular="popular";
const topRated="top_rated";


const Card = ({ img }) => (
  <img className='card' src={img} alt='cover'></img>
)

const Row = ({ title, arr = [{
  
}] }) => (
  <div className='row'>
    <h2>{title}</h2>
    <div>

      {
        arr.map((item, index) => (
          <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
        ))
      }

    </div>

  </div>

)


const Home = () => {

const [upcomingMovies,setUpcomingMovies]= useState([]);
const [nowPlayingMovies,setNowPlayingMovies]= useState([]);
const [popularMovies,setPopularMovies]= useState([]);
const [topRatedMovies,setTopRatedMovies]= useState([]);
const [genre , setGenre] = useState([]);

  useEffect(() => {

    const fetchUpcoming = async () => {
      const { data: { results } } = await axios.get(`${url}/${upcoming}?api_key=${apiKey}`)
      
      setUpcomingMovies(results)
    };

    const fetchNowPlaying = async () =>{
      const {data: {results}} = await axios.get(`${url}/${nowPlaying}?api_key=${apiKey}`)

      setNowPlayingMovies(results);
    };

    const fetchPopular = async () =>{
      const {data: {results}} = await axios.get(`${url}/${popular}?api_key=${apiKey}`)
      setPopularMovies(results);
    };
    const fetchTopRated = async () =>{
      const {data: {results}} = await axios.get(`${url}/${topRated}?api_key=${apiKey}`)
      setTopRatedMovies(results);
    };
    const getAllGenre = async () =>{
      const {data: {genres}} = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
      setGenre(genres);
    };

    getAllGenre();
    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
  })


  return (
    <section className="home">
      
          
      

      <Row title={"Upcoming "} arr={upcomingMovies}/>
      <Row title={"Now Playing"} arr={nowPlayingMovies}/>
      <Row title={"Popular"} arr={popularMovies}/>
      <Row title={"Top Rated"} arr={topRatedMovies}/>
      
      <div className="genreBox">

        {genre.map((item)=>(

              <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))

        }
      </div>


    </section>
  )
}

export default Home