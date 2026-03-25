import { DBSQLClient } from '@databricks/sql';

export interface DatabricksConfig {
  host: string;
  token: string;
  httpPath: string;
  catalog: string;
  schema: string;
}

let client: DBSQLClient | null = null;
let session: any = null;

export async function getDatabricksConnection() {
  if (session) {
    return session;
  }

  const config: DatabricksConfig = {
    host: process.env.DATABRICKS_HOST || "",
    token: process.env.DATABRICKS_TOKEN || "",
    httpPath: process.env.DATABRICKS_HTTP_PATH || "",
    catalog: process.env.DATABRICKS_CATALOG || "main",
    schema: process.env.DATABRICKS_SCHEMA || "academia_babel",
  };

  if (!config.host || !config.token || !config.httpPath) {
    throw new Error("Missing Databricks configuration in environment variables");
  }

  try {
    client = new DBSQLClient();
    const connection = await client.connect({
      host: config.host,
      token: config.token,
      path: config.httpPath,
    });

    session = await connection.openSession({
      initialCatalog: config.catalog,
      initialSchema: config.schema,
    });

    console.log("✓ Connected to Databricks");
    return session;
  } catch (error) {
    console.error("✗ Failed to connect to Databricks:", error);
    throw error;
  }
}

export async function closeConnection() {
  if (session) {
    await session.close();
    session = null;
  }
  if (client) {
    await client.close();
    client = null;
    console.log("✓ Disconnected from Databricks");
  }
}

export async function executeQuery(query: string, params?: any[]) {
  const sess = await getDatabricksConnection();

  try {
    const operation = await sess.executeStatement(query, {
      runAsync: false,
    });

    const result = await operation.fetchAll();
    await operation.close();
    
    return result;
  } catch (error) {
    console.error("Query execution error:", error);
    throw error;
  }
}
