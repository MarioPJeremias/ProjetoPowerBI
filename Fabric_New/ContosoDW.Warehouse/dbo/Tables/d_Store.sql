CREATE TABLE [dbo].[d_Store] (

	[StoreKey] int NOT NULL, 
	[StoreNaturalKey] varchar(10) NOT NULL, 
	[StoreName] varchar(50) NOT NULL, 
	[StoreType] varchar(20) NOT NULL, 
	[City] varchar(50) NOT NULL, 
	[State] varchar(50) NOT NULL, 
	[Country] varchar(50) NOT NULL, 
	[Region] varchar(50) NOT NULL, 
	[OpenDate] date NOT NULL, 
	[ValidFrom] date NOT NULL, 
	[ValidTo] date NOT NULL, 
	[IsCurrent] bit NOT NULL
);


GO
ALTER TABLE [dbo].[d_Store] ADD CONSTRAINT PK_d_Store primary key NONCLUSTERED ([StoreKey]);