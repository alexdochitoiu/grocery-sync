import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col items-center mt-16">
      <h1 className="title my-4">Sign in</h1>
      <LoginForm />
    </div>
  );
}
