
if __name__ == "__main__":
    with open("wordlist.txt", "r") as inputfile, open("wordlist-sorted.txt", "w") as outputfile:
        lines = inputfile.readlines()
        sorted_lines = sorted(lines, key = str.lower)
        for line in lines:
            outputfile.write(line)