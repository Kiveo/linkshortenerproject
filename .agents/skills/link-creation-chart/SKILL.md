---
name: link-creation-chart
description: Use this skill whenever the user asks for a chart, report, trend, metric, or visualization of links created from a Postgres database. It reads the database URL from the project's .env file, performs a read-only monthly aggregation over the most recent 12 calendar months, fills months with zero links, and exports a clearly labeled PNG bar chart. Trigger even when the user says "link growth," "monthly signups," or "how many short links were created" without explicitly asking for a bar chart.
compatibility: Requires Python 3.10+, a readable project .env containing DATABASE_URL, and Python packages python-dotenv, psycopg, and matplotlib.
---

# Link Creation Chart

Create a trustworthy PNG bar chart of monthly link creation from the project's Postgres database.

## Workflow

1. Inspect the project's schema and environment conventions before querying. In this repository, the source is the `links` table and the creation timestamp is `created_at`; the connection variable is `DATABASE_URL`.
2. Treat `.env` as a secret-bearing file. Load `DATABASE_URL` inside Python and never print it, include it in a transcript, commit it, or write it into an output file.
3. Use the bundled `scripts/plot_link_creation.py` script when it matches the schema. It performs a read-only parameterized query and creates the PNG. Do not modify application data.
4. Define the reporting window as the current calendar month plus the preceding 11 calendar months, for 12 labeled months total. This makes the chart stable and ensures the current partial month is visible.
5. Aggregate by calendar month using a documented timezone. Use UTC unless the user specifies another reporting timezone. Keep the boundary calculations and database grouping in the same timezone.
6. Include every month in the window, including months with no rows. A missing month means zero links, not missing data.
7. Export a PNG with one bar per month, chronological x-axis labels in `YYYY-MM` format, a y-axis labeled `Links created`, a descriptive title, and readable tick labels. Use a zero baseline and a non-negative integer y-axis scale.
8. Validate the result before reporting completion: confirm the PNG exists, is non-empty, opens as an image, and contains exactly 12 monthly categories. Report the output path and the window covered, but not the database URL or raw connection details.

## Dependencies

Install missing dependencies in the active Python environment rather than changing the application package manifest:

```bash
python3 -m pip install python-dotenv psycopg[binary] matplotlib
```

## Usage

From the project root:

```bash
python3 .agents/skills/link-creation-chart/scripts/plot_link_creation.py \
  --output link-creation-last-12-months.png
```

Optional arguments:

- `--env-file PATH` selects a dotenv file other than `.env`.
- `--timezone ZONE` changes the reporting timezone; default is `UTC`.
- `--output PATH` selects the PNG path; default is `link-creation-last-12-months.png`.

If the schema differs from `links.created_at`, inspect the local schema and make the smallest corresponding change to the query. Keep the query read-only and parameterized. Do not fall back to a fabricated chart when the database cannot be reached or the timestamp column cannot be confirmed; explain the blocking error without exposing secrets.

## Completion Report

State:

- the PNG output path;
- the 12-month window and timezone;
- whether zero-activity months were included; and
- any dependency or database-access issue that prevented completion.

Do not include credentials, full connection strings, or raw database error text that may contain connection details.
