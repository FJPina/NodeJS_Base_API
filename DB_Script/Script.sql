/*
use DISTRIBUIDORA
drop database Node_Base_API
create database Node_Base_API
*/

use Node_Base_API

--################################### CREACION DE TABLAS ###################################

--CREACION DE TABLA USUARIO

CREATE TABLE Usuario(
	IdUsuario INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Nombre VARCHAR(100) NULL,
	ApPaterno VARCHAR(100) NULL,
	ApMaterno VARCHAR(100) NULL,
	Eliminado BIT DEFAULT 0,
	Insertado DATETIME, 
	Editado DATETIME, 
	UsuarioMov INT,
	FOREIGN KEY (UsuarioMov) REFERENCES Usuario(IdUsuario)
)

--CREACION DE TABLA ROL

CREATE TABLE Rol(
	IdRol INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Descripcion VARCHAR(20) NULL,
	Eliminado BIT DEFAULT 0, 
	Insertado DATETIME, 
	Editado DATETIME, 
	UsuarioMov INT,
	FOREIGN KEY (UsuarioMov) REFERENCES Usuario(IdUsuario)
)

--CREACION DE TABLA LOGIN

CREATE TABLE Login(
	IdLogin INT NOT NULL IDENTITY PRIMARY KEY,
	IdUsuario INT NOT NULL,
	Usuario VARCHAR(100) NOT NULL,
	Contrasena VARCHAR(100) NULL,
	IdRol INT NULL,
	Eliminado BIT DEFAULT 0,
	Insertado DATETIME, 
	Editado DATETIME, 
	UsuarioMov INT,
	Bloqueado BIT DEFAULT 0,
	FOREIGN KEY (IdRol) REFERENCES Rol(IdRol),
	FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario),
	FOREIGN KEY (UsuarioMov) REFERENCES Usuario(IdUsuario)
)

--CREACION DE TABLA DIRECCION

CREATE TABLE Direccion(
	IdDireccion INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	IdUsuario INT NOT NULL,
	Calle VARCHAR(100) NULL,
	NumeroExt INT NULL,
	NumeroInt VARCHAR(10) NULL,
	Colonia VARCHAR(100) NULL,
	Municipio VARCHAR(100) NULL,
	Estado VARCHAR(100) NULL,
	CP VARCHAR(10) NULL,
	Eliminado BIT DEFAULT 0, 
	Insertado DATETIME, 
	Editado DATETIME, 
	UsuarioMov INT
	FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario),
	FOREIGN KEY (UsuarioMov) REFERENCES Usuario(IdUsuario)
)

----CREACION DE TABLA SESION

--CREATE TABLE Sesion (
--  Correo VARCHAR(100) NULL,
--  Token VARCHAR(500) NULL
--)

--CREACION DE TABLA MODULO

CREATE TABLE Modulo(
	IdModulo INT NOT NULL IDENTITY PRIMARY KEY,
	Descripcion VARCHAR(100),
	Eliminado BIT DEFAULT 0,
	Insertado DATETIME, 
	Editado DATETIME, 
	UsuarioMov INT,
	FOREIGN KEY (UsuarioMov) REFERENCES Usuario(IdUsuario)
)

--CREACION DE TABLA MODULO X ROL

CREATE TABLE ModuloXRol(
	IdModuloXRol INT NOT NULL IDENTITY PRIMARY KEY,
	IdModulo INT NOT NULL,
	IdRol INT NOT NULL,
	Eliminado BIT DEFAULT 0, 
	Insertado DATETIME, 
	Editado DATETIME, 
	UsuarioMov INT
	FOREIGN KEY (IdModulo) REFERENCES Modulo(IdModulo),
	FOREIGN KEY (IdRol) REFERENCES Rol(IdRol),
	FOREIGN KEY (UsuarioMov) REFERENCES Usuario(IdUsuario)
)

GO

--################################### CREACION DE PROCEDIMIENTOS ALMACENADOS DE INSERCION ###################################
--CREACION SP INSERTAR USUARIO
CREATE PROCEDURE Usp_Usuario_Ins
	@Nombre VARCHAR(100),
	@ApPaterno VARCHAR(100),
	@ApMaterno VARCHAR(100),
	@UsuarioMov INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint

	BEGIN TRY

		INSERT INTO Usuario(Nombre, ApPaterno, ApMaterno, Insertado, UsuarioMov)
		VALUES(@Nombre, @ApPaterno, @ApMaterno, GETDATE(), @UsuarioMov)

		SELECT SCOPE_IDENTITY() as IdUsuario

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--CREACION SP INSERTAR LOGIN
CREATE PROCEDURE Usp_Login_Ins
	@IdUsuario INT,
	@Usuario VARCHAR(100),
	@Contrasena VARCHAR(100),
	@IdRol INT,
	@UsuarioMov INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint

	BEGIN TRY

		INSERT INTO Login (IdUsuario, Usuario, Contrasena, IdRol, Insertado, UsuarioMov) VALUES (@IdUsuario, @Usuario, @Contrasena, @IdRol, GETDATE(), @UsuarioMov)

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--CREACION SP INSERTAR DIRECCION
CREATE PROCEDURE Usp_Direccion_Ins
	@IdUsuario INT,
	@Calle VARCHAR(100),
	@NumeroExt INT,
	@NumeroInt INT,
	@Colonia VARCHAR(100),
	@Municipio VARCHAR(100),
	@Estado VARCHAR(100),
	@CP VARCHAR(10),
	@UsuarioMov INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint

	BEGIN TRY

		INSERT INTO Direccion (IdUsuario, Calle, NumeroExt, NumeroInt, Colonia, Municipio, Estado, CP, Insertado, UsuarioMov)
		VALUES(@IdUsuario, @Calle, @NumeroExt, @NumeroInt, @Colonia, @Municipio, @Estado, @CP, GETDATE(), @UsuarioMov)

		SELECT SCOPE_IDENTITY() as IdDireccion

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--################################### INSERTS DE EJEMPLOS ###################################

exec Node_Base_API.dbo.Usp_Usuario_Ins 'Arturo', 'Lopez', 'Perez',1
exec Node_Base_API.dbo.Usp_Usuario_Ins 'Margarita', 'lopez', 'perez',1

INSERT INTO Rol (Descripcion, UsuarioMov) VALUES('Administrador', 1)
INSERT INTO Rol (Descripcion, UsuarioMov) VALUES('Cliente', 1)

INSERT INTO Modulo (Descripcion, UsuarioMov) VALUES ('Administracion clientes', 1)
INSERT INTO Modulo (Descripcion, UsuarioMov) VALUES ('Administracion productos', 1)
INSERT INTO Modulo (Descripcion, UsuarioMov) VALUES ('Vista productos', 1)

INSERT INTO ModuloXRol (IdModulo, IdRol, UsuarioMov) VALUES(1, 1, 1)
INSERT INTO ModuloXRol (IdModulo, IdRol, UsuarioMov) VALUES(2, 1, 1)
INSERT INTO ModuloXRol (IdModulo, IdRol, UsuarioMov) VALUES(3, 2, 1)

exec Node_Base_API.dbo.Usp_Direccion_Ins 1, 'Lopez Mateos', 319, '', 'Centro', 'Morelia', 'Michoacan', '58000',1
exec Node_Base_API.dbo.Usp_Direccion_Ins 2, 'Lopez Mateos', 321, '', 'Centro', 'Morelia', 'Michoacan', '58000',1

exec Node_Base_API.dbo.Usp_Login_Ins 1, 'alopez@correo.com', '$2b$05$R12Kmx48pgdyYQDHq9ho7uGdOELjw2OLMkWvu9HlsnFD7qE8Q6K66', 1, 1
exec Node_Base_API.dbo.Usp_Login_Ins 2, 'mperez@correo.com', '$2b$05$R12Kmx48pgdyYQDHq9ho7uGdOELjw2OLMkWvu9HlsnFD7qE8Q6K66', 2, 1

GO

--################################### CREACION DE PROCEDIMIENTOS ALMACENADOS DE ACTUALIZACION ###################################

--CREACION SP ACTUALIZAR USUARIO
CREATE PROCEDURE Usp_Usuario_Act
	@IdUsuario INT,
	@Nombre VARCHAR(100),
	@ApPaterno VARCHAR(100),
	@ApMaterno VARCHAR(100),
	@UsuarioMov INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint

	BEGIN TRY

		UPDATE Usuario 
		SET Nombre = @Nombre, ApPaterno = @ApPaterno, ApMaterno = @ApMaterno, Editado = GETDATE(), UsuarioMov = @UsuarioMov 
		WHERE IdUsuario = @IdUsuario

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--CREACION SP ACTUALIZAR LOGIN
CREATE PROCEDURE Usp_Login_Act
	@IdLogin INT,
	@Usuario VARCHAR(100),
	@Contrasena VARCHAR(100),
	@IdRol INT,
	@UsuarioMov INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint

	BEGIN TRY

		UPDATE Login 
		SET Usuario = @Usuario, Contrasena = @Contrasena, Editado = GETDATE(), IdRol = @IdRol,  UsuarioMov = @UsuarioMov
		WHERE IdLogin = @IdLogin

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--CREACION SP ACTUALIZAR DIRECCION
CREATE PROCEDURE Usp_Direccion_Act
	@IdDireccion INT,
	@IdUsuario INT,
	@Calle VARCHAR(100),
	@NumeroExt INT,
	@NumeroInt VARCHAR(10),
	@Colonia VARCHAR(100),
	@Municipio VARCHAR(100),
	@Estado VARCHAR(100),
	@CP VARCHAR(10),
	@UsuarioMov INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint

	BEGIN TRY

		UPDATE Direccion 
		SET Calle = @Calle, NumeroExt = @NumeroExt, NumeroInt = @NumeroInt, Colonia = @Colonia, Municipio = @Municipio, 
			Estado = @Estado, CP = @CP, Editado = GETDATE(), UsuarioMov = @UsuarioMov, IdUsuario = @IdUsuario
		WHERE IdDireccion = @IdDireccion

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--exec Node_Base_API.dbo.Usp_Login_Act 4, 'correo3@correo.com', '$2b$05$R12Kmx48pgdyYQDHq9ho7uGdOELjw2OLMkWvu9HlsnFD7qE8Q6K66'
--exec Node_Base_API.dbo.Usp_Direccion_Act 2, 'Benito Juarez', 321, '', 'Centro', 'Morelia', 'Michoacan', '58000'
--exec Node_Base_API.dbo.Usp_Usuario_Act 2, 'Margarilla', 'lopez', 'perez', 3

--################################### CREACION DE PROCEDIMIENTOS ALMACENADOS DE ELIMINACION ###################################

--CREACION SP ELIMINAR USUARIO
CREATE PROCEDURE Usp_Usuario_Eli
	@IdUsuario INT,
	@UsuarioMov INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusEliminado int

	SET 
	 @EstatusEliminado = 1

	BEGIN TRY

		UPDATE Usuario SET Eliminado = @EstatusEliminado, UsuarioMov = @UsuarioMov, Editado = GETDATE() WHERE IdUsuario = @IdUsuario

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--CREACION SP ELIMINAR LOGIN
CREATE PROCEDURE Usp_Login_Eli
	@IdLogin INT,
	@UsuarioMov INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusEliminado int

	SET 
	 @EstatusEliminado = 1

	BEGIN TRY

		UPDATE Login SET Eliminado = @EstatusEliminado, UsuarioMov = @UsuarioMov, Editado = GETDATE() WHERE IdLogin = @IdLogin

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--CREACION SP ELIMINAR DIRECCION
CREATE PROCEDURE Usp_Direccion_Eli
	@IdDireccion INT,
	@UsuarioMov INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusEliminado int

	SET 
	 @EstatusEliminado = 1

	BEGIN TRY

		UPDATE Direccion SET Eliminado = @EstatusEliminado, UsuarioMov = @UsuarioMov, Editado = GETDATE() WHERE IdDireccion = @IdDireccion

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--exec Node_Base_API.dbo.Usp_Login_Eli 2
--exec Node_Base_API.dbo.Usp_Direccion_Eli 2
--exec Node_Base_API.dbo.Usp_Usuario_Eli 2

--################################### CREACION DE PROCEDIMIENTOS ALMACENADOS DE LISTADO ###################################

--CREACION SP OBTENER USUARIOS
CREATE PROCEDURE Usp_Usuario_Obt
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusExistente int

	SET 
	 @EstatusExistente = 0

	BEGIN TRY

		SELECT IdUsuario, Nombre, ApPaterno, ApMaterno FROM Usuario  WHERE Eliminado = @EstatusExistente

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--################################### CREACION DE PROCEDIMIENTOS ALMACENADOS DE BUSQUEDA ###################################

--CREACION SP BUSCAR USUARIOS
CREATE PROCEDURE Usp_Usuario_Bus
@IdUsuario INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusExistente int

	SET 
	 @EstatusExistente = 0

	BEGIN TRY

		SELECT IdUsuario, Nombre, ApPaterno, ApMaterno 
		FROM Usuario  
		WHERE Eliminado = @EstatusExistente AND IdUsuario = @IdUsuario

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--CREACION SP BUSCAR LOGIN
CREATE PROCEDURE Usp_Login_Bus
	@IdLogin VARCHAR(100)
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusExistente int

	SET 
	 @EstatusExistente = 0

	BEGIN TRY

		SELECT L.IdUsuario, L.Usuario, L.IdRol 
		FROM Login L
		WHERE L.Eliminado = @EstatusExistente and L.IdLogin = @IdLogin

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--CREACION SP BUSCAR LOGIN POR USUARIO
CREATE PROCEDURE Usp_Login_BusXUsuario
	@Usuario VARCHAR(100)
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusExistente int

	SET 
	 @EstatusExistente = 0

	BEGIN TRY

		SELECT L.IdUsuario, L.Usuario, L.Contrasena, L.IdRol 
		FROM Login L
		WHERE L.Eliminado = @EstatusExistente and L.Usuario = @Usuario

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--CREACION SP OBTENER DIRECCIONES
CREATE PROCEDURE Usp_Direccion_Bus
@IdDireccion INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusExistente int

	SET 
	 @EstatusExistente = 0

	BEGIN TRY
		
		SELECT IdDireccion, IdUsuario, Calle, NumeroExt, NumeroInt, Colonia, Municipio, Estado, CP 
		FROM Direccion 
		WHERE Eliminado = @EstatusExistente AND IdDireccion = @IdDireccion

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO


--CREACION SP BUSCAR USUARIOS CON INFORMACION DE DIRECCION Y LOGIN
CREATE PROCEDURE Usp_UsuarioCompleto_Bus
@IdUsuario INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusExistente int

	SET 
	 @EstatusExistente = 0

	BEGIN TRY

		SELECT 
			U.IdUsuario, U.Nombre, U.ApPaterno, U.ApMaterno, 
			D.IdDireccion, D.Calle, D.NumeroExt, D.NumeroInt, D.Colonia, D.Municipio, D.Estado, D.CP, 
			L.Usuario, L.IdRol
		FROM Node_Base_API.dbo.Usuario  U
		INNER JOIN Node_Base_API.dbo.Direccion D on D.IdUsuario = U.IdUsuario and D.Eliminado = 0
		INNER JOIN Node_Base_API.dbo.Login L on L.IdUsuario = U.IdUsuario and L.Eliminado = 0
		WHERE U.Eliminado = @EstatusExistente AND U.IdUsuario = @IdUsuario

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--################################### CREACION DE PROCEDIMIENTOS ALMACENADOS DE BUSQUEDA X USUARIO ###################################
--CREACION SP BUSCAR LOGIN DEL USUARIO
CREATE PROCEDURE Usp_Login_BusXIdUsuario
	@IdUsuario INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusExistente int

	SET 
	 @EstatusExistente = 0

	BEGIN TRY

		SELECT IdUsuario, Usuario, IdRol 
		FROM Login 
		WHERE Eliminado = @EstatusExistente and IdUsuario = @IdUsuario

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--CREACION SP OBTENER DIRECCIONES DEL USUARIO
CREATE PROCEDURE Usp_Direccion_BusXUsuario
@IdUsuario INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusExistente int

	SET 
	 @EstatusExistente = 0

	BEGIN TRY
		
		SELECT IdDireccion, IdUsuario, Calle, NumeroExt, NumeroInt, Colonia, Municipio, Estado, CP 
		FROM Direccion 
		WHERE Eliminado = @EstatusExistente AND IdUsuario = @IdUsuario

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--CREACION SP BUSCAR MODULOS POR ROL
CREATE PROCEDURE Usp_ModuloXRol_Bus
	@IdRol INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusExistente int

	SET 
	 @EstatusExistente = 0

	BEGIN TRY

		SELECT MXR.IdModulo, M.Descripcion 
		FROM ModuloXRol MXR
		INNER JOIN Modulo M on M.IdModulo = MXR.IdModulo
		WHERE MXR.Eliminado = @EstatusExistente and MXR.IdRol = @IdRol

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--################################### CREACION DE PROCEDIMIENTOS ALMACENADOS PARA VALIDAR SI EXISTE REGISTRO ###################################

--CREACION SP EXISTE USUARIO
CREATE PROCEDURE Usp_Usuario_Exi
@IdUsuario INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusExistente int

	SET 
	 @EstatusExistente = 0

	BEGIN TRY

		IF EXISTS( SELECT 1 FROM Usuario WHERE Eliminado = @EstatusExistente AND IdUsuario = @IdUsuario) 
			return 1
		else
			return 0
		
	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--CREACION SP EXISTE LOGIN
CREATE PROCEDURE Usp_Login_Exi
	@Usuario VARCHAR(100)
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusExistente int

	SET 
	 @EstatusExistente = 0

	BEGIN TRY

		IF EXISTS( SELECT 1 FROM Login WHERE Eliminado = @EstatusExistente AND Usuario = @Usuario) 
			return 1
		else
			return 0

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--CREACION SP EXISTE LOGIN
CREATE PROCEDURE Usp_Login_ExiXId
	@IdLogin INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusExistente int

	SET 
	 @EstatusExistente = 0

	BEGIN TRY

		IF EXISTS( SELECT 1 FROM Login WHERE Eliminado = @EstatusExistente AND IdLogin = @IdLogin) 
			return 1
		else
			return 0

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--CREACION SP EXISTE DIRECCIONES
CREATE PROCEDURE Usp_Direccion_Exi
@IdDireccion INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusExistente int

	SET 
	 @EstatusExistente = 0

	BEGIN TRY
		
		IF EXISTS( SELECT 1	FROM Direccion WHERE Eliminado = @EstatusExistente AND IdDireccion = @IdDireccion) 
			return 1
		else
			return 0

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--################################### CREACION DE PROCEDIMIENTOS ALMACENADOS DE ELIMINACION POR USUARIO###################################

--CREACION SP ELIMINAR LOGIN POR USUARIO
CREATE PROCEDURE Usp_Login_EliXUsuario
	@IdUsuario INT,
	@UsuarioMov INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusEliminado int

	SET 
	 @EstatusEliminado = 1

	BEGIN TRY

		UPDATE Login SET Eliminado = @EstatusEliminado, UsuarioMov = @UsuarioMov, Editado = GETDATE() WHERE IdUsuario = @IdUsuario

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--CREACION SP ELIMINAR DIRECCION POR USUARIO
CREATE PROCEDURE Usp_Direccion_EliXUsuario
	@IdUsuario INT,
	@UsuarioMov INT
AS
BEGIN
	
	DECLARE
	  @ErrorMessage   varchar(2000)
	 ,@ErrorSeverity  tinyint
	 ,@ErrorState     tinyint
	 ,@EstatusEliminado int

	SET 
	 @EstatusEliminado = 1

	BEGIN TRY

		UPDATE Direccion SET Eliminado = @EstatusEliminado, UsuarioMov = @UsuarioMov, Editado = GETDATE() WHERE IdUsuario = @IdUsuario

	END TRY

	BEGIN CATCH
		SET @ErrorMessage  = ERROR_MESSAGE()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState    = ERROR_STATE()
		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)

	END CATCH

END
GO

--exec Node_Base_API.dbo.Usp_Login_EliXUsuario 3
--exec Node_Base_API.dbo.Usp_Direccion_EliXUsuario 3

