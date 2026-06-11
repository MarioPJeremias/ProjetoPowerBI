CREATE TABLE [dim].[date] (

	[date_key] bigint IDENTITY NOT NULL, 
	[calendar_date] date NOT NULL, 
	[calendar_year] int NULL, 
	[calendar_month] int NULL, 
	[month_name] varchar(20) NULL, 
	[calendar_quarter] int NULL
);