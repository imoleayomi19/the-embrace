import json, re

with open('parsed_items.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

products = []
current_series = None

i = 0
while i < len(items):
    kind, val = items[i]
    if kind == 'p':
        text = val.strip()
        if 'PRODUCT SERIES' in text:
            current_series = text
        elif text.startswith('IVEM-'):
            prod_name = text
            sub = ''
            if i + 1 < len(items) and items[i+1][0] == 'p' and not items[i+1][1].startswith('IVEM-'):
                i += 1
                sub = items[i][1]
            tbl = None
            if i + 1 < len(items) and items[i+1][0] == 'tbl':
                i += 1
                tbl = items[i][1]
            products.append({
                'series': current_series,
                'name': prod_name,
                'subtitle': sub,
                'table': tbl
            })
            if prod_name == 'IVEM-12 DUAL BOOST':
                break
    i += 1

print(f"Total target products: {len(products)}")

with open('target_products.json', 'w', encoding='utf-8') as out:
    json.dump(products, out, indent=2, ensure_ascii=False)

for idx, p in enumerate(products):
    print(f"#{idx+1}: {p['name']} | Subtitle: {p['subtitle']} | Rows: {len(p['table']) if p['table'] else 0}")
