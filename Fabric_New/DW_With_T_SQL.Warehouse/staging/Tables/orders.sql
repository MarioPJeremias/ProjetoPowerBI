CREATE TABLE [staging].[orders] (

	[order_id] int NOT NULL, 
	[customer_id] varchar(20) NULL, 
	[product_id] varchar(20) NULL, 
	[order_date] date NULL, 
	[quantity] int NULL, 
	[unit_price] decimal(10,2) NULL, 
	[discount] decimal(10,2) NULL, 
	[status] varchar(20) NULL
);