# Fabric notebook source

# METADATA ********************

# META {
# META   "kernel_info": {
# META     "name": "synapse_pyspark"
# META   },
# META   "dependencies": {
# META     "lakehouse": {
# META       "default_lakehouse": "c4b94abf-03e0-4d27-b30e-82a904a8159b",
# META       "default_lakehouse_name": "Sales_Excer",
# META       "default_lakehouse_workspace_id": "f98ad964-8964-4ec9-8410-a5df73f6210e",
# META       "known_lakehouses": [
# META         {
# META           "id": "c4b94abf-03e0-4d27-b30e-82a904a8159b"
# META         }
# META       ]
# META     }
# META   }
# META }

# MARKDOWN ********************

# # Sales Data Transformation
# 
# This notebook walks through a series of data transformation tasks using Spark SQL in a Microsoft Fabric lakehouse. You generate sample data, clean and shape it, join multiple tables, apply aggregations and window functions, and write the results to a Delta table.
# 
# **Before you begin**: Attach this notebook to your lakehouse by selecting **Add** in the **Explorer** pane on the left, then selecting your lakehouse.

# MARKDOWN ********************

# ## Generate sample data
# 
# Run the following cell to create three Delta tables in the lakehouse: `raw_sales`, `customers`, and `products`. The `raw_sales` table intentionally contains a duplicate row (order_id 10 appears twice) and a null value in the `region` column — these represent common data quality issues found in real source data.

# CELL ********************

from pyspark.sql.types import StructType, StructField, StringType, IntegerType, DoubleType, DateType
from datetime import date

# Sales transactions with intentional data quality issues
sales_data = [
    (1, "C001", "P001", 5, 29.99, date(2026, 1, 15), "East"),
    (2, "C002", "P002", 2, 49.99, date(2026, 1, 20), "West"),
    (3, "C001", "P003", 1, 199.99, date(2026, 2, 10), "East"),
    (4, "C003", "P001", 10, 29.99, date(2026, 2, 14), "North"),
    (5, "C002", "P004", 3, 15.99, date(2026, 3, 1), "West"),
    (6, "C004", "P002", 1, 49.99, date(2026, 3, 5), None),
    (7, "C001", "P001", 4, 29.99, date(2026, 3, 15), "East"),
    (8, "C005", "P003", 2, 199.99, date(2026, 4, 1), "South"),
    (9, "C003", "P005", 6, 9.99, date(2026, 4, 10), "North"),
    (10, "C002", "P001", 3, 29.99, date(2026, 4, 20), "West"),
    (10, "C002", "P001", 3, 29.99, date(2026, 4, 20), "West"),
]

sales_schema = StructType([
    StructField("order_id", IntegerType()), StructField("customer_id", StringType()),
    StructField("product_id", StringType()), StructField("quantity", IntegerType()),
    StructField("unit_price", DoubleType()), StructField("order_date", DateType()),
    StructField("region", StringType())
])

spark.createDataFrame(sales_data, sales_schema).write.format("delta").mode("overwrite").saveAsTable("raw_sales")

# Customer reference data
customer_data = [
    ("C001", "Contoso Ltd", "East"), ("C002", "Fabrikam Inc", "West"),
    ("C003", "Northwind Traders", "North"), ("C004", "Adventure Works", "South"),
    ("C005", "Woodgrove Bank", "South")
]

customer_schema = StructType([
    StructField("customer_id", StringType()), StructField("customer_name", StringType()),
    StructField("customer_region", StringType())
])

spark.createDataFrame(customer_data, customer_schema).write.format("delta").mode("overwrite").saveAsTable("customers")

# Product reference data
product_data = [
    ("P001", "Widget A", "Accessories"), ("P002", "Widget B", "Electronics"),
    ("P003", "Premium Device", "Electronics"), ("P004", "Basic Supply", "Accessories"),
    ("P005", "Mini Component", "Components")
]

product_schema = StructType([
    StructField("product_id", StringType()), StructField("product_name", StringType()),
    StructField("category", StringType())
])

spark.createDataFrame(product_data, product_schema).write.format("delta").mode("overwrite").saveAsTable("products")

print("Created tables: raw_sales (11 rows), customers (5 rows), products (5 rows)")

# METADATA ********************

# META {
# META   "language": "python",
# META   "language_group": "synapse_pyspark"
# META }

# MARKDOWN ********************

# After running the cell above, select **&#8635; Refresh** next to **Tables** in the **Explorer** pane to confirm that `raw_sales`, `customers`, and `products` appear.

# MARKDOWN ********************

# ## Shape and clean the sales data
# 
# Real-world data rarely arrives clean. The following query applies four transformations in a single pass:
# 
# - **`SELECT DISTINCT`** removes the duplicate row, reducing the count from 11 to 10.
# - **`COALESCE(region, 'Unknown')`** replaces the null region with a default value.
# - **`quantity * unit_price AS line_total`** adds a calculated column for the total sale amount.
# - **`CASE ... END AS value_tier`** creates a conditional column that categorizes each order as High, Medium, or Low.

# CELL ********************

# MAGIC %%sql
# MAGIC -- Clean raw sales: remove duplicates, fill nulls, add calculated and conditional columns
# MAGIC CREATE OR REPLACE TEMP VIEW clean_sales AS
# MAGIC SELECT DISTINCT
# MAGIC     order_id,
# MAGIC     customer_id,
# MAGIC     product_id,
# MAGIC     quantity,
# MAGIC     unit_price,
# MAGIC     order_date,
# MAGIC     COALESCE(region, 'Unknown') AS region,
# MAGIC     ROUND(quantity * unit_price, 2) AS line_total,
# MAGIC     CASE
# MAGIC         WHEN quantity * unit_price > 100 THEN 'High'
# MAGIC         WHEN quantity * unit_price > 50 THEN 'Medium'
# MAGIC         ELSE 'Low'
# MAGIC     END AS value_tier
# MAGIC FROM raw_sales

# METADATA ********************

# META {
# META   "language": "sparksql",
# META   "language_group": "synapse_pyspark"
# META }

# MARKDOWN ********************

# Run the next cell to verify: 10 rows (duplicate removed), order_id 6 shows `Unknown` for region, and every row has `line_total` and `value_tier` values.

# CELL ********************

# MAGIC %%sql
# MAGIC -- Verify the cleaned sales data
# MAGIC SELECT * FROM clean_sales ORDER BY order_id

# METADATA ********************

# META {
# META   "language": "sparksql",
# META   "language_group": "synapse_pyspark"
# META }

# MARKDOWN ********************

# ### Try it with Copilot (Optional)
# 
# In a new code cell, ask Copilot to extend `clean_sales` with an additional column. Try this prompt:
# 
# > "Write Spark SQL to select all columns from clean_sales and add a column called is_discounted that is TRUE when unit_price is less than 20, otherwise FALSE. Save the result as a temp view called clean_sales_extended."
# 
# This creates a new view without changing the `clean_sales` view you built.

# MARKDOWN ********************

# ## Join and aggregate the data
# 
# Cleaned data becomes more useful when enriched with context from other tables. The next cell joins the sales data with customer and product reference tables using `INNER JOIN`.

# CELL ********************

# MAGIC %%sql
# MAGIC -- Join sales with customer and product tables
# MAGIC CREATE OR REPLACE TEMP VIEW enriched_sales AS
# MAGIC SELECT
# MAGIC     s.order_id,
# MAGIC     s.order_date,
# MAGIC     c.customer_name,
# MAGIC     p.product_name,
# MAGIC     p.category,
# MAGIC     s.quantity,
# MAGIC     s.unit_price,
# MAGIC     s.line_total,
# MAGIC     s.value_tier,
# MAGIC     s.region
# MAGIC FROM clean_sales s
# MAGIC INNER JOIN customers c ON s.customer_id = c.customer_id
# MAGIC INNER JOIN products p ON s.product_id = p.product_id

# METADATA ********************

# META {
# META   "language": "sparksql",
# META   "language_group": "synapse_pyspark"
# META }

# MARKDOWN ********************

# Run the next cell to create a regional revenue summary. The 10 detail rows are collapsed into summary rows — one for each region — with order counts, total revenue, and average order value.

# CELL ********************

# MAGIC %%sql
# MAGIC -- Aggregate: regional revenue summary
# MAGIC SELECT
# MAGIC     region,
# MAGIC     COUNT(*) AS order_count,
# MAGIC     ROUND(SUM(line_total), 2) AS total_revenue,
# MAGIC     ROUND(AVG(line_total), 2) AS avg_order_value
# MAGIC FROM enriched_sales
# MAGIC GROUP BY region
# MAGIC ORDER BY total_revenue DESC

# METADATA ********************

# META {
# META   "language": "sparksql",
# META   "language_group": "synapse_pyspark"
# META }

# MARKDOWN ********************

# ### Try it with Copilot (Optional)
# 
# Ask Copilot to create an additional aggregation from `enriched_sales`. Try this prompt:
# 
# > "Write Spark SQL to show the total revenue and number of orders for each product category from the enriched_sales view, ordered by total revenue descending."
# 
# This runs a new query — it doesn't modify the views or tables you already created.

# MARKDOWN ********************

# ## Apply window functions
# 
# Window functions calculate values across related rows without collapsing the detail. The next cell adds a running total and order sequence number for each customer using `SUM() OVER` and `ROW_NUMBER() OVER`.

# CELL ********************

# MAGIC %%sql
# MAGIC -- Window functions: running total and order sequence per customer
# MAGIC SELECT
# MAGIC     customer_name,
# MAGIC     order_date,
# MAGIC     line_total,
# MAGIC     SUM(line_total) OVER (
# MAGIC         PARTITION BY customer_name ORDER BY order_date
# MAGIC     ) AS running_total,
# MAGIC     ROW_NUMBER() OVER (
# MAGIC         PARTITION BY customer_name ORDER BY order_date
# MAGIC     ) AS order_sequence
# MAGIC FROM enriched_sales
# MAGIC ORDER BY customer_name, order_date

# METADATA ********************

# META {
# META   "language": "sparksql",
# META   "language_group": "synapse_pyspark"
# META }

# MARKDOWN ********************

# ### Try it with Copilot (Optional)
# 
# Ask Copilot to apply a different window function to the same data. Try this prompt:
# 
# > "Write Spark SQL that selects region, total revenue from enriched_sales grouped by region, and adds a RANK column ordered by total revenue descending."
# 
# This produces a new result set without affecting the `enriched_sales` view.

# MARKDOWN ********************

# ## Write results to a Delta table
# 
# Persisting results as a Delta table makes the data available to reports, other notebooks, and downstream pipelines. The next cell writes the enriched sales view to a managed Delta table.

# CELL ********************

# MAGIC %%sql
# MAGIC -- Write enriched data to a permanent Delta table
# MAGIC CREATE OR REPLACE TABLE gold_sales AS
# MAGIC SELECT * FROM enriched_sales

# METADATA ********************

# META {
# META   "language": "sparksql",
# META   "language_group": "synapse_pyspark"
# META }

# MARKDOWN ********************

# Select **&#8635; Refresh** next to **Tables** in the **Explorer** pane to verify that `gold_sales` appears. Then run the next cell to confirm the data is queryable.

# CELL ********************

# MAGIC %%sql
# MAGIC -- Verify the Delta table contents
# MAGIC SELECT category, region, COUNT(*) AS orders, ROUND(SUM(line_total), 2) AS revenue
# MAGIC FROM gold_sales
# MAGIC GROUP BY category, region
# MAGIC ORDER BY revenue DESC

# METADATA ********************

# META {
# META   "language": "sparksql",
# META   "language_group": "synapse_pyspark"
# META }

# MARKDOWN ********************

# ### Try it with Copilot (Optional)
# 
# Ask Copilot to write a filtered query against the Delta table you wrote. Try this prompt:
# 
# > "Write Spark SQL to find all orders in gold_sales where the value_tier is 'High', showing customer_name, product_name, and line_total."
# 
# This queries the permanent table without modifying it.
