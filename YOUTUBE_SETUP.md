# Configuración de YouTube API

## Problema Actual

El error "Error al obtener datos del video" ocurre porque no tienes configurada la API key de YouTube.

## Solución Temporal

He implementado un método alternativo que funciona sin API key, pero es menos confiable. Para la mejor experiencia, configura la API key oficial.

## Configuración de YouTube API Key

### 1. Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la facturación (requerido para YouTube API)

### 2. Habilitar YouTube Data API v3

1. Ve a [APIs & Services > Library](https://console.cloud.google.com/apis/library)
2. Busca "YouTube Data API v3"
3. Haz clic en "Enable"

### 3. Crear API Key

1. Ve a [APIs & Services > Credentials](https://console.cloud.google.com/apis/credentials)
2. Haz clic en "Create Credentials" > "API Key"
3. Copia la API key generada

### 4. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
YOUTUBE_API_KEY=tu_api_key_aqui
```

### 5. Reiniciar el Servidor

```bash
npm run dev
```

## Método Alternativo (Sin API Key)

Si no quieres configurar la API key, la aplicación usará automáticamente un método alternativo que hace scraping de la página de YouTube. Este método:

- ✅ Funciona sin configuración
- ❌ Es menos confiable
- ❌ Puede fallar con algunos videos
- ❌ No obtiene descripciones completas

## Verificación

Después de configurar la API key, prueba agregar un video:

1. Haz clic en el botón "+" en el header
2. Pega una URL de YouTube
3. Debería obtener automáticamente el título, descripción y thumbnail

## Límites de la API

- YouTube Data API v3 tiene límites de cuota
- 10,000 unidades por día (gratis)
- Cada consulta de video consume 1 unidad
- Para producción, considera implementar caché
