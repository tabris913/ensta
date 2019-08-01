# coding: utf-8

import itertools as it


def make(work_list: list, subtitle: str):
    return f'''{{
        "description": "",
        "subtitle": "{subtitle}",
        "work_list": [{','.join(map(make_work, *it.zip_longest(*work_list)))}]
    }}'''


def make_work(uid: str, artist: str = None):
    return f'''{{
        "uid": "{uid}",
        "artist": [{'' if artist is None else f'"{artist}"'}],
        "comment": "",
        "song_list": []
    }}'''


if __name__ == '__main__':
    uids = ['utapri08theater',
            'utapri59sg',
            'utapri09theater',
            'utapri10theater',
            'utapri60sg',
            'utapri13drama',
            'utapri14drama',
            'utapri61sg',
            'utapri15drama',
            'utapri16drama',
            'utapri17drama',
            'utapri18drama',
            'utapri19drama',
            'utapri20drama',
            'utapri01',
            'utapri62sg',
            'utapri02',
            'miyano18sg',
            'utapri03',
            'utapri04',
            'utapri63sg',
            'utapri05',
            'utapri06',
            'utapri07',
            'utapri08']

    content = [map(lambda x: (x,), uids)]
    subtitle = ["Kigndom ～"]

    with open('output_series.txt', 'w', encoding='utf-8') as file:
        file.write(','.join(map(make, content, subtitle)))
