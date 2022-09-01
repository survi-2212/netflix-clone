import { Button, LinearProgress, Stack } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import axios from "../Axios/axios";
import requests from "../Axios/request";
import "./Banner.css";

function Banner() {
  const [movie, setmovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchComedyMovies);
      // console.log(request);
      setmovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      return request;
    }
    fetchData();
  }, []);
  // console.log(movie);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <div className="container">
      {movie ? (
        <>
          <header
            className="banner"
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <div className="banner_content">
              <h1 className="banner_title">
                {movie?.title || movie?.name || movie?.original_name}
              </h1>
              <div className="banner_buttons">
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    startIcon={<PlayArrowIcon />}
                    style={{
                      backgroundColor: "rgba(51,51,51,0.51)",
                      color: "white",
                      border: "none",
                    }}
                    size="small"
                  >
                    Play
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    style={{
                      backgroundColor: "rgba(51,51,51,0.51)",
                      color: "white",
                      border: "none",
                    }}
                    size="small"
                  >
                    My List
                  </Button>
                </Stack>
              </div>

              <h1 className="banner_desc">
                {truncate(`${movie?.overview}...`, 200)}
              </h1>
            </div>

            <div className="banner_fadded"></div>
          </header>
        </>
      ) : (
        <LinearProgress color="success" />
      )}
    </div>
  );
}

export default Banner;
