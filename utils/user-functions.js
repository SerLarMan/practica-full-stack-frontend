export function isUserLogged() {
  return localStorage.getItem("user") ? true : false;
}

export function currUser() {
  if (isUserLogged()) {
    return JSON.parse(localStorage.getItem("user")).user;
  }
}

export function TOKEN() {
  if (isUserLogged()) {
    return JSON.parse(localStorage.getItem("user")).token;
  }
}
