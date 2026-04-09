# Data Dictionary

**Theme:** International Maritime Logistics & Terminal Efficiency
**Generated:** 2026-01-19 11:51:57
**Date Range:** 2021-01-01 to 2024-12-31
**Currency:** USD

---

## Table of Contents

- [dim_terminal](#dim_terminal)
- [dim_time](#dim_time)
- [dim_vessel](#dim_vessel)
- [fact_cargo_movements](#fact_cargo_movements)

---

## dim_terminal

**Type:** DIMENSION
**Primary Key:** `terminal_id`
**Estimated Rows:** 50

### Description

Captures key business metrics and dimensions.

### Columns

| Column Name | Data Type | Nullable | Unique | Description |
|---|---|---|---|---|
| `terminal_id` | integer | No | No | Terminal ID |
| `terminal_name` | string | No | No | Terminal Name |
| `port_location` | geojson | No | No | Terminal geographic coordinates |
| `regional_hub` | string | No | No | Global Trade Zone |

### Data Generation

| Column | Generator | Parameters |
|---|---|---|
| `terminal_id` | sequence | — |
| `terminal_name` | faker | — |
| `port_location` | faker | — |
| `regional_hub` | choice | choices=['EMEA', 'APAC', 'AMER'] |

## dim_time

**Type:** DIMENSION
**Primary Key:** `date_id`
**Estimated Rows:** 5,000

### Description

Captures key business metrics and dimensions.

### Columns

| Column Name | Data Type | Nullable | Unique | Description |
|---|---|---|---|---|
| `date_id` | date | No | No | Date for the record |
| `fiscal_year` | integer | No | No | Fiscal Year |
| `quarter` | integer | No | No | Fiscal Quarter |
| `month` | integer | No | No | Month |
| `week` | integer | No | No | Week |
| `shift` | string | No | No | Shift (Day/Night) |

### Data Generation

| Column | Generator | Parameters |
|---|---|---|
| `date_id` | date_sequence | — |
| `fiscal_year` | date_part | part=year |
| `quarter` | date_part | part=quarter |
| `month` | date_part | part=month |
| `week` | date_part | part=week |
| `shift` | choice | choices=['Day', 'Night'] |

## dim_vessel

**Type:** DIMENSION
**Primary Key:** `vessel_id`
**Estimated Rows:** 1,000

### Description

Captures key business metrics and dimensions.

### Columns

| Column Name | Data Type | Nullable | Unique | Description |
|---|---|---|---|---|
| `vessel_id` | integer | No | No | Vessel ID |
| `vessel_name` | string | No | No | Vessel Name |
| `vessel_category` | string | No | No | Category of Vessel |
| `build_year` | integer | No | No | Year the vessel was built |

### Data Generation

| Column | Generator | Parameters |
|---|---|---|
| `vessel_id` | sequence | — |
| `vessel_name` | faker | — |
| `vessel_category` | choice | choices=['Tanker', 'Cargo', 'Passenger'] |
| `build_year` | numpy | distribution=uniform, low=1990, high=2023 |

## fact_cargo_movements

**Type:** FACT
**Primary Key:** `movement_id`
**Estimated Rows:** 15,000
**Grain:** one row per cargo movement

### Description

Captures key business metrics and dimensions.

### Columns

| Column Name | Data Type | Nullable | Unique | Description |
|---|---|---|---|---|
| `movement_id` | integer | No | No | Unique movement identifier |
| `vessel_id` | integer | No | No | Vessel identifier |
| `terminal_id` | integer | No | No | Terminal identifier |
| `container_count` | integer | No | No | Number of containers moved |
| `move_duration` | float | No | No | Duration of cargo movement in hours |
| `route_geometry` | geojson | No | No | Origin and destination coordinates |

### Data Generation

| Column | Generator | Parameters |
|---|---|---|
| `movement_id` | sequence | — |
| `vessel_id` | faker | — |
| `terminal_id` | faker | — |
| `container_count` | numpy | distribution=poisson |
| `move_duration` | numpy | distribution=normal |
| `route_geometry` | faker | — |

---

## Relationships

### Foreign Key Constraints

| From Table | From Column | To Table | To Column | Type |
|---|---|---|---|---|
| fact_cargo_movements | `vessel_id` | dim_vessel | `vessel_id` | Many To One |
| fact_cargo_movements | `terminal_id` | dim_terminal | `terminal_id` | Many To One |

### Relationship Descriptions

- **fact_cargo_movements** has many to one **dim_vessel**: `fact_cargo_movements.vessel_id` references `dim_vessel.vessel_id`
- **fact_cargo_movements** has many to one **dim_terminal**: `fact_cargo_movements.terminal_id` references `dim_terminal.terminal_id`

---

## Data Quality & Characteristics

### Missing Values
Columns marked as 'Nullable: Yes' may contain null values representing missing data.

### Unique Constraints
Columns marked as 'Unique: Yes' have no duplicate values (excluding nulls).

### Primary Keys
Primary keys are unique identifiers with no null values.

### Temporal Coverage
All dates fall within: 2021-01-01 to 2024-12-31

---

*Dictionary generated on 2026-01-19 11:51:57*