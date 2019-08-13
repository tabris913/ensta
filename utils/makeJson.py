# coding: utf-8

import argparse
import datetime
import pandas

FILE_NAME = 'event_temp.xlsx'
JSON_DIR = '../src/constants/json'

JSON_HEAD = '{{\n  "{}": {{\n'
JSON_FOOT = '  }\n}\n'


def add_quote(s: str) -> str:
    return f'"{s}"'


def convert_list(s: str) -> list:
    return ', '.join(map(add_quote, s.split('、')))


def convert_serial(serial: float, f: str = '%m/%d') -> datetime.datetime:
    return (
        datetime.datetime(
            1899,
            12,
            30) +
        datetime.timedelta(
            days=int(serial))).strftime(f)


def makeEvent():
    df = pandas.read_excel(FILE_NAME, sheet_name='event').dropna(
        subset=['No']).fillna('')

    json_string = JSON_HEAD.format('event')

    for idx in df.index:
        line = df.loc[idx]
        uid = f'e{int(line.No):03d}'

        fmt = f'''    "{uid}": {{
      "uid": "{uid}",
      "name": "{line.event_name}",
      "short_name": "{f'{line.short}' if line.short != '' else ''}",
      "description": "{f'{line.outline2}' if line.outline2 != '' else ''}",
      "description_short": "{f'{line.outline}' if line.outline != '' else ''}",
      "start": "{line.start.strftime('%Y-%m-%d')}",
      "end": "{line.end.strftime('%Y-%m-%d')}",
      "bonus": {{
        "ranking": {{
          "5": [{convert_list(line.ranking5)}],
          "4": [{convert_list(line.ranking4)}],
          "3": [{convert_list(line.ranking3)}]
        }},
        "point": {{
          "5": [{convert_list(line.point5)}],
          "4": [{convert_list(line.point4)}],
          "3": [{convert_list(line.point3)}]
        }}
      }},
      "relation": [{convert_list(line.relation)}],
      "banner": [{convert_list(line.banner)}],
      "img": "{uid}.jpg"
    }}{',' if df.index[-1] != idx else ''}\n'''

        json_string += fmt

    json_string += JSON_FOOT

    with open(f'{JSON_DIR}/event.json', 'w', encoding='utf-8') as f:
        f.write(json_string)


def makeSpecial():
    df = pandas.read_excel(
        FILE_NAME, sheet_name='special').dropna(
        subset=['No']).fillna('')

    json_string = JSON_HEAD.format('special')

    for idx in df.index:
        line = df.loc[idx]
        uid = f'sp{int(line.No):03d}'

        fmt = f'''    "{uid}": {{
      "uid": "{uid}",
      "name": "{line.event_name}",
      "description": "{f'{line.outline}' if line.outline != '' else ''}",
      "start": "{line.start.strftime('%Y-%m-%d')}",
      "end": "{line.end.strftime('%Y-%m-%d')}",
      "relation": [{convert_list(line.relation)}],
      "banner": [{convert_list(line.banner)}],
      "img": "{uid}.jpg"
    }}{',' if df.index[-1] != idx else ''}\n'''

        json_string += fmt

    json_string += JSON_FOOT

    with open(f'{JSON_DIR}/special.json', 'w', encoding='utf-8') as f:
        f.write(json_string)


def makeUC():
    df = pandas.read_excel(FILE_NAME, sheet_name='uc').dropna(
        subset=['No']).fillna('')

    json_string = JSON_HEAD.format('unitCollection')

    for idx in df.index:
        line = df.loc[idx]
        uid = f'u{int(line.No):03d}'

        fmt = f'''    "{uid}": {{
      "uid": "{uid}",
      "name": "{line.event_name}",
      "description": "{f'{line.outline}' if line.outline != '' else ''}",
      "start": "{line.start.strftime('%Y-%m-%d')}",
      "end": "{line.end.strftime('%Y-%m-%d')}",
      "relation": [{convert_list(line.relation)}],
      "banner": [{convert_list(line.banner)}],
      "img": "{uid}.jpg",
      "acquirableCards": [{convert_list(line.acquirableCards)}],
      "revivalEvents": [{convert_list(line.revivalEvents)}]
    }}{',' if df.index[-1] != idx else ''}\n'''

        json_string += fmt

    json_string += JSON_FOOT

    with open(f'{JSON_DIR}/unitCollection.json', 'w', encoding='utf-8') as f:
        f.write(json_string)


def makeScout():
    df = pandas.read_excel(FILE_NAME, sheet_name="scout").fillna('')

    json_string = JSON_HEAD.format('scout')

    for idx in df.index:
        line = df.loc[idx]
        uid = f's{int(line.No):03d}'

        fmt = f'''    "{uid}": {{
      "uid": "{uid}",
      "name": "{line.scout_name}",
      "description": "{f'{line.outline}' if line.outline != '' else ''}",
      "start": "{line.start.strftime('%Y-%m-%d')}",
      "end": "{line.end.strftime('%Y-%m-%d')}",
      "cards": {{
        "5": ["{line.bonus}"]
      }},
      "relation": [{convert_list(line.relation)}],
      "banner": [{convert_list(line.banner)}],
      "img": "{uid}.png",
      "skill": "{line.skill}"
    }}{',' if df.index[-1] != idx else ''}\n'''

        json_string += fmt

    json_string += JSON_FOOT

    with open(f'{JSON_DIR}/scout.json', 'w', encoding='utf-8') as f:
        f.write(json_string)


def makeCard():
    df = pandas.read_excel(
        FILE_NAME,
        sheet_name="card").dropna(
        subset=['No']).fillna('')

    json_string = JSON_HEAD.format('card')

    for idx in df.index:
        line = df.loc[idx]
        uid = f'{idx + 1:05d}'

        fmt = f'''    "{uid}": {{
      "uid": "{uid}",
      "name": "{line.card_name}",
      "character": "{line.character}",
      "rank": {int(line.rarelity)},
      "type": "{line.type}",
      "skill": {{
        "lesson": "",
        "produce": ""
      }},
      "parameter": {{
        "initial": {{
          "dance": {int(line.Da) if line.Da != '' else 0},
          "vocal": {int(line.Vo) if line.Vo != '' else 0},
          "performance": {int(line.Pf) if line.Pf != '' else 0}
        }},
        "max": {{
          "dance": {int(line['Max Da']) if line['Max Da'] != '' else 0},
          "vocal": {int(line['Max Vo']) if line['Max Vo'] != '' else 0},
          "performance": {int(line['Max Pf']) if line['Max Pf'] != '' else 0}
        }}
      }},
      "content": [],
      "bonus": "{line.bonus}",
      "img": ""
    }}{',' if df.index[-1] != idx else ''}\n'''

        json_string += fmt

    json_string += JSON_FOOT

    with open(f'{JSON_DIR}/card.json', 'w', encoding='utf-8') as f:
        f.write(json_string)


def makeUnit():
    df = pandas.read_excel(FILE_NAME, sheet_name="unit").fillna('')

    json_string = JSON_HEAD.format('unit')

    for idx in df.index:
        line = df.loc[idx]

        fmt = f'''    "{line.uid}": {{
      "uid": "{line.uid}",
      "name": "{line.unit_name}",
      "member": ["{line.leader}"{', ' + convert_list(line.others) if line.others != '' else ''}],
      "color": [{convert_list(line.color)}],
      "logo": ""
    }}{',' if df.index[-1] != idx else ''}\n'''

        json_string += fmt

    json_string += JSON_FOOT

    with open(f'{JSON_DIR}/unit.json', 'w', encoding='utf-8') as f:
        f.write(json_string)


def makeCharacter():
    df = pandas.read_excel(FILE_NAME, sheet_name="student").fillna('')

    json_string = JSON_HEAD.format('character')

    for idx in df.index:
        line = df.loc[idx]

        fmt = f'''    "{line.uid}": {{
      "uid": "{line.uid}",
      "name": "{line.chara_name}",
      "birthday": "{convert_serial(line.birth)}",
      "bloodType": "{line.blood}",
      "height": {line.height},
      "weight": {line.weight},
      "catchPhrase": "{line.catch_phrase}",
      "favorite": [],
      "unfavorite": [],
      "imgs": [],
      "club": "{line.club}",
      "unit": [{convert_list(line.unit) if line.unit else ''}]
    }}{',' if df.index[-1] != idx else ''}\n'''

        json_string += fmt

    json_string += JSON_FOOT

    with open(f'{JSON_DIR}/character.json', 'w', encoding='utf-8') as f:
        f.write(json_string)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    args = parser.parse_args()

    makeUnit()
    makeCharacter()
    makeCard()
    makeEvent()
    makeUC()
    makeSpecial()
    makeScout()
