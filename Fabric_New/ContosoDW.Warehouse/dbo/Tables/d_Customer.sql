CREATE TABLE [dbo].[d_Customer] (

	[CustomerKey] int NOT NULL, 
	[CustomerName] varchar(50) NOT NULL, 
	[Segment] varchar(20) NOT NULL, 
	[City] varchar(50) NOT NULL, 
	[State] varchar(50) NOT NULL, 
	[Country] varchar(50) NOT NULL, 
	[LoyaltyTier] varchar(20) NOT NULL, 
	[JoinDate] date NOT NULL
);


GO
ALTER TABLE [dbo].[d_Customer] ADD CONSTRAINT PK_d_Customer primary key NONCLUSTERED ([CustomerKey]);