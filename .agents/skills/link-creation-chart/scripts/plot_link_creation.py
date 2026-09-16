#!/usr/bin/env python3
"""Query monthly link creation counts and export a 12-month PNG bar chart."""

from __future__ import annotations

import argparse
import os
from datetime import date
from pathlib import Path

import matplotlib.pyplot as plt
from dotenv import load_dotenv
import psycopg


def shift_month(month: date, offset: int) -> date:
    """Return the first day of the calendar month offset from month."""
    month_index = month.year * 12 + month.month - 1 + offset
    year, month_number = divmod(month_index, 12)
    return date(year, month_number + 1, 1)


def month_labels(start: date, count: int) -> list[str]:
    return [shift_month(start, index).isoformat()[:7] for index in range(count)]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("link-creation-last-12-months.png"),
        help="PNG output path",
    )
    parser.add_argument(
        "--env-file",
        type=Path,
        default=Path(".env"),
        help="dotenv file containing DATABASE_URL",
    )
    parser.add_argument(
        "--timezone",
        default="UTC",
        help="Reporting timezone used for month boundaries",
    )
    return parser.parse_args()


def query_counts(database_url: str, start: date, end: date, timezone: str) -> dict[date, int]:
    query = """
        SELECT
            date_trunc('month', created_at AT TIME ZONE %s)::date AS month,
            COUNT(*)::int AS link_count
        FROM links
                WHERE created_at AT TIME ZONE %s >= %s
                    AND created_at AT TIME ZONE %s < %s
        GROUP BY 1
        ORDER BY 1
    """
    with psycopg.connect(database_url) as connection:
        with connection.cursor() as cursor:
            cursor.execute(query, (timezone, timezone, start, timezone, end))
            return {row[0]: row[1] for row in cursor.fetchall()}


def export_chart(counts: list[int], labels: list[str], output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    figure, axis = plt.subplots(figsize=(12, 6), constrained_layout=True)
    axis.bar(labels, counts, color="#2563eb", width=0.72)
    axis.set_title("Links Created by Month")
    axis.set_xlabel("Month")
    axis.set_ylabel("Links created")
    axis.set_ylim(bottom=0)
    axis.yaxis.get_major_locator().set_params(integer=True)
    axis.grid(axis="y", alpha=0.25)
    axis.set_axisbelow(True)
    figure.savefig(output, dpi=160, format="png")
    plt.close(figure)


def main() -> None:
    args = parse_args()
    load_dotenv(args.env_file)
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        raise SystemExit("DATABASE_URL was not found in the selected dotenv file.")

    current_month = date.today().replace(day=1)
    start = shift_month(current_month, -11)
    end = shift_month(current_month, 1)
    labels = month_labels(start, 12)

    try:
        raw_counts = query_counts(database_url, start, end, args.timezone)
    except (OSError, psycopg.Error) as error:
        raise SystemExit(f"Database query failed: {error.__class__.__name__}") from error

    counts = [raw_counts.get(shift_month(start, index), 0) for index in range(12)]
    export_chart(counts, labels, args.output)
    print(f"Wrote {args.output} for {labels[0]} through {labels[-1]} ({args.timezone}).")
    print(f"Total links: {sum(counts)}")


if __name__ == "__main__":
    main()
