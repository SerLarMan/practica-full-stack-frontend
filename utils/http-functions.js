const URL = import.meta.env.VITE_URL + ":" + import.meta.env.VITE_PORT + "/";

export async function get(query, token = "") {
  const res = await fetch(URL + query, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // Se devuelve el código de error
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }

  return await res.json();
}

export async function post(query, obj, token = "", isFormData = false) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  let body;

  if (isFormData) {
    body = obj;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(obj);
  }

  const res = await fetch(URL + query, {
    method: "POST",
    headers,
    body,
  });

  // Se devuelve el código de error
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }

  return await res.json();
}

export async function put(query, id, obj, token = "", isFormData = false) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  let body;

  if (isFormData) {
    body = obj;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(obj);
  }

  const res = await fetch(URL + query + "/" + id, {
    method: "PUT",
    headers,
    body,
  });

  // Se devuelve el código de error
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }

  return await res.json();
}

export async function _delete(query, id, token = "") {
  const res = await fetch(URL + query + "/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
