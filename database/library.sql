-- ======================================================
-- 1. CONFIGURACIÓN INICIAL
-- ======================================================
SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS library;
CREATE DATABASE library;
USE library;
SET FOREIGN_KEY_CHECKS = 1;

-- ======================================================
-- 2. TABLA DE ROLES (Simplificada)
-- ======================================================
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
) ENGINE=InnoDB;

INSERT INTO roles (nombre, descripcion) VALUES 
('Administrador', 'Control total del sistema'),
('Bibliotecario', 'Validación y organización de documentos'),
('Docente', 'Gestión de materias y subida de recursos'),
('Invitado', 'Consulta y descarga pública');

-- ======================================================
-- 3. TABLA DE USUARIOS
-- ======================================================
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol_id INT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_rol FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ======================================================
-- 4. ESTRUCTURA ACADÉMICA
-- ======================================================
CREATE TABLE carreras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(10) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE asignaturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrera_id INT,
    nombre VARCHAR(100) NOT NULL,
    semestre INT,
    CONSTRAINT fk_carrera FOREIGN KEY (carrera_id) REFERENCES carreras(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ======================================================
-- 5. GESTIÓN DOCUMENTAL
-- ======================================================
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
) ENGINE=InnoDB;

INSERT INTO categorias (nombre) VALUES ('Investigación'), ('Académico'), ('Administrativo'), ('Recurso Multimedia');

CREATE TABLE documentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    resumen TEXT,
    tipo ENUM('TESIS', 'GUIA', 'LIBRO', 'PROYECTO', 'EXAMEN', 'OTRO') NOT NULL,
    categoria_id INT,
    estado_aprobacion ENUM('PENDIENTE', 'REVISION', 'APROBADO', 'RECHAZADO', 'PUBLICADO') DEFAULT 'PUBLICADO',
    asignatura_id INT,
    autor_id INT, -- Referencia al Docente/Bibliotecario que lo sube
    tutor_id INT, 
    visibilidad ENUM('PUBLICO', 'PRIVADO') DEFAULT 'PUBLICO',
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_doc_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL,
    CONSTRAINT fk_doc_asignatura FOREIGN KEY (asignatura_id) REFERENCES asignaturas(id) ON DELETE CASCADE,
    CONSTRAINT fk_doc_autor FOREIGN KEY (autor_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_doc_tutor FOREIGN KEY (tutor_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE versiones_archivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    documento_id INT,
    version_numero INT DEFAULT 1,
    url_archivo VARCHAR(255) NOT NULL,
    nombre_original VARCHAR(255),
    formato VARCHAR(10),
    peso_mb DECIMAL(10,2),
    subido_por INT,
    fecha_version TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_version_doc FOREIGN KEY (documento_id) REFERENCES documentos(id) ON DELETE CASCADE,
    CONSTRAINT fk_version_usuario FOREIGN KEY (subido_por) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ======================================================
-- 6. MÉTRICAS DE ACCESO PÚBLICO
-- ======================================================
CREATE TABLE descargas_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    documento_id INT,
    usuario_id INT, -- NULL para descargas de invitados anónimos
    fecha_descarga TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_origen VARCHAR(45),
    CONSTRAINT fk_descarga_doc FOREIGN KEY (documento_id) REFERENCES documentos(id) ON DELETE CASCADE,
    CONSTRAINT fk_descarga_user FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ======================================================
-- 7. NOTIFICACIONES Y AUDITORÍA (Uso administrativo)
-- ======================================================
CREATE TABLE notificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    titulo VARCHAR(100),
    mensaje TEXT NOT NULL,
    leido BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notif_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE auditoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    accion_realizada TEXT NOT NULL,
    tabla_afectada VARCHAR(50),
    registro_id INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_auditoria_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ======================================================
-- 8. DATOS DE PRUEBA
-- ======================================================
INSERT INTO carreras (nombre, codigo) VALUES ('Ingeniería en Sistemas', 'ING-SIS');
INSERT INTO asignaturas (carrera_id, nombre, semestre) VALUES (1, 'Bases de Datos II', 4);
INSERT INTO usuarios (nombre, email, password, rol_id) VALUES ('Leonardo Rodriguez', 'leonardo@library.edu', 'hashed_password', 1);category.file.controllercategory.file.controller