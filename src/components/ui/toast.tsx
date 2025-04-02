// Este archivo ya no es necesario, pero lo mantenemos como referencia
// para posibles personalizaciones futuras si se requieren.

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Exportamos un ToastContainer preconfigurado por si es necesario usarlo directamente
export function CustomToastContainer() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}

// Las implementaciones anteriores ya no se utilizan
// export function Toast({ ... }) { ... }
// export function ToastContainer({ ... }) { ... }
