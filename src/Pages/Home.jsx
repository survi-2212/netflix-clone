import React from "react";
import Banner from "../Components/Banner/Banner";
import Navbar from "../Components/Navbar/Navbar";
import Row from "../Components/Row/Row";
import requests from "../Components/Axios/request";

function Home() {
  return (
    <>
      {/* Navbar   */}
      <Navbar />

      {/* Banner */}
      <Banner />

      {/* Row */}
      <Row 
        title = "Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row 
        title = "Swoonworthy Romance"
        fetchUrl={requests.fetchRomanceMovies}
        
      />
      <Row 
        title = "Action & Adventure"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row 
        title = "Trending Now"
        fetchUrl={requests.fetchTrending}
        isLargeRow
      />
      <Row 
        title = "Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
        
      />
      <Row 
        title = "This Place is Evil"
        fetchUrl={requests.fetchHorrorMovies}
        
      />
      <Row 
        title = "Top Rated"
        fetchUrl={requests.fetchTopRated}
        isLargeRow
      />
      <Row 
        title = "Based on True Story"
        fetchUrl={requests.fetchDocumentaries}
        
      />
      
    </>
  );
}

export default Home;
