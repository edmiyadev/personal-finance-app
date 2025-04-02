import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Registrarse | Personal Finance App',
  description: 'Crea una cuenta para comenzar a administrar tus finanzas personales',
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Crear Cuenta</h1>
      <RegisterForm />
    </div>
  );
}
