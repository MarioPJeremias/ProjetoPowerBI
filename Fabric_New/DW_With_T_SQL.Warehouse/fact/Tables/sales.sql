CREATE TABLE [fact].[sales] (

	[sales_key] bigint IDENTITY NOT NULL, 
	[date_key] bigint NOT NULL, 
	[customer_key] bigint NOT NULL, 
	[product_key] bigint NOT NULL, 
	[quantity] int NULL, 
	[unit_price] decimal(10,2) NULL, 
	[sales_amount] decimal(12,2) NULL
);