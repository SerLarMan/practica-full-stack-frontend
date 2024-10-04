const get = async (query) => {
  const data = await fetch(query);
  return await data.json();
};

const post = async (query, obj) => {
  const data = await fetch(query, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(obj),
  });

  return await data.json();
};

const put = async (query, id, obj) => {
  const data = await fetch(query + "/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(obj),
  });

  return await data.json();
};

const _delete = async (query, id) => {
  const data = await fetch(query + "/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });

  return await data.json();
};
