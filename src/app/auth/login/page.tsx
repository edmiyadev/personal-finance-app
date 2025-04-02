import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Iniciar Sesión | Personal Finance App',
  description: 'Inicia sesión para administrar tus finanzas personales',
};

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Iniciar Sesión</h1>
      <LoginForm />
    </div>
  );
}
