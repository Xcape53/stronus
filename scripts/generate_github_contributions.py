#!/usr/bin/env python3
"""Generate the portfolio contribution chart from GitHub's GraphQL API."""

from __future__ import annotations

import argparse
import json
import subprocess
from datetime import date, datetime, time, timedelta, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "images" / "gh-contributions.svg"
QUERY = """
query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}
"""

LEVELS = {
    "NONE": 0,
    "FIRST_QUARTILE": 1,
    "SECOND_QUARTILE": 2,
    "THIRD_QUARTILE": 3,
    "FOURTH_QUARTILE": 4,
}
COLORS = {
    0: "#1d2024",
    1: "#79ccff",
    2: "#5fb2ff",
    3: "#2c7ffe",
    4: "#2366cb",
}
MONTHS = ("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--login", default="Xcape53", help="GitHub profile login")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT, help="Target SVG path")
    parser.add_argument("--end-date", type=date.fromisoformat, default=date.today(), help="Calendar end date")
    return parser.parse_args()


def github_calendar(login: str, end_date: date) -> dict:
    start_date = end_date - timedelta(days=365)
    start = datetime.combine(start_date, time.min, timezone.utc).isoformat().replace("+00:00", "Z")
    end = datetime.combine(end_date, time.max, timezone.utc).isoformat().replace("+00:00", "Z")
    command = [
        "gh",
        "api",
        "graphql",
        "-f",
        f"query={QUERY}",
        "-F",
        f"login={login}",
        "-F",
        f"from={start}",
        "-F",
        f"to={end}",
    ]
    result = subprocess.run(command, check=True, capture_output=True, text=True, encoding="utf-8")
    payload = json.loads(result.stdout)
    return payload["data"]["user"]["contributionsCollection"]["contributionCalendar"]


def text_element(label: str, x: int, y: int, size: int = 10) -> str:
    return (
        f'  <text fill="#767676" x="{x}" y="{y}" font-family="{FONT}" '
        f'font-size="{size}px">{label}</text>'
    )


def render_svg(calendar: dict, login: str) -> str:
    weeks = calendar["weeks"]
    total = calendar["totalContributions"]
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<svg viewBox="0 0 663 104" xmlns="http://www.w3.org/2000/svg" width="663" height="104"',
        f'     role="img" aria-labelledby="title desc" data-total-contributions="{total}">',
        f"  <title id=\"title\">GitHub contribution graph for {login}</title>",
        f"  <desc id=\"desc\">{total} contributions in the displayed year.</desc>",
    ]

    for week_index, week in enumerate(weeks):
        x = 27 + week_index * 12
        for day in week["contributionDays"]:
            day_date = date.fromisoformat(day["date"])
            sunday_based_weekday = (day_date.weekday() + 1) % 7
            y = 20 + sunday_based_weekday * 12
            level = LEVELS[day["contributionLevel"]]
            count = day["contributionCount"]
            lines.append(
                f'  <rect fill="{COLORS[level]}" data-score="{level}" data-count="{count}" '
                f'data-date="{day["date"]}" x="{x}" y="{y}" width="10" height="10" rx="2"/>'
            )

    lines.extend(
        [
            text_element("Mon", 0, 40, 9),
            text_element("Wed", 0, 64, 9),
            text_element("Fri", 0, 88, 9),
        ]
    )

    previous_month = None
    for week_index, week in enumerate(weeks):
        first_day = date.fromisoformat(week["contributionDays"][0]["date"])
        if first_day.month != previous_month:
            lines.append(text_element(MONTHS[first_day.month - 1], 27 + week_index * 12, 10))
            previous_month = first_day.month

    lines.append("</svg>")
    return "\n".join(lines) + "\n"


def main() -> None:
    args = parse_args()
    calendar = github_calendar(args.login, args.end_date)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(render_svg(calendar, args.login), encoding="utf-8", newline="\n")
    print(f"Wrote {args.output} with {calendar['totalContributions']} contributions.")


if __name__ == "__main__":
    main()
