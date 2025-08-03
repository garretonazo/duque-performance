# 📱 Configuración de WhatsApp Business para Frank Duque

## 🎯 Objetivo
Configurar WhatsApp Business para recibir consultas automáticamente de los clientes interesados en los programas de Duque Performance.

## 📋 Pasos de Configuración

### 1. **Configurar Número de WhatsApp Business**
- ✅ Número configurado: `+56961530977`
- Ubicación en el código: `src/components/ProgramasSection.tsx` línea 8
- Formato: `56961530977` (sin espacios ni guiones)

### 2. **Mensaje de Bienvenida Automático**
Configurar en WhatsApp Business:
```
¡Hola! Soy Frank Duque de Duque Performance 🏋️‍♂️

Gracias por tu interés en nuestros programas de entrenamiento y nutrición.

¿En cuál de estos programas estás interesado?

🏃‍♂️ DUQUE ALIMENTACIÓN ($50.000)
- Plan nutricional personalizado
- Ideal para perder grasa, ganar músculo o mantenerte saludable

💪 DUQUE TRAINING ($90.000)
- Rutinas enfocadas para tu deporte
- Mejora capacidades físicas específicas

🏆 DUQUE ULTIMATE (desde $120.000)
- Entrenamiento presencial 1 a 1
- En Basketball Performance Center, Las Condes

Responde con el número del programa que te interesa:
1️⃣ DUQUE ALIMENTACIÓN
2️⃣ DUQUE TRAINING  
3️⃣ DUQUE ULTIMATE

¡Te respondo en menos de 2 horas! ⚡
```

### 3. **Mensaje de Ausencia**
Configurar para cuando no pueda responder inmediatamente:
```
¡Hola! Soy Frank Duque 🏋️‍♂️

En este momento estoy entrenando con clientes, pero te responderé en menos de 2 horas.

Mientras tanto, puedes revisar nuestros programas en:
🌐 duqueperformance.com

¡Gracias por tu paciencia! 💪
```

### 4. **Horarios de Atención**
Configurar en WhatsApp Business:
```
Horarios de Atención:
🕐 Lunes a Viernes: 7:00 AM - 9:00 PM
🕐 Sábados: 8:00 AM - 6:00 PM
🕐 Domingos: 9:00 AM - 2:00 PM

Fuera de estos horarios, te responderé al día siguiente.
```

### 5. **Menú Rápido (Respuestas Rápidas)**
Configurar respuestas automáticas para preguntas frecuentes:

#### Respuesta 1: "¿Qué incluye DUQUE ALIMENTACIÓN?"
```
DUQUE ALIMENTACIÓN ($50.000) incluye:

📋 Plan alimenticio 100% personalizado
🎯 Según tus objetivos específicos
📱 Seguimiento por WhatsApp
📊 Ajustes semanales
🍽️ Recetas y tips nutricionales

¿Te interesa? ¡Responde SÍ para comenzar! 💪
```

#### Respuesta 2: "¿Qué incluye DUQUE TRAINING?"
```
DUQUE TRAINING ($90.000) incluye:

🏃‍♂️ Rutinas personalizadas para tu deporte
💪 Entrenamiento de fuerza específico
⚡ Mejora de capacidades físicas
📱 Seguimiento y ajustes
🎯 Objetivos deportivos claros

¿Quieres potenciar tu rendimiento? ¡Responde SÍ! 🏆
```

#### Respuesta 3: "¿Qué incluye DUQUE ULTIMATE?"
```
DUQUE ULTIMATE (desde $120.000) incluye:

🏋️‍♂️ Entrenamiento presencial 1 a 1
📍 En Basketball Performance Center, Las Condes
📊 Evaluación física completa
🎯 Programa personalizado
📱 Seguimiento 24/7
🏆 Resultados garantizados

¿Quieres el programa completo? ¡Responde SÍ! 💪
```

#### Respuesta 4: "¿Cuánto tiempo toma ver resultados?"
```
⏱️ Tiempo de resultados:

📈 Primeras mejoras: 2-3 semanas
💪 Cambios notables: 4-6 semanas
🏆 Resultados significativos: 8-12 semanas

Todo depende de tu compromiso y constancia.

¿Estás listo para comenzar? ¡Responde SÍ! 💪
```

### 6. **Configuración de Etiquetas**
Crear etiquetas en WhatsApp Business:
- 🟢 **Interesado** - Clientes que preguntan
- 🟡 **En proceso** - Clientes evaluando
- 🔵 **Cliente activo** - Clientes con programa
- 🟣 **Pendiente pago** - Esperando confirmación
- 🔴 **No interesado** - No procedió

### 7. **Configuración de Estadísticas**
Activar en WhatsApp Business:
- Tiempo de respuesta promedio
- Mensajes recibidos por día
- Conversiones (consultas a ventas)
- Horarios de mayor actividad

## 🚀 Beneficios de esta Configuración

### ✅ **Para Frank:**
- Respuestas automáticas 24/7
- Menú rápido para preguntas frecuentes
- Organización de clientes con etiquetas
- Estadísticas de rendimiento
- Ahorro de tiempo en respuestas repetitivas

### ✅ **Para Clientes:**
- Respuesta inmediata con información
- Horarios claros de atención
- Información detallada de programas
- Proceso de compra simplificado
- Atención personalizada

## 📱 Comandos Útiles para Frank

### Respuestas Rápidas (Configurar en WhatsApp):
1. **"1"** → Enviar info DUQUE ALIMENTACIÓN
2. **"2"** → Enviar info DUQUE TRAINING
3. **"3"** → Enviar info DUQUE ULTIMATE
4. **"precio"** → Enviar precios de todos los programas
5. **"horarios"** → Enviar horarios de atención
6. **"ubicación"** → Enviar dirección del centro

## ⚠️ Notas Importantes

1. **Actualizar número**: Cambiar el número en el código antes de publicar
2. **Respuestas personalizadas**: Adaptar mensajes según el estilo de Frank
3. **Horarios reales**: Ajustar horarios según disponibilidad real
4. **Respuestas rápidas**: Configurar todas las respuestas automáticas
5. **Etiquetas**: Usar etiquetas para organizar clientes
6. **Estadísticas**: Revisar métricas semanalmente

## 🔧 Configuración Técnica

### En el código (`src/components/ProgramasSection.tsx`):
```javascript
// Línea 8 - Número de Frank configurado
const WHATSAPP_BUSINESS_URL = "https://wa.me/56961530977";
```

### Mensajes que se envían automáticamente:
- **DUQUE ALIMENTACIÓN**: "Hola Frank! Me interesa el programa DUQUE ALIMENTACIÓN ($50.000). ¿Podrías enviarme el plan nutricional personalizado?"
- **DUQUE TRAINING**: "Hola Frank! Quiero información sobre DUQUE TRAINING ($90.000). ¿Cómo funciona el programa de entrenamiento?"
- **DUQUE ULTIMATE**: "Hola Frank! Me interesa DUQUE ULTIMATE (desde $120.000). ¿Podrías explicarme qué incluye el programa completo?"
- **BOTÓN "HABLEMOS!"**: "Hola Frank! Tengo dudas sobre los programas de entrenamiento. ¿Podrías ayudarme?"
- **BOTÓN "CONTACTO" (Navbar)**: "Hola Frank! Quiero más información sobre tus programas de entrenamiento. ¿Podrías ayudarme?"

## 📞 Soporte

Si necesitas ayuda con la configuración:
- Revisar documentación de WhatsApp Business
- Contactar soporte técnico del proyecto
- Probar configuración con número de prueba primero 