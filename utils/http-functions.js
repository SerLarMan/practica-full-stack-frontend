const URL = "http://localhost:3000/";

export async function get(query) {
  const res = await fetch(URL + query);

  // Se devuelve el código de error
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }

  return await res.json();
}

export async function post(query, obj) {
  const res = await fetch(URL + query, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(obj),
  });

  // Se devuelve el código de error
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }

  return await res.json();
}

export async function put(query, id, obj) {
  const res = await fetch(URL + query + "/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(obj),
  });

  // Se devuelve el código de error
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }

  return await res.json();
}

export async function _delete(query, id) {
  const res = await fetch(URL + query + "/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });

  // Se devuelve el código de error
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }

  return await res.json();
}
