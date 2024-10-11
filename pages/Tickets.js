import { currUser } from "../utils/user-functions";

const template = () => `
    <section id="movies">
        <div id="ticketscontainer" class="flex flex-wrap">
        </div>
    </section
`;

const getTickets = () => {
  const tickets = currUser().tickets;
  const ticketsContainer = document.querySelector("#ticketscontainer");

  for (const ticket of tickets) {
    ticketsContainer.append(ticket.film.name);
  }
};

const Tickets = () => {
  document.querySelector("main").innerHTML = template();

  getTickets();
};

export default Tickets;
