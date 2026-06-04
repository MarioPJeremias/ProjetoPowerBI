CREATE TABLE [dbo].[d_Date] (

	[DateKey] int NOT NULL, 
	[FullDate] date NOT NULL, 
	[Year] int NOT NULL, 
	[Quarter] int NOT NULL, 
	[Month] int NOT NULL, 
	[MonthName] varchar(10) NOT NULL, 
	[Day] int NOT NULL, 
	[DayOfWeek] varchar(10) NOT NULL, 
	[FiscalYear] int NOT NULL, 
	[FiscalQuarter] int NOT NULL, 
	[IsHoliday] bit NOT NULL, 
	[IsWeekday] bit NOT NULL
);


GO
ALTER TABLE [dbo].[d_Date] ADD CONSTRAINT PK_d_Date primary key NONCLUSTERED ([DateKey]);