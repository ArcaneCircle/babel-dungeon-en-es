#!/usr/bin/env python3
import os
import sys


def sort0(pair: tuple[int, str]) -> int:
    words_count = len(pair[1].split())
    if words_count <= 2:
        return 1
    return words_count


def sort1(pair: tuple[int, str]) -> int:
    words_count = len(pair[1].split())
    if words_count <= 3:
        return 1
    return words_count


def sort2(pair: tuple[int, str]) -> int:
    words_count = len(pair[1].split())
    if words_count <= 5:
        return 1
    return words_count


def sort3(pair: tuple[int, str]) -> int:
    words_count = len(pair[1].split())
    if words_count <= 10:
        return 1
    return words_count


def main() -> None:
    source = [each for each in os.listdir() if each.endswith(".tsv")][0]
    dest = "src/lib/sentences.ts"
    start = 0
    count = 100000

    sentences = {}
    meanings = {}
    meanings_ids = {}
    with open(source) as fd:
        for line in fd.readlines():
            row = line.strip().split("\t")
            id = int(row[0])
            sentences[id] = row[1]
            meanings.setdefault(id, []).append(row[3])
            meanings_ids[row[3]] = int(row[2])

    print(f"TOTAL: {len(sentences)}")
    count = min(len(sentences), count)

    new_sents = []
    items = sorted(sorted(sentences.items()), key=sort0)
    for id, sen in list(items)[:100]:
        new_sents.append((id, sen))
        del sentences[id]
    items = sorted(sorted(sentences.items()), key=sort1)
    for id, sen in list(items)[:500]:
        new_sents.append((id, sen))
        del sentences[id]
    items = sorted(sorted(sentences.items()), key=sort2)
    for id, sen in list(items)[:10000]:
        new_sents.append((id, sen))
        del sentences[id]
    items = sorted(sorted(sentences.items()), key=sort3)
    for id, sen in list(items):
        new_sents.append((id, sen))
        del sentences[id]

    if len(sys.argv) == 2 and sys.argv[1] == "sort":
        with open(source, "w") as f:
            for id, sen in new_sents:
                for meaning in meanings[id]:
                    mid = meanings_ids[meaning]
                    f.write(f"{id}\t{sen}\t{mid}\t{meaning}\n")
        print(f"sorted {len(new_sents)} sentences")
        return

    with open(dest, "w") as f:
        f.write("export const SENTENCES = `")
        count2 = 0
        for id, sen in new_sents[start:count]:
            count2 += 1
            f.write(f"{sen}\t{'|'.join(meanings[id])}".replace("`", "\`"))
            if count2 != count:
                f.write("\n")
        f.write('`.split("\\n");\n')
    print(f"generated {count2} sentences")


if __name__ == "__main__":
    main()
