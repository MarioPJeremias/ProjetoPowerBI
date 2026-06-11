CREATE TABLE [dim].[customer] (

	[customer_key] bigint IDENTITY NOT NULL, 
	[customer_id] varchar(20) NOT NULL, 
	[customer_name] varchar(100) NULL, 
	[segment] varchar(50) NULL, 
	[region] varchar(50) NULL, 
	[effective_date] date NULL, 
	[end_date] date NULL, 
	[is_current] bit NULL
);