import { post, _delete } from "../utils/http-functions";
import { isUserLogged, isAdmin, TOKEN } from "../utils/user-functions";
import Movies from "../pages/Movies";
import Login from "../pages/Login";

export function MovieCard(movie) {
  const container = document.createElement("div");
  container.classList.add("w-[50%]", "rounded", "overflow-hidden", "shadow-lg");

  const textContainer = document.createElement("div");
  textContainer.classList.add("px-6", "py-4");

  const movieTitle = document.createElement("span");
  movieTitle.classList.add("font-bold", "text-xl", "mb-2");
  movieTitle.textContent = movie.name;

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("flex", "gap-4");

  const buyButton = document.createElement("button");
  buyButton.classList.add(
    "bg-blue-500",
    "hover:bg-blue-700",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "border",
    "border-transparent",
    "rounded"
  );
  buyButton.textContent = "Buy tickets";
  buyButton.addEventListener("click", () => buyTickets(movie));
  actionsDiv.append(buyButton);

  if (isAdmin()) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add(
      "bg-red-500",
      "hover:bg-red-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "border",
      "border-transparent",
      "rounded"
    );
    deleteButton.textContent = "Delete movie";
    deleteButton.addEventListener("click", (e) => deleteMovie(e, movie));
    actionsDiv.append(deleteButton);
  }

  textContainer.append(movieTitle);
  textContainer.append(actionsDiv);
  container.append(textContainer);
  return container;
}

async function deleteMovie(event, movie) {
  event.preventDefault();
  if (confirm(`You are about to delete ${movie.name}\nAre you sure?`)) {
    try {
      const res = await _delete("movies", movie._id, TOKEN());

      Movies();
      alert(res);
    } catch (error) {
      alert(error.message);
    }
  }
}

async function buyTickets(movie) {
  if (!isUserLogged()) {
    Login();
  } else {
    const film = movie._id;
    console.log(film);
    try {
      await post("tickets", { film }, TOKEN());

      alert(`Buyed tickets for ${movie.name}`);
    } catch (error) {
      alert(error.message);
    }
  }
}
