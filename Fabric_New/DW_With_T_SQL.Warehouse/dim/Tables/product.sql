CREATE TABLE [dim].[product] (

	[product_key] bigint IDENTITY NOT NULL, 
	[product_id] varchar(20) NOT NULL, 
	[product_name] varchar(100) NULL, 
	[category] varchar(50) NULL, 
	[unit_price] decimal(10,2) NULL
);