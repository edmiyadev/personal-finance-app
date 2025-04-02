import { Roboto } from 'next/font/google';
import Link from 'next/link';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export default function AuthLayout({ children }) {
  return (
    <div className={`flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 ${roboto.className}`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Personal Finance App</h2>
          <p className="mt-2 text-sm text-gray-600">
            Administra tus finanzas personales de manera fácil y eficiente
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <nav className="mb-6">
            <ul className="flex border-b">
              <li className="mr-1 flex-1 text-center">
                <Link href="/auth/login" className="block py-2 px-4 hover:text-blue-700">
                  Iniciar Sesión
                </Link>
              </li>
              <li className="mr-1 flex-1 text-center">
                <Link href="/auth/register" className="block py-2 px-4 hover:text-blue-700">
                  Registrarse
                </Link>
              </li>
            </ul>
          </nav>
          {children}
        </div>
      </div>
    </div>
  );
}
