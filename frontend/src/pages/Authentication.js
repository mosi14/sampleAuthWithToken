import AuthForm from '../components/AuthForm';
import { json, redirect, useSearchParams } from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request, params }) {
  const data = await request.formData();
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  const userCredential = {
    email: data.get('email'),
    password: data.get('password'),
  };
  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCredential),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'somthing went wrong' }, { status: 500 });
  } else {
    const resData = await response.json();

    const token = resData.token;
    localStorage.setItem('token', token);

    const user = resData.user;
    localStorage.setItem('user', user);

    return redirect('/');
  }
}
