
export function getAuthToken() {
  const token = localStorage.getItem('token');
  return token;
}

export function getAuthUser() {
  const user = localStorage.getItem('user');
  return user;
}

export function tokenLoader(){
  return getAuthToken();
}
