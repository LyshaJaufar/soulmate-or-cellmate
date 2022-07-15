    jsonFile = open("src/data.json", "w")
    jsonFile.write(json.dumps(jsonObj))
    jsonFile.close()
