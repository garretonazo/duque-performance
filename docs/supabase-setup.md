# Configuración de Supabase para Duque Performance

## 🚀 Paso 1: Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Haz clic en "New Project"
3. Completa la información del proyecto:
   - **Name**: `duque-performance`
   - **Database Password**: Crea una contraseña segura
   - **Region**: Selecciona la región más cercana (ej: South America)
4. Haz clic en "Create new project"

## 🔧 Paso 2: Obtener Credenciales

Una vez creado el proyecto, ve a **Settings > API** y copia:

- **Project URL**: `https://[YOUR-PROJECT-REF].supabase.co`
- **Anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Service role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 📊 Paso 3: Configurar Base de Datos

1. Ve a **Settings > Database**
2. Copia la **Connection string** que aparece en "Connection string" > "URI"
3. Reemplaza `[YOUR-PASSWORD]` con la contraseña que creaste

## 🔐 Paso 4: Configurar Variables de Entorno

Edita el archivo `.env.local` con tus credenciales:

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres:[TU-PASSWORD]@db.[TU-PROJECT-REF].supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-key-aqui"

# Storage (Supabase)
SUPABASE_URL="https://[TU-PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="tu-anon-key-aqui"
SUPABASE_SERVICE_ROLE_KEY="tu-service-role-key-aqui"
```

## 🗄️ Paso 5: Configurar Storage

1. Ve a **Storage** en el dashboard de Supabase
2. Crea dos buckets:
   - **`programs`**: Para almacenar PDFs de programas
   - **`images`**: Para almacenar imágenes del sitio

### Configuración de Buckets:

#### Bucket `programs`:
- **Public bucket**: ✅ Sí
- **File size limit**: 50MB
- **Allowed MIME types**: `application/pdf`

#### Bucket `images`:
- **Public bucket**: ✅ Sí
- **File size limit**: 10MB
- **Allowed MIME types**: `image/*`

## 🚀 Paso 6: Ejecutar Migraciones

```bash
# Generar el cliente de Prisma
npm run db:generate

# Aplicar el schema a la base de datos
npm run db:push

# Configurar datos iniciales
npm run db:setup
```

## 🔍 Paso 7: Verificar Configuración

1. Ejecuta `npm run db:studio` para abrir Prisma Studio
2. Verifica que las tablas se crearon correctamente
3. Verifica que los datos iniciales se insertaron

## 🛡️ Paso 8: Configurar Políticas de Seguridad

### Políticas para la tabla `users`:
```sql
-- Permitir lectura de usuarios autenticados
CREATE POLICY "Users can view their own profile" ON users
FOR SELECT USING (auth.uid() = id);

-- Permitir actualización de usuarios autenticados
CREATE POLICY "Users can update their own profile" ON users
FOR UPDATE USING (auth.uid() = id);
```

### Políticas para la tabla `programs`:
```sql
-- Permitir lectura pública de programas activos
CREATE POLICY "Public can view active programs" ON programs
FOR SELECT USING (is_active = true);

-- Solo administradores pueden crear/editar programas
CREATE POLICY "Only admins can manage programs" ON programs
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = 'ADMIN'
  )
);
```

### Políticas para Storage:
```sql
-- Permitir lectura pública de imágenes
CREATE POLICY "Public can view images" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Permitir lectura de programas solo a compradores
CREATE POLICY "Buyers can view programs" ON storage.objects
FOR SELECT USING (
  bucket_id = 'programs' AND
  EXISTS (
    SELECT 1 FROM purchases p
    JOIN users u ON p.user_id = u.id
    WHERE u.id = auth.uid() 
    AND p.program_id::text = (storage.foldername(name))[1]
    AND p.status = 'COMPLETED'
  )
);
```

## ✅ Verificación Final

1. **Base de datos**: Las tablas se crearon correctamente
2. **Storage**: Los buckets están configurados
3. **Políticas**: Las políticas de seguridad están activas
4. **Datos iniciales**: Categorías y usuario admin creados
5. **Conexión**: La aplicación puede conectarse a Supabase

## 🚨 Troubleshooting

### Error de conexión:
- Verifica que la URL de la base de datos sea correcta
- Asegúrate de que la contraseña esté bien escrita
- Verifica que el proyecto esté activo en Supabase

### Error de permisos:
- Verifica que las políticas de seguridad estén configuradas
- Asegúrate de que el usuario tenga el rol correcto

### Error de storage:
- Verifica que los buckets existan
- Asegúrate de que las políticas de storage estén configuradas
- Verifica que los tipos MIME estén permitidos 