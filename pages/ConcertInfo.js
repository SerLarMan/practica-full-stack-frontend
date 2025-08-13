import { get } from "../utils/http-functions";
import { ScheduleCard } from "../components/scheduleCard";

const template = () => `
    <div class="container mx-auto px-4 py-8">
      <section id="hero" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"></section>
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Fechas Disponibles</h2>
        <div id="schedulesGrid" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
      </section>
    </div>
`;

const getSchedules = async (concertId) => {
  const schedules = await get(`schedules/${concertId}`);
  const schedulesContainer = document.querySelector("#schedulesGrid");

  if (schedules && schedules.length > 0) {
    schedules.forEach((schedule) => {
      schedulesContainer.appendChild(ScheduleCard(schedule));
    });
  } else {
    const noSchedulesMessage = document.createElement("p");
    noSchedulesMessage.className = "text-gray-500";
    noSchedulesMessage.textContent = "No hay fechas disponibles para este concierto.";
    schedulesContainer.appendChild(noSchedulesMessage);
  }
};

const ConcertInfo = (concert) => {
  document.querySelector("main").innerHTML = template();

  // Img
  const imgWrapper = document.createElement("div");
  imgWrapper.className = "relative";

  const img = document.createElement("img");
  img.src = concert.image || "/placeholder.svg";
  img.alt = concert.title;
  img.width = 600;
  img.height = 400;
  img.className = "w-full h-96 object-cover rounded-2xl shadow-2xl";
  img.loading = "lazy";

  imgWrapper.appendChild(img);

  //Title and artist
  const textWrapper = document.createElement("div");
  textWrapper.className = "flex flex-col justify-center space-y-6";

  const titleWrapper = document.createElement("div");

  const h2 = document.createElement("h2");
  h2.className = "text-4xl md:text-5xl font-bold text-gray-800 mb-4";
  h2.textContent = concert.title;

  const h3 = document.createElement("h3");
  h3.className = "text-2xl md:text-3xl text-purple-600 font-semibold mb-4";
  h3.textContent = concert.artist;

  titleWrapper.appendChild(h2);
  titleWrapper.appendChild(h3);

  // Descripción
  const description = document.createElement("p");
  description.className = "text-lg text-gray-700 leading-relaxed";
  description.textContent = concert.description;

  textWrapper.appendChild(titleWrapper);
  textWrapper.appendChild(description);

  document.querySelector("#hero").appendChild(imgWrapper);
  document.querySelector("#hero").appendChild(textWrapper);

  getSchedules(concert._id);
};

export default ConcertInfo;
