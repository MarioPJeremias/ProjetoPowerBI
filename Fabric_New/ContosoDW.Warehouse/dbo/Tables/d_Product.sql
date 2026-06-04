CREATE TABLE [dbo].[d_Product] (

	[ProductKey] int NOT NULL, 
	[ProductNaturalKey] varchar(10) NOT NULL, 
	[ProductName] varchar(50) NOT NULL, 
	[Brand] varchar(50) NOT NULL, 
	[Subcategory] varchar(50) NOT NULL, 
	[Category] varchar(50) NOT NULL, 
	[UnitCost] decimal(10,2) NOT NULL, 
	[ValidFrom] date NOT NULL, 
	[ValidTo] date NOT NULL, 
	[IsCurrent] bit NOT NULL
);


GO
ALTER TABLE [dbo].[d_Product] ADD CONSTRAINT PK_d_Product primary key NONCLUSTERED ([ProductKey]);