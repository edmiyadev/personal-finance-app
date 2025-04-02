import mongoose from 'mongoose';

// Variables para manejar la conexión
let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    // Obtener credenciales del contenedor Docker
    // Si no están definidas, usar los valores predeterminados del docker-compose
    const username = process.env.MONGO_USERNAME || 'root';
    const password = process.env.MONGO_PASSWORD || 'password';
    
    // Construir URI con autenticación para el contenedor Docker
    const uri = process.env.MONGODB_URI || 
      `mongodb://${username}:${password}@localhost:27017/personal-finance?authSource=admin`;
    
    console.log('Connecting to MongoDB with URI:', uri.replace(/\/\/.*:.*@/, '//***:***@')); // Log sin credenciales
    
    // Opciones de conexión
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Conectar a la base de datos
    await mongoose.connect(uri, options);

    isConnected = true;
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    // Re-lanzar el error para que pueda ser manejado por quien llamó a esta función
    throw error;
  }
}
