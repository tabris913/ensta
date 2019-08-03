# coding: utf-8

import argparse
import pandas

FILE_NAME = 'event_temp.xlsx'
JSON_DIR = '../src/constants/json'

JSON_HEAD = '{{\n  "{}": {{\n'
JSON_FOOT = '  }\n}\n'


def add_quote(s: str) -> str:
    return f'"{s}"'


def makeEvent():
    df = pandas.read_excel(FILE_NAME, sheet_name="event")
    test = df.loc[0]
    print(test)

    fmt = f'''{{
      "uid": "e001",
      "name": "{test['イベント名']}",
    }}'''

    print(fmt)


def makeScout():
    df = pandas.read_excel(FILE_NAME, sheet_name="scout")


def makeCard():
    df = pandas.read_excel(FILE_NAME, sheet_name="card")
    test = df.loc[0]
    print(test)

    fmt = f'''{{
      "uid": "00001",
      "character": "mao",
    }}'''

    print(fmt)


def makeUnit():
    df = pandas.read_excel(FILE_NAME, sheet_name="unit").fillna('')

    json_string = JSON_HEAD.format('unit')

    for idx in df.index:
        line = df.iloc[idx]

        fmt = f'''    "{line.uid}": {{
      "uid": "{line.uid}",
      "name": "{line.unit_name}",
      "member": ["{line.leader}"{', ' + ', '.join(map(add_quote, line.others.split('、'))) if line.others != '' else ''}],
      "color": [{', '.join(map(add_quote, line.color.split('、')))}],
      "logo": ""
    }}{',' if df.index[-1] != idx else ''}\n'''

        json_string += fmt

    json_string += JSON_FOOT

    with open(f'{JSON_DIR}/unit.json', 'w', encoding='utf-8') as f:
        f.write(json_string)


def makeCharacter():
    df = pandas.read_excel(FILE_NAME, sheet_name="character")

    json_string = JSON_HEAD.format('character')

    for idx in df.index:
        line = df.iloc[idx]

        fmt = f'''    "{line.uid}": {{

    }}{',' if df.index[-1] != idx else ''}\n'''


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    args = parser.parse_args()

    # makeEvent()
    # makeCard()
    makeUnit()
