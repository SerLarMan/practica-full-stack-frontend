import { Button } from "./button";

export function ScheduleCard(schedule) {
  const container = document.createElement("article");
  container.classList.add(
    "border-2",
    "border-purple-100",
    "hover:border-purple-300",
    "transition-colors",
    "rounded-lg",
    "p-4",
    "shadow-sm",
    "bg-white"
  );

  // --- Header ---
  const header = document.createElement("div");
  header.className = "flex items-center justify-between mb-4";

  const dateWrapper = document.createElement("div");
  dateWrapper.className = "flex items-center space-x-3";

  const dateIcon = document.createElement("i");
  dateIcon.className = "fa-solid fa-calendar h-5 w-5 text-purple-600";

  const dateText = document.createElement("span");
  dateText.textContent = new Date(schedule.date).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  dateWrapper.appendChild(dateIcon);
  dateWrapper.appendChild(dateText);

  const priceBadge = document.createElement("span");
  priceBadge.classList.add(
    "border",
    "border-purple-300",
    "rounded",
    "px-2",
    "py-1",
    "text-lg",
    "font-bold",
    "text-purple-600"
  );
  priceBadge.textContent = `$${schedule.price}`;

  header.appendChild(dateWrapper);
  header.appendChild(priceBadge);

  // --- Content ---
  const content = document.createElement("div");
  content.className = "space-y-4";

  // Date
  const timeRow = document.createElement("div");
  timeRow.className = "flex items-center space-x-2 text-gray-600";
  timeRow.innerHTML = `<i class="fa-solid fa-clock h-4 w-4"></i><span>${schedule.time}</span>`;

  // Location
  const locationWrapper = document.createElement("div");
  locationWrapper.className = "space-y-2";

  const venueRow = document.createElement("div");
  venueRow.className = "flex items-start space-x-2 text-gray-600";
  venueRow.innerHTML = `
    <i class="fa-solid fa-map-pin h-4 w-4 mt-1"></i>
    <div>
      <p class="font-semibold text-gray-800">${schedule.location.name}</p>
      <p class="text-sm">${schedule.location.address}, ${schedule.location.city}</p>
    </div>
  `;

  // --- Footer ---
  const footer = document.createElement("div");
  footer.className = "flex items-center justify-between pt-4";

  const ticketsInfo = document.createElement("span");
  ticketsInfo.className = "text-sm text-gray-600";
  ticketsInfo.textContent = `${schedule.location.capacity} entradas disponibles`;

  const buyButton = Button("Comprar Entradas", "fa-solid fa-ticket", () => {});
  buyButton.disabled = schedule.location.capacity === 0;

  footer.appendChild(ticketsInfo);
  footer.appendChild(buyButton);

  content.appendChild(timeRow);
  content.appendChild(locationWrapper);
  content.appendChild(footer);

  container.appendChild(header);
  container.appendChild(content);

  return container;
}
