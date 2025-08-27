import { get } from "../utils/http-functions";
import { ScheduleCard } from "../components/scheduleCard";
import { Loader } from "../components/loader";

const template = () => `
    <div class="container mx-auto px-4 py-8">
      <section id="hero" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"></section>
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Fechas Disponibles</h2>
        <div id="schedulesGrid"></div>
      </section>
    </div>
`;

const getSchedules = async (concertId) => {
  const schedulesContainer = document.querySelector("#schedulesGrid");
  schedulesContainer.innerHTML = "";
  schedulesContainer.append(Loader());

  try {
    const schedules = await get(`schedules/${concertId}`);

    schedulesContainer.innerHTML = "";
    schedulesContainer.classList.add(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "gap-6"
    );

    if (schedules && schedules.length > 0) {
      schedules.forEach((schedule) => {
        schedulesContainer.append(ScheduleCard(schedule));
      });
    } else {
      const noSchedulesMessage = document.createElement("p");
      schedulesContainer.classList.remove("grid", "md:grid-cols-2", "gap-6");
      noSchedulesMessage.className = "text-gray-500 text-center";
      noSchedulesMessage.textContent =
        "No hay fechas disponibles para este concierto.";
      schedulesContainer.append(noSchedulesMessage);
    }
  } catch (error) {
    console.log(error.message);
    concertsContainer.innerHTML = `
      <p class="text-center text-red-500 col-span-full">Error al cargar fechas</p>
    `;
  }
};

const ConcertInfo = (concert) => {
  document.querySelector("main").innerHTML = template();

  // Image
  const imageWrapper = document.createElement("div");
  imageWrapper.className = "relative";

  const image = document.createElement("img");
  image.src = concert.image || "/placeholder.svg";
  image.alt = concert.title;
  image.width = 600;
  image.height = 400;
  image.className = "w-full h-96 object-cover rounded-2xl shadow-2xl";
  image.loading = "lazy";

  imageWrapper.append(image);

  // Title and artist
  const textWrapper = document.createElement("div");
  textWrapper.className = "flex flex-col justify-center space-y-6";

  const titleWrapper = document.createElement("div");

  const h2 = document.createElement("h2");
  h2.className = "text-4xl md:text-5xl font-bold text-gray-800 mb-4";
  h2.textContent = concert.title;

  const h3 = document.createElement("h3");
  h3.className = "text-2xl md:text-3xl text-purple-600 font-semibold mb-4";
  h3.textContent = concert.artist;

  titleWrapper.append(h2);
  titleWrapper.append(h3);

  // Descripción
  const description = document.createElement("p");
  description.className = "text-lg text-gray-700 leading-relaxed";
  description.textContent = concert.description;

  textWrapper.append(titleWrapper);
  textWrapper.append(description);

  document.querySelector("#hero").append(imageWrapper);
  document.querySelector("#hero").append(textWrapper);

  getSchedules(concert._id);
};

export default ConcertInfo;
