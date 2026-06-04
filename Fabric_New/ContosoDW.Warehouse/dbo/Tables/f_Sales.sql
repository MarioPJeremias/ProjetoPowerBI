CREATE TABLE [dbo].[f_Sales] (

	[DateKey] int NOT NULL, 
	[StoreKey] int NOT NULL, 
	[ProductKey] int NOT NULL, 
	[CustomerKey] int NOT NULL, 
	[Quantity] int NOT NULL, 
	[UnitPrice] decimal(10,2) NOT NULL, 
	[SalesAmount] decimal(10,2) NOT NULL, 
	[DiscountAmount] decimal(10,2) NOT NULL
);


GO
ALTER TABLE [dbo].[f_Sales] ADD CONSTRAINT FK_Sales_Customer FOREIGN KEY ([CustomerKey]) REFERENCES [dbo].[d_Customer]([CustomerKey]);
GO
ALTER TABLE [dbo].[f_Sales] ADD CONSTRAINT FK_Sales_Date FOREIGN KEY ([DateKey]) REFERENCES [dbo].[d_Date]([DateKey]);
GO
ALTER TABLE [dbo].[f_Sales] ADD CONSTRAINT FK_Sales_Product FOREIGN KEY ([ProductKey]) REFERENCES [dbo].[d_Product]([ProductKey]);
GO
ALTER TABLE [dbo].[f_Sales] ADD CONSTRAINT FK_Sales_Store FOREIGN KEY ([StoreKey]) REFERENCES [dbo].[d_Store]([StoreKey]);