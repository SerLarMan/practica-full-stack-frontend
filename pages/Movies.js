import { get } from "../utils/http-functions";
import { MovieCard } from "../components/movieCard";

const template = () => `
    <section id="movies">
        <div id="moviescontainer" class="flex flex-wrap">
        </div>
    </section
`;

const getMovies = async () => {
  const movies = await get("movies");
  const moviesContainer = document.querySelector("#moviescontainer");

  for (const movie of movies) {
    moviesContainer.append(MovieCard(movie));
  }
};

const Movies = () => {
  document.querySelector("main").innerHTML = template();

  getMovies();
};

export default Movies;
