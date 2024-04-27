import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <div className="flex flex-col items-center mt-16">
      <h1 className="title my-4">Sign up</h1>
      <RegisterForm />
    </div>
  );
}
