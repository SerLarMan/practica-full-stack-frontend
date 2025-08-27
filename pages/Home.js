import { get } from "../utils/http-functions";
import { SearchBar } from "../components/searchBar";
import { ConcertCard } from "../components/concertCard";
import { Loader } from "../components/loader";

const template = () => `
    <div class="container mx-auto px-4 py-8">
      <section id="hero" class="text-center mb-12">
        <h2 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-4">
          Descubre Eventos de Música en Vivo
        </h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Encuentra y reserva entradas para los conciertos más populares, desde sesiones acústicas íntimas hasta grandes espectáculos en estadios.
        </p>
      </section>
      <div id="searchBar" class="max-w-md mx-auto mb-12"></div>
      <section id="concertsGrid">
        <h2 class="hidden"></h2
      </section>
    </div>
`;

const getConcerts = async (query) => {
  const concertsContainer = document.querySelector("#concertsGrid");
  concertsContainer.innerHTML = "";
  concertsContainer.append(Loader());

  try {
    let concerts;
    if (query && query.trim() !== "") {
      concerts = await get(`concerts/search/${query}`);
    } else {
      concerts = await get("concerts");
    }

    concertsContainer.innerHTML = "";
    concertsContainer.classList.add(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "gap-8"
    );

    if (!concerts.length) {
      concertsContainer.innerHTML = `
        <p class="text-center text-gray-500 col-span-full">No se encontraron conciertos</p>
      `;
      return;
    }

    concerts.forEach((concert) => {
      concertsContainer.append(ConcertCard(concert));
    });
  } catch (error) {
    console.log(error.message);
    concertsContainer.innerHTML = `
      <p class="text-center text-red-500 col-span-full">Error al cargar conciertos</p>
    `;
  }
};

const Home = () => {
  document.querySelector("main").innerHTML = template();

  const searchBar = document.querySelector("#searchBar");
  searchBar.append(SearchBar());

  const searchInput = document.querySelector("#search");
  searchInput.addEventListener("input", (e) => {
    getConcerts(e.target.value);
  });

  getConcerts();
};

export default Home;
