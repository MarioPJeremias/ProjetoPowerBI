CREATE TABLE [gold].[monthly_sales] (

	[calendar_year] int NULL, 
	[calendar_month] int NULL, 
	[month_name] varchar(20) NULL, 
	[category] varchar(50) NULL, 
	[order_count] int NULL, 
	[total_quantity] int NULL, 
	[total_sales] decimal(12,2) NULL
);