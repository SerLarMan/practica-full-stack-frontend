export function ticketCard(ticket) {
  const template = () => `
    <article class="border-2 rounded-lg p-4 shadow-sm bg-white transition">
      <header class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-xl font-bold ${
            ticket.status === "active" ? "text-gray-800" : "text-gray-600"
          }">
            ${ticket.schedule.concert.title}
          </h3>
          <p class="text-lg ${
            ticket.status === "active" ? "text-purple-600" : "text-gray-500"
          } font-semibold">
            ${ticket.schedule.concert.artist}
          </p>
        </div>
        <span class="px-2 py-1 rounded text-sm font-medium 
          ${
            ticket.status === "active"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700"
          }">
          ${ticket.status === "active" ? "Active" : "Used"}
        </span>
      </header>

      <div class="space-y-4">
        <!-- Fecha, hora y lugar -->
        <div class="grid grid-cols-2 gap-4 text-sm ${
          ticket.status === "active" ? "text-gray-700" : "text-gray-600"
        }">
          <div class="flex items-center space-x-2">
            <i class="fa-solid fa-calendar h-4 w-4"></i>
            <span>${new Date(ticket.schedule.date).toLocaleDateString(
              "es-ES"
            )}, ${ticket.schedule.time}h</span>
          </div>
          <div class="flex items-center space-x-2 col-span-2">
            <i class="fa-solid fa-map-pin h-4 w-4"></i>
            <span>${ticket.schedule.location.address}, ${
    ticket.schedule.location.city
  }</span>
          </div>
        </div>

        <!-- Precio -->
        <div class="rounded-lg p-4 ${
          ticket.status === "active" ? "bg-green-50" : "bg-gray-100"
        }">
          <div class="flex justify-between text-sm">
            <span class="${
              ticket.status === "active" ? "text-gray-600" : "text-gray-500"
            }">Precio:</span>
            <span class="font-semibold ${
              ticket.status === "active" ? "text-green-600" : "text-gray-600"
            }">
              $${ticket.schedule.price}
            </span>
          </div>
        </div>
      </div>
    </article>
  `;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = template();
  const card = wrapper.firstElementChild;

  if (ticket.status === "used") {
    card.classList.add("opacity-75");
  }

  return card;
}
