-- Auto Generated (Do not modify) 99ACEB68F7CD07DC6D38EF36FC6401A174E5280FB65D4E5B676B1CE679CD7FA1
 -- Create view: monthly sales summary by product category
 CREATE VIEW gold.vw_monthly_sales
 AS
 SELECT
     d.calendar_year,
     d.calendar_month,
     d.month_name,
     p.category,
     COUNT(*) AS order_count,
     SUM(o.quantity) AS total_quantity,
     SUM(o.quantity * o.unit_price) AS total_sales
 FROM staging.orders AS o
 INNER JOIN staging.dates AS d
     ON o.order_date = d.calendar_date
 INNER JOIN staging.products AS p
     ON o.product_id = p.product_id
 WHERE o.status = 'Completed'
 GROUP BY d.calendar_year, d.calendar_month, d.month_name, p.category;