import ConcertInfo from "../pages/ConcertInfo";

export function ConcertCard(concert) {
  const container = document.createElement("article");
  container.addEventListener("click", () => {
    ConcertInfo(concert);
  });
  container.classList.add(
    "group",
    "hover:shadow-xl",
    "transition-all",
    "duration-300",
    "hover:-translate-y-2",
    "hover:cursor-pointer",
    "border-0",
    "shadow-lg",
    "overflow-hidden",
    "bg-white/80",
    "backdrop-blur-sm",
    "block"
  );

  // --- Img ---
  const imgWrapper = document.createElement("div");
  imgWrapper.className = "relative overflow-hidden";

  const img = document.createElement("img");
  img.src = concert.image || "/placeholder.svg";
  img.alt = concert.title;
  img.width = 400;
  img.height = 300;
  img.loading = "lazy";
  img.classList.add(
    "w-full",
    "h-48",
    "object-cover",
    "group-hover:scale-110",
    "transition-transform",
    "duration-300"
  );

  imgWrapper.appendChild(img);

  // --- Content ---
  const content = document.createElement("div");
  content.className = "p-6";

  const title = document.createElement("h3");
  title.classList.add(
    "text-xl",
    "font-bold",
    "text-gray-800",
    "mb-2",
    "group-hover:text-purple-600",
    "transition-colors"
  );
  title.textContent = concert.title;

  const artist = document.createElement("p");
  artist.className = "text-lg text-purple-600 font-semibold mb-3";
  artist.textContent = concert.artist;

  const infoWrapper = document.createElement("div");
  infoWrapper.className = "flex items-center text-gray-600 text-sm space-x-4";

  content.appendChild(title);
  content.appendChild(artist);
  content.appendChild(infoWrapper);

  container.appendChild(imgWrapper);
  container.appendChild(content);

  return container;
}
