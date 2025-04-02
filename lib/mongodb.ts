import mongoose from 'mongoose';

// Variables para manejar la conexión
let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    // Puedes cambiar esta URI según tu configuración
    // Si estás en desarrollo local, puedes usar 'mongodb://localhost:27017/personal-finance'
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-finance';

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}
