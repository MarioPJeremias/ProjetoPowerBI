-- Create stored procedure: refresh monthly sales for a given year and month
 CREATE PROCEDURE gold.usp_refresh_monthly_sales
     @year INT,
     @month INT
 AS
 BEGIN
     -- Remove existing data for the target period
     DELETE FROM gold.monthly_sales
     WHERE calendar_year = @year AND calendar_month = @month;

     -- Insert fresh aggregated data
     INSERT INTO gold.monthly_sales
         (calendar_year, calendar_month, month_name, category,
          order_count, total_quantity, total_sales)
     SELECT
         d.calendar_year,
         d.calendar_month,
         d.month_name,
         p.category,
         COUNT(*),
         SUM(o.quantity),
         SUM(o.quantity * o.unit_price)
     FROM staging.orders AS o
     INNER JOIN staging.dates AS d
         ON o.order_date = d.calendar_date
     INNER JOIN staging.products AS p
         ON o.product_id = p.product_id
     WHERE o.status = 'Completed'
         AND d.calendar_year = @year
         AND d.calendar_month = @month
     GROUP BY d.calendar_year, d.calendar_month, d.month_name, p.category;
 END;