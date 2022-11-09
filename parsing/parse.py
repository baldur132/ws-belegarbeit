import re

def compare_words(word_a: str, word_b: str):
    # find longer word
    if len(word_a) < len(word_b):
        shorter = word_a
        longer = word_b
    else:
        shorter = word_b
        longer = word_a

    # ensure that words are within 3/4 the length of each other
    if len(longer) // 1.5 > len(shorter):
        return False

    matched = 0
    for i, char in enumerate(shorter):
        if (char == longer[i]):
            matched += 1
        else:
            break
    
    # return match if the number of matching characters is greater than 3/4 the length
    if matched > len(shorter) / 1.5:
        return True
    else:
        return False

if __name__ == "__main__":
    with open('dewiktionary-latest-all-titles-in-ns0', 'r') as inputfile, open('parsed.txt', 'w') as outputfile:
        match_target = "\n"
        i = 0
        lower = 1000
        higher = 1020
        for line in inputfile:
            if re.search(r'^[a-zA-ZäÄöÖüÜß\-\']+$', line):
                print(f"comparing \"{ line[:-1] }\" to target \"{ match_target[:-1] }\"")

                if compare_words(line, match_target):
                    print(f"> postive match, ignoring")
                else:
                    print(f"> negative match, writing and updating target")
                    outputfile.write(line)
                    match_target = line

            i += 1