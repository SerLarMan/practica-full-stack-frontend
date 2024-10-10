export function MovieCard(movie) {
  const container = document.createElement("div");
  container.classList.add(
    "w-[50%]",
    "rounded",
    "overflow-hidden",
    "shadow-lg"
  );

  const textContainer = document.createElement("div");
  textContainer.classList.add("px-6", "py-4");

  const movieTitle = document.createElement("span");
  movieTitle.classList.add("font-bold", "text-xl", "mb-2");
  movieTitle.textContent = movie.name;

  /* const movieDesc = document.createElement("p");
  movieDesc.classList.add("text-gray-700", "text-base");
  movieDesc.textContent = movie.description; */

  textContainer.append(movieTitle);
  /* textContainer.append(movieDesc); */
  container.append(textContainer);
  return container;
}
