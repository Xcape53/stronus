"""Generate the crawlable Polish page from index.html and js/i18n.js."""

from __future__ import annotations

import json
import re
from pathlib import Path

from bs4 import BeautifulSoup, Comment


ROOT = Path(__file__).resolve().parents[1]
SOURCE_HTML = ROOT / "index.html"
TRANSLATIONS_JS = ROOT / "js" / "i18n.js"
OUTPUT_HTML = ROOT / "pl" / "index.html"


def read_translations() -> dict[str, dict[str, str]]:
    source = TRANSLATIONS_JS.read_text(encoding="utf-8")
    marker = "const translations = "
    start = source.index(marker) + len(marker)
    end = source.index(";\n\n  const isPolishPage", start)
    object_literal = source[start:end]
    object_literal = re.sub(r"(?m)^(\s+)(en|pl):", r'\1"\2":', object_literal)
    return json.loads(object_literal)


def set_meta(soup: BeautifulSoup, selector: str, value: str) -> None:
    element = soup.select_one(selector)
    if element is not None:
        element["content"] = value


def localize_content(soup: BeautifulSoup, dictionary: dict[str, str]) -> None:
    for element in soup.select("[data-i18n]"):
        key = element.get("data-i18n")
        if key not in dictionary:
            continue
        fragment = BeautifulSoup(dictionary[key], "html.parser")
        element.clear()
        for child in list(fragment.contents):
            element.append(child)


def prefix_relative_assets(soup: BeautifulSoup) -> None:
    def prefixed(value: str) -> str:
        if not value or value.startswith(("#", "/", "http://", "https://", "mailto:", "tel:", "data:")):
            return value
        return "../" + value.removeprefix("./")

    for attribute in ("href", "src", "data-full-src", "data-view-src"):
        for element in soup.select(f"[{attribute}]"):
            value = element.get(attribute, "")
            element[attribute] = prefixed(value)

    for attribute in ("srcset", "data-view-srcset"):
        for element in soup.select(f"[{attribute}]"):
            candidates = []
            for candidate in element.get(attribute, "").split(","):
                parts = candidate.strip().split()
                if not parts:
                    continue
                parts[0] = prefixed(parts[0])
                candidates.append(" ".join(parts))
            element[attribute] = ", ".join(candidates)

    for element in soup.select("[style]"):
        element["style"] = element["style"].replace("url(images/", "url(../images/")


def generate() -> None:
    translations = read_translations()
    soup = BeautifulSoup(SOURCE_HTML.read_text(encoding="utf-8"), "html.parser")
    soup.html["lang"] = "pl"
    localize_content(soup, translations["pl"])

    soup.title.string = "Piotr Jeleniewicz | Elektronika i programowanie"
    set_meta(
        soup,
        'meta[name="description"]',
        "Piotr Jeleniewicz studiuje elektronikę i telekomunikację oraz tworzy oprogramowanie w Gdyni. Zobacz projekty FPGA, Python, C++, web i automatyzację.",
    )
    set_meta(soup, 'meta[property="og:title"]', "Piotr Jeleniewicz | Elektronika i programowanie")
    set_meta(
        soup,
        'meta[property="og:description"]',
        "Portfolio z obszaru elektroniki, programowania i automatyzacji: FPGA, Python, C++, aplikacje webowe oraz sterowanie radioteleskopem.",
    )
    set_meta(soup, 'meta[property="og:url"]', "https://piotrjeleniewicz.com/pl/")
    set_meta(soup, 'meta[property="og:locale"]', "pl_PL")
    set_meta(soup, 'meta[property="og:locale:alternate"]', "en_US")
    set_meta(soup, 'meta[property="og:image:alt"]', "Portfolio Piotra Jeleniewicza - elektronika i oprogramowanie")
    set_meta(soup, 'meta[name="twitter:title"]', "Piotr Jeleniewicz | Elektronika i programowanie")
    set_meta(
        soup,
        'meta[name="twitter:description"]',
        "Portfolio z obszaru elektroniki, programowania i automatyzacji: FPGA, Python, C++, aplikacje webowe oraz sterowanie radioteleskopem.",
    )
    set_meta(soup, 'meta[name="twitter:image:alt"]', "Portfolio Piotra Jeleniewicza - elektronika i oprogramowanie")

    canonical = soup.select_one('link[rel="canonical"]')
    if canonical is not None:
        canonical["href"] = "https://piotrjeleniewicz.com/pl/"

    for option in soup.select("#lang-toggle [data-lang-option]"):
        is_active = option.get("data-lang-option") == "pl"
        classes = [name for name in option.get("class", []) if name != "is-active"]
        if is_active:
            classes.append("is-active")
            option["aria-current"] = "page"
        else:
            option.attrs.pop("aria-current", None)
        if classes:
            option["class"] = classes
        else:
            option.attrs.pop("class", None)

    structured_data = soup.select_one('script[type="application/ld+json"]')
    if structured_data is not None and structured_data.string:
        data = json.loads(structured_data.string)
        for entity in data.get("@graph", []):
            if entity.get("@type") == "ProfilePage":
                entity["@id"] = "https://piotrjeleniewicz.com/pl/#profile"
                entity["url"] = "https://piotrjeleniewicz.com/pl/"
                entity["name"] = "Piotr Jeleniewicz - portfolio elektroniki i oprogramowania"
                entity["description"] = "Portfolio Piotra Jeleniewicza, studenta elektroniki i telekomunikacji oraz programisty z Gdyni."
                entity["inLanguage"] = "pl"
            elif entity.get("@type") == "Person":
                entity["jobTitle"] = "Programista i student elektroniki"
                entity["description"] = "Student elektroniki i telekomunikacji na Politechnice Gdańskiej, programista oraz autor projektów z obszaru FPGA, automatyzacji i aplikacji webowych."
                entity["homeLocation"]["name"] = "Gdynia, Polska"
                entity["affiliation"]["name"] = "Politechnika Gdańska"
        structured_data.string = "\n" + json.dumps(data, ensure_ascii=False, indent=2) + "\n"

    prefix_relative_assets(soup)
    soup.insert(1, Comment(" Generated by scripts/generate_pl.py. Do not edit this file by hand. "))
    OUTPUT_HTML.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_HTML.write_text(str(soup), encoding="utf-8", newline="\n")


if __name__ == "__main__":
    generate()
