# Configuración de Firebase

## Problema: Videos no se guardan en la base de datos

Si los videos no se están guardando, probablemente es porque no tienes configuradas las variables de entorno de Firebase.

## Solución

### 1. Verificar Configuración de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a "Project Settings" (Configuración del proyecto)
4. En la pestaña "General", busca "Your apps"
5. Si no tienes una app web, haz clic en "Add app" y selecciona el ícono web

### 2. Obtener Configuración

En la sección "SDK setup and configuration", copia la configuración:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id",
};
```

### 3. Crear archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id
```

### 4. Configurar Firestore

1. En Firebase Console, ve a "Firestore Database"
2. Haz clic en "Create database"
3. Selecciona "Start in test mode" (para desarrollo)
4. Elige una ubicación para tu base de datos

### 5. Configurar Reglas de Firestore

En la pestaña "Rules", asegúrate de que las reglas permitan lectura y escritura:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Solo para desarrollo
    }
  }
}
```

### 6. Reiniciar el Servidor

```bash
npm run dev
```

## Verificación

1. Abre la aplicación en el navegador
2. Deberías ver un componente de debug en la esquina inferior derecha
3. Debe mostrar "Firebase conectado. Videos en DB: X"
4. Si muestra error, revisa la configuración

## Debug

Si sigues teniendo problemas:

1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña "Console"
3. Intenta agregar un video
4. Revisa los logs en la consola del servidor (terminal donde ejecutas `npm run dev`)

## Nota de Seguridad

Las reglas de Firestore que permiten `read, write: if true` son solo para desarrollo. En producción, debes implementar reglas de seguridad apropiadas.
