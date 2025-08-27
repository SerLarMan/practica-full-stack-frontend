import { ticketCard } from "../components/ticketCard";
import { get } from "../utils/http-functions";
import { currUser, TOKEN } from "../utils/user-functions";

const template = () => `
    <section id="tickets" class="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
        <h2 class="mt-6 text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Mis Entradas
        </h2>
        <div id="active-tickets" class="mb-12"></div>
        <div id="used-tickets" class="mb-12"></div>
    </section>
`;

const getTickets = async () => {
  const tickets = await get(`tickets/${currUser()._id}`, TOKEN());

  const activeTickets = tickets.filter((ticket) => ticket.status === "active");
  const usedTickets = tickets.filter((ticket) => ticket.status === "used");

  if (activeTickets?.length > 0) {
    const activeTicketsContainer = document.getElementById("active-tickets");
    const p = document.createElement("p");
    p.textContent = `Entradas Activas (${activeTickets.length})`;
    p.classList.add(
      "text-2xl",
      "font-bold",
      "text-gray-800",
      "mb-6",
      "flex",
      "items-center"
    );

    activeTicketsContainer.appendChild(p);
    const ticketsWrapper = document.createElement("div");
    ticketsWrapper.classList.add(
      "grid",
      "grid-cols-1",
      "lg:grid-cols-2",
      "gap-6"
    );
    activeTickets.forEach((ticket) => {
      ticketsWrapper.appendChild(ticketCard(ticket));
      activeTicketsContainer.appendChild(ticketsWrapper);
    });
  }

  if (usedTickets?.length > 0) {
    const usedTicketsContainer = document.getElementById("used-tickets");
    const p = document.createElement("p");
    p.textContent = `Entradas Usadas (${usedTickets.length})`;
    p.classList.add(
      "text-2xl",
      "font-bold",
      "text-gray-800",
      "mb-6",
      "flex",
      "items-center"
    );

    usedTicketsContainer.appendChild(p);
    const ticketsWrapper = document.createElement("div");
    ticketsWrapper.classList.add(
      "grid",
      "grid-cols-1",
      "lg:grid-cols-2",
      "gap-6"
    );
    usedTickets.forEach((ticket) => {
      ticketsWrapper.appendChild(ticketCard(ticket));
      usedTicketsContainer.appendChild(ticketsWrapper);
    });
  }

  if (tickets.length === 0) {
    const ticketsContainer = document.getElementById("tickets");
    const p = document.createElement("p");
    p.textContent = "No tienes entradas compradas actualmente";
    p.classList.add("text-gray-500", "text-center", "mt-6");
    ticketsContainer.appendChild(p);
  }
};

const Tickets = () => {
  document.querySelector("main").innerHTML = template();

  getTickets();
};

export default Tickets;
