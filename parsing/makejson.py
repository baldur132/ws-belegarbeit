with open('wordlist.txt', 'r') as inputfile, open('wordlist.json', 'w') as outputfile:
    outputfile.write("[")
    for line in inputfile:
        outputfile.write(f"\"{ line[:-1] }\",")
    outputfile.write("]")
