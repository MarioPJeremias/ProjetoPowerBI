[DefaultOutputDestinationSettings = [DestinationDefinition = [Kind = "Reference", QueryName = "DefaultDestination", IsNewTarget = true], UpdateMethod = [Kind = "Replace"], DestinationTypeSettings = [Kind = "Table"]], StagingDefinition = [Kind = "FastCopy"]]
section Section1;
shared DefaultDestination = Lakehouse.Contents([EnableFolding = false]){[workspaceId = "f98ad964-8964-4ec9-8410-a5df73f6210e"]}[Data]{[lakehouseId = "1036d340-fa93-4d29-9593-f05e60042fe1"]}[Data];
[BindToDefaultDestination = true]
shared orders = let
  Origem = Csv.Document(Web.Contents("https://raw.githubusercontent.com/MicrosoftLearning/dp-data/main/orders.csv"), [Delimiter = ",", Columns = 7, QuoteStyle = QuoteStyle.None]),
  #"Cabeçalhos promovidos" = Table.PromoteHeaders(Origem, [PromoteAllScalars = true]),
  #"Tipo de coluna alterado" = Table.TransformColumnTypes(#"Cabeçalhos promovidos", {{"SalesOrderID", Int64.Type}, {"OrderDate", type date}, {"CustomerID", Int64.Type}, {"LineItem", Int64.Type}, {"ProductID", Int64.Type}, {"OrderQty", Int64.Type}, {"LineItemTotal", Int64.Type}}),
  #"Linhas filtradas" = Table.SelectRows(#"Tipo de coluna alterado", each [OrderDate] <> null and [OrderDate] <> ""),
  #"Linhas filtradas 1" = Table.SelectRows(#"Linhas filtradas", each [OrderQty] > 0),
  #"Colunas renomeadas" = Table.RenameColumns(#"Linhas filtradas 1", {{"OrderQty", "Quantity"}, {"LineItemTotal", "Line Total"}, {"LineItem", "Item"}}),
  #"Personalização adicionada" = Table.TransformColumnTypes(Table.AddColumn(#"Colunas renomeadas", "Unit Price", each [Line Total] / [Quantity]), {{"Unit Price", type number}}),
  #"Linhas classificadas" = Table.Sort(#"Personalização adicionada", {{"Unit Price", Order.Ascending}}),
  Arredondado = Table.TransformColumns(#"Linhas classificadas", {{"Unit Price", each Number.Round(_, 2), type number}})
in
  Arredondado;
