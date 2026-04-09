# Data Challenge

## 🎯 Your Role

You're a Senior Operations Analyst at Global Maritime Solutions, reporting to the VP of Terminal Operations. Following the 2021 Suez Canal disruption, your company has seen inconsistent cargo handling times across terminal locations. Some terminals are operating beyond optimal capacity while others remain underutilized. Following the 2021 Suez disruption, the company needs to identify operational inefficiencies and optimize terminal allocation to reduce cargo movement times by 15%.

The executive team is preparing a Q1 2025 operational review and needs a data-driven report answering:
- Where are our operational bottlenecks?
- Which terminals and vessel types are underperforming?
- How can we optimize terminal allocation to reduce movement times by 15%?

1. Suez effect: 
In March 2021, the Ever Given container ship blocked the Suez Canal for 6 days, disrupting global shipping routes.

Brief: Maritime logistics experienced a major disruption in Q1 2021. Can you identify when it occurred and measure its impact on cargo movements and terminal efficiency?

Your analysis angle:
- Can you identify when the disruption occurred in the data?
- Did cargo volumes spike before/after the incident?
- Which regional hubs (EMEA/APAC/AMER) were most affected?
- How long did it take for operations to return to normal?

Metrics: container_count, move_duration, regional patterns

2. Infrastructure bottleneck
Some terminals may be operating near or above their optimal capacity. Maritime logistics wants to optimize their terminal operations. Your report should identifies bottlenecks in the infrastructure. 

- Which terminals handle the most cargo movements?
- Is there a correlation between terminal utilization and movement duration?
- Are certain vessel categories creating congestion at specific terminals?
- Which terminals would benefit most from capacity expansion?

Metrics: terminal_capacity (should be added), container_count, move_duration by terminal

3. Efficiency anomalies
The average time to move cargo (move_duration) varies significantly across terminals, vessel types, and time periods. Understanding these patterns is key to operational improvement.

- What's the baseline efficiency for each vessel category?
- Which factors most strongly predict longer movement times?
 (vessel age? terminal location? shift timing? regional hub?)
- Are there outliers that suggest operational problems?
- Do night shifts take longer than day shifts?

Metrics: move_duration, vessel_category, vessel age, shift (if added correctly), regional_hub
---
*Challenge generated on 2026-01-19 11:51:57*