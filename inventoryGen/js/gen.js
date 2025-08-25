function genDivs() {
    const v = parseInt(document.getElementById("name").value, 10) || 0;
    const e = document.getElementById("inv");

    // Usuń istniejące elementy
    const elements = document.querySelectorAll("div.row, style");
    elements.forEach(el => el.parentNode.removeChild(el));

    // Generuj nowe wiersze i komórki
    for (let i = 0; i < v; i++) {
        const row = document.createElement("div");
        row.className = "row";
        row.id = "c" + (i + 1);

        const cell = document.createElement("div");
        cell.id = "d" + (i + 1);
        cell.className = "cell";

        const img = document.createElement("img");
        img.id = "e" + (i + 1);

        cell.appendChild(img);
        row.appendChild(cell);
        e.appendChild(row);
    }

    // Definicje stylów CSS
    const styles = {
        paddingLeft: "padding-left: 28px; margin-left: -28px;",
        paddingRight: "padding-right: 28px; margin-right: -28px;",
        paddingTop: "padding-top: 28px; margin-top: -28px;",
        paddingBottom: "padding-bottom: 28px; margin-bottom: -28px;",
        background1: "background: url('inventory1.png');",
        background2: "background: url('inventory2.png');",
        background3: "background: url('inventory3.png');",
        background4: "background: url('inventory4.png');",
        background5: "background: url('inventory5.png');",
        background6: "background: url('inventory6.png');",
        base: "width: 72px; height: 72px; background-repeat: no-repeat; display: inline-block;",
    };

    const sheet = document.createElement('style');
    document.body.appendChild(sheet);
    let styleRules = "";

    const {
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
        background1,
        background2,
        background3,
        background4,
        background5,
        background6,
        base
    } = styles;
    const t = paddingTop;
    const b = paddingBottom;
    const l = paddingLeft;
    const r = paddingRight;

    // Logika generowania stylów
    if (v < 10) {
        if (v > 1) {
            for (let i = 2; i < v; i++) {
                styleRules += `#c${i} { ${t} ${b} ${background2} ${base} }`;
            }
            styleRules += `#c1 { ${l} ${t} ${b} ${background1} ${base} }`;
            styleRules += `#c${v} { ${r} ${t} ${b} ${background2} ${base} }`;
        } else if (v === 1) {
            styleRules += `#c1 { ${r} ${l} ${t} ${b} ${background1} ${base} }`;
        }
    } else if (v >= 10 && v < 18) {
        styleRules += `#c1 { ${l} ${t} ${background1} ${base} }`;
        for (let i = 2; i < v - 8; i++) {
            styleRules += `#c${i} { ${t} ${background2} ${base} }`;
        }
        for (let i = Math.floor(v / 9) - 1; i > 0; i--) {
            styleRules += `#c${i * 9 + 1} { ${l} ${background3} ${base} }`;
        }
        styleRules += `#c${v} { ${b} ${r} ${background6} ${base} }`;
        const lastRowStart = v - v % 9 + 1;
        if (v === 10) {
            styleRules += `#c${lastRowStart} { ${l} ${b} ${background5} ${base} }`;
        } else {
            styleRules += `#c${lastRowStart} { ${l} ${b} ${background3} ${base} }`;
        }
        styleRules += `#c${v - v % 9} { ${r} ${t} ${b} ${background2} ${base} }`;
        for (let i = v - 1; i > lastRowStart; i--) {
            styleRules += `#c${i} { ${b} ${background4} ${base} }`;
        }
        for (let i = v - 8; i < (v - v % 9); i++) {
            styleRules += `#c${i} { ${t} ${b} ${background2} ${base} }`;
        }
    } else if (v >= 18) {
        styleRules += `#c1 { ${l} ${t} ${background1} ${base} }`;
        for (let i = 2; i < 9; i++) {
            styleRules += `#c${i} { ${t} ${background2} ${base} }`;
        }
        styleRules += `#c9 { ${r} ${t} ${background2} ${base} }`;

        for (let i = Math.floor(v / 9) - 1; i > 1; i--) {
            styleRules += `#c${i * 9} { ${r} ${background4} ${base} }`;
        }

        for (let i = 1; i < v - 8; i++) {
            if (i > 10 && i % 9 !== 1 && i % 9 !== 0) {
                styleRules += `#c${i} { ${r} ${background4} ${base} }`;
            }
        }

        const vMod9 = v % 9;
        if (vMod9 === 0) {
            for (let i = Math.floor(v / 9) - 2; i > 0; i--) {
                styleRules += `#c${i * 9 + 1} { ${l} ${background3} ${base} }`;
            }
            styleRules += `#c${v} { ${b} ${r} ${background4} ${base} }`;
            styleRules += `#c${v - 8} { ${b} ${l} ${background3} ${base} }`;
            for (let i = 1; i < 8; i++) {
                styleRules += `#c${v - i} { ${b} ${background4} ${base} }`;
            }
        } else if (vMod9 === 1) {
            for (let i = Math.floor(v / 9) - 1; i > 0; i--) {
                styleRules += `#c${i * 9 + 1} { ${l} ${background3} ${base} }`;
            }
            styleRules += `#c${v} { ${l} ${b} ${r} ${background5} ${base} }`;
            styleRules += `#c${v - 1} { ${b} ${r} ${background4} ${base} }`;
            for (let i = 2; i < 9; i++) {
                styleRules += `#c${v - i} { ${b} ${background4} ${base} }`;
            }
        } else if (vMod9 > 1) {
            for (let i = Math.floor(v / 9) - 1; i > 0; i--) {
                styleRules += `#c${i * 9 + 1} { ${l} ${background3} ${base} }`;
            }
            styleRules += `#c${v} { ${b} ${r} ${background6} ${base} }`;
            const lastRowStart = v - vMod9 + 1;
            styleRules += `#c${lastRowStart} { ${l} ${b} ${background3} ${base} }`;
            styleRules += `#c${v - vMod9} { ${r} ${b} ${background4} ${base} }`;
            for (let i = v - 1; i > lastRowStart; i--) {
                styleRules += `#c${i} { ${b} ${background4} ${base} }`;
            }
            for (let i = v - 8; i < (v - vMod9); i++) {
                styleRules += `#c${i} { ${b} ${background4} ${base} }`;
            }
        }
    }

    sheet.textContent = styleRules;
}