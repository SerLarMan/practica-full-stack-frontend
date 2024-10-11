import { post } from "../utils/http-functions";
import { TOKEN } from "../utils/user-functions";
import Movies from "./Movies";

const template = () => `
    <section id="movieForm">
        <form>
            <input type="text" placeholder="Title" id="title" />
            <input type="text" placeholder="Director" id="director" />
            <input type="number" placeholder="Duration" id="duration" />
            <textarea placeholder="Description" id="description"> </textarea>
            <button id="movieformbtn">Add movie</button>
        </form>
    </section>
`;

const movieSubmit = async () => {
  const name = document.querySelector("#title").value;
  const director = document.querySelector("#director").value;
  const description = document.querySelector("#description").value;
  const duration = document.querySelector("#duration").value;

  try {
    const movie = await post(
      "movies",
      {
        name,
        director,
        description,
        duration,
      },
      TOKEN()
    );

    Movies();
    alert(`Movie ${movie.name} added successfully!`);
  } catch (error) {
    alert(error.message);
  }
};

const MovieForm = () => {
  document.querySelector("main").innerHTML = template();

  document.querySelector("#movieformbtn").addEventListener("click", (e) => {
    e.preventDefault();
    movieSubmit();
  });
};

export default MovieForm;
