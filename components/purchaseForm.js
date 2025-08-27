import ConcertInfo from "../pages/ConcertInfo";
import { post } from "../utils/http-functions";
import { currUser, TOKEN } from "../utils/user-functions";
import { Button } from "./button";

const template = (schedule, ticketQuantity) => `
<div id="purchase-dialog" class="hidden">
 <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-6">
      <h2 class="text-xl font-bold text-gray-800">Comprar Entradas</h2>

      <!-- Concert Info -->
      <div class="bg-gray-50 rounded-lg p-4 space-y-2">
        <h3 class="font-semibold text-gray-800">${schedule.concert.title}</h3>
        <p class="text-purple-600 font-medium">${schedule.concert.artist}</p>
        <div class="flex items-center space-x-4 text-sm text-gray-600">
          <span>${new Date(schedule.date).toLocaleDateString()}</span>
          <span>${schedule.time}</span>
        </div>
        <p class="text-sm text-gray-600">${schedule.location.name}</p>
      </div>

      <!-- Number of tickets -->
      <div class="space-y-3">
        <label for="quantity" class="text-sm font-medium">Número de Entradas</label>
        <div class="flex items-center space-x-3">
          <button id="decrement" class="h-8 w-8 flex items-center justify-center border rounded disabled:opacity-50">
            <i class="fa-solid fa-minus"></i>
          </button>

          <input id="quantity" type="number" min="1" max="${
            schedule.availableCapacity
          }"
            value="${ticketQuantity}"
            class="w-20 text-center border rounded px-2 py-1"/>

          <button id="increment" class="h-8 w-8 flex items-center justify-center border rounded disabled:opacity-50">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <p class="text-xs text-gray-500">Máximo ${
          schedule.availableCapacity
        } entradas</p>
      </div>

      <!-- Summary -->
      <div class="bg-purple-50 rounded-lg p-4 space-y-2">
        <div class="flex justify-between text-sm">
          <span>Precio por entrada:</span>
          <span>$${schedule.price}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>Cantidad:</span>
          <span id="summary-quantity">${ticketQuantity}</span>
        </div>
        <div class="border-t pt-2 flex justify-between font-semibold">
          <span>Total:</span>
          <span id="summary-total" class="text-purple-600">$${
            schedule.price * ticketQuantity
          }</span>
        </div>
      </div>

      <div id="actions" class="flex space-x-3"></div>
    </div>
  </div>
</div>
`;

const purchaseTicket = async (schedule, ticketQuantity) => {
  const button = document.querySelector("#purchase-button");
  const originalText = button.innerHTML;

  const tickets = [];
  for (let i = 0; i < ticketQuantity; i++) {
    try {
      button.disabled = true;
      button.innerHTML = `
      <div class="flex items-center justify-center space-x-2">
        <div class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
        <span>Comprando...</span>
      </div>
      `;

      const ticket = await post(`tickets/${currUser()._id}`, schedule, TOKEN());
      tickets.push(ticket);
      ConcertInfo(schedule.concert);
    } catch (error) {
      console.log(error);
      alert("Error al realizar la compra");
    } finally {
      button.disabled = false;
      button.innerHTML = originalText;
    }
  }

  if (tickets.length > 0) {
    alert("Compra realizada con éxito");
  }
};

export function purchaseForm(schedule) {
  const existing = document.querySelector("#purchase-dialog");
  if (existing) existing.remove();

  let ticketQuantity = 1;

  document.body.insertAdjacentHTML(
    "beforeend",
    template(schedule, ticketQuantity)
  );

  const actions = document.querySelector("#actions");

  const cancelButton = document.createElement("button");
  cancelButton.id = "cancel-dialog";
  cancelButton.classList.add("flex-1", "border", "rounded", "py-2");
  cancelButton.textContent = "Cancelar";

  actions.append(cancelButton);
  actions.append(
    Button(
      "Confirmar Compra",
      "purchase-button",
      null,
      () => {
        dialog.classList.add("hidden");
        purchaseTicket(schedule, ticketQuantity);
      },
      ["flex-1"]
    )
  );

  const dialog = document.querySelector("#purchase-dialog");
  const quantityInput = dialog.querySelector("#quantity");
  const summaryQuantity = dialog.querySelector("#summary-quantity");
  const summaryTotal = dialog.querySelector("#summary-total");
  const decrementBtn = dialog.querySelector("#decrement");
  const incrementBtn = dialog.querySelector("#increment");

  const updateSummary = () => {
    summaryQuantity.textContent = ticketQuantity;
    summaryTotal.textContent = schedule.price * ticketQuantity;
    quantityInput.value = ticketQuantity;
    decrementBtn.disabled = ticketQuantity <= 1;
    incrementBtn.disabled = ticketQuantity >= schedule.availableCapacity;
  };

  decrementBtn.addEventListener("click", () => {
    if (ticketQuantity > 1) {
      ticketQuantity--;
      updateSummary();
    }
  });

  incrementBtn.addEventListener("click", () => {
    if (ticketQuantity < schedule.availableCapacity) {
      ticketQuantity++;
      updateSummary();
    }
  });

  quantityInput.addEventListener("input", (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > schedule.availableCapacity) val = schedule.availableCapacity;
    ticketQuantity = val;
    updateSummary();
  });

  dialog.querySelector("#cancel-dialog").addEventListener("click", () => {
    dialog.classList.add("hidden");
  });

  dialog.classList.remove("hidden");
}
