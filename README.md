# Open Bible API

Open Bible API let's anyone in need of a bible database which is easily queriable host their own. It aims to integrate features found in paid services to a free and self-hosted platform.

## Included Translations

Only World English Bible is included because it is in the Pubic Domain and is free to use and distribute. Other translations can easily be added as long as they follow the correct schema.

Feel free to add your own translations and make a pull request to add them to the repository. But please make sure that the translation is in the Public Domain.

## Translation Schema

### Language

Under `translations/` a folder should be created for each language, by default `english` is included. Inside this language folder a `metadata.json` should be added including the following metadata:

```json
{
  "displayName": "Swedish",
  "abbreviation": "sw"
}
```

### Translation

Inside the corresponding language folder a new folder should be made for each new translation, this should have the name of the translations abbreviation in uppercase.

Inside each translation folder a `metadata.json` file containing the following metadata should be written:

```json
{
  "name": "World English Bible",
  "abbreviation": "WEB",
  "uid": "eng-WEB",
  "info": "The World English Bible is an English translation of the Bible freely shared online. The translation work began in 1994 and was deemed complete in 2020. Created by volunteers with oversight by Michael Paul Johnson, the WEB is an updated revision of the American Standard Version from 1901."
}
```

The uid has to be unique between all translatins including ones in other languages.

### Book

Inside the corresponding translation folder a new folder should be made for each bible book, this should have the english abbreviation for the book ([list here](#book-abbreviations)).

Inside each book folder a `metadata.json` file containing the following metadata should be written:

```json
{
  "name": "The First Book of the Maccabees",
  "abbreviation": "1MA"
}
```

The abbreviation has to match the name of the folder.

### Chapter

Inside the corresponding book folder a new folder should be made for each chapter, this should have the chapter number as the name of the folder (e.g. `1`).

Inside each chapter folder a `metadata.json` file containing the following metadata should be written:

```json
{
  "name": "First Corinthians 1",
  "number": 1
}
```

The number has to match the name of the folder.

### Verse

Inside the corresponding chapter folder a file should be made called `text.txt`. This file should contain the text of the chapter, each verse should be on a new line.

```txt
Paul, called to be an apostle of Jesus Christ through the will of God, and our brother Sosthenes,

to the assembly of God which is at Corinth; those who are sanctified in Christ Jesus, called to be saints, with all who call on the name of our Lord Jesus Christ in every place, both theirs and ours:

Grace to you and peace from God our Father and the Lord Jesus Christ.

...
```

**Warning!** Empty lines were added to make the example more readable, they should not be included in the actual file!

# REST API

The REST API is used to query the database and get the text of the bible.

## Get a list of all languages

`GET /api/languages`

### Response

```json
[
  {
    "displayName": "English",
    "abbreviation": "en"
  },
  {
    "displayName": "Swedish",
    "abbreviation": "sv"
  }
]
```

## Get a list of all translations in a language

`GET /api/languages/{language}/translations`

### Response

```json
[
  {
    "name": "World English Bible",
    "abbreviation": "WEB",
    "uid": "eng-WEB",
    "info": "The World English Bible is an English translation of the Bible freely shared online. The translation work began in 1994 and was deemed complete in 2020. Created by volunteers with oversight by Michael Paul Johnson, the WEB is an updated revision of the American Standard Version from 1901."
  },
  {
    "name": "King James Version",
    "abbreviation": "KJV",
    "uid": "eng-KJV",
    "info": "The King James Version (KJV), also known as the King James Bible (KJB), sometimes as the English version of 1611, or simply the Authorized Version (AV), is an English translation of the Christian Bible for the Church of England, commissioned in 1604 and completed as well as published in 1611 under the sponsorship of James VI and I."
  }
]
```

## Get a list of all books in a translation

`GET /api/languages/{language}/translations/{translation}/books`

### Response

```json
[
  {
    "name": "Genesis",
    "abbreviation": "GEN"
  },
  {
    "name": "Exodus",
    "abbreviation": "EXO"
  },
  ...
]
```

## Get number of chapters in a book

`GET /api/languages/{language}/translations/{translation}/books/{book}/chapters`

### Response

```json
{
  "count": 50
}
```

## Get number of verses in a chapter

`GET /api/languages/{language}/translations/{translation}/books/{book}/chapters/{chapter}/verses`

### Response

```json
{
  "count": 31
}
```

## Get a range of verses in a chapter

`GET /api/languages/{language}/translations/{translation}/books/{book}/chapters/{chapter}/verses?from={from}&to={to}`

### Response

```json
[
  {
    "number": 1,
    "text": "Paul, called to be an apostle of Jesus Christ through the will of God, and our brother Sosthenes,"
  },
  {
    "number": 2,
    "text": "to the assembly of God which is at Corinth; those who are sanctified in Christ Jesus, called to be saints, with all who call on the name of our Lord Jesus Christ in every place, both theirs and ours:"
  },
  ...
]
```

## Get a single verse

`GET /api/languages/{language}/translations/{translation}/books/{book}/chapters/{chapter}/verses/{verse}`

### Response

```json
{
  "number": 1,
  "text": "Paul, called to be an apostle of Jesus Christ through the will of God, and our brother Sosthenes,"
}
```

## Query a range of verses

`GET /api/languages/{language}/translations/{translation}?query={query}`

### Response

```json
[
  {
    "book": "1 Corinthians",
    "chapter": 1,
    "verse": 1,
    "text": "Paul, called to be an apostle of Jesus Christ through the will of God, and our brother Sosthenes,"
  },
  {
    "book": "1 Corinthians",
    "chapter": 1,
    "verse": 2,
    "text": "to the assembly of God which is at Corinth; those who are sanctified in Christ Jesus, called to be saints, with all who call on the name of our Lord Jesus Christ in every place, both theirs and ours:"
  },
  ...
]
```

# Book Abbreviations

For naming the book folders these bible book name abbreviations should be used.

```jsonc
{
  // Old Testament
  "GEN": "Genesis",
  "EXO": "Exodus",
  "LEV": "Leviticus",
  "NUM": "Numbers",
  "DEU": "Deuteronomy",
  "JOS": "Joshua",
  "JDG": "Judges",
  "RUT": "Ruth",
  "1SA": "1 Samuel",
  "2SA": "2 Samuel",
  "1KI": "1 Kings",
  "2KI": "2 Kings",
  "1CH": "1 Chronicles",
  "2CH": "2 Chronicles",
  "EZR": "Ezra",
  "NEH": "Nehemiah",
  "EST": "Esther",
  "JOB": "Job",
  "PSA": "Psalms",
  "PRO": "Proverbs",
  "ECC": "Ecclesiastes",
  "SNG": "Song of Solomon",
  "ISA": "Isaiah",
  "JER": "Jeremiah",
  "LAM": "Lamentations",
  "EZK": "Ezekiel",
  "DAN": "Daniel",
  "HOS": "Hosea",
  "JOL": "Joel",
  "AMO": "Amos",
  "OBA": "Obadiah",
  "JON": "Jonah",
  "MIC": "Micah",
  "NAM": "Nahum",
  "HAB": "Habakkuk",
  "ZEP": "Zephaniah",
  "HAG": "Haggai",
  "ZEC": "Zechariah",
  "MAL": "Malachi",

  // New Testament
  "MAT": "Matthew",
  "MRK": "Mark",
  "LUK": "Luke",
  "JHN": "John",
  "ACT": "Acts",
  "ROM": "Romans",
  "1CO": "1 Corinthians",
  "2CO": "2 Corinthians",
  "GAL": "Galatians",
  "EPH": "Ephesians",
  "PHP": "Philippians",
  "COL": "Colossians",
  "1TH": "1 Thessalonians",
  "2TH": "2 Thessalonians",
  "1TI": "1 Timothy",
  "2TI": "2 Timothy",
  "TIT": "Titus",
  "PHM": "Philemon",
  "HEB": "Hebrews",
  "JAS": "James",
  "1PE": "1 Peter",
  "2PE": "2 Peter",
  "1JN": "1 John",
  "2JN": "2 John",
  "3JN": "3 John",
  "JUD": "Jude",
  "REV": "Revelation",

  // Apocrypha
  "TOB": "Tobit",
  "JDT": "Judith",
  "ESG": "Esther (Greek)",
  "WIS": "Wisdom",
  "SIR": "Sirach",
  "BAR": "Baruch",
  "S3Y": "Song of the Three Holy Children",
  "SUS": "Susanna",
  "BEL": "Bel and the Dragon",
  "1MA": "1 Maccabees",
  "2MA": "2 Maccabees",
  "1ES": "1 Esdras",
  "2ES": "2 Esdras",
  "MAN": "Prayer of Manasseh",
  "PS2": "Psalm 151",
  "3MA": "3 Maccabees",
  "4MA": "4 Maccabees"
}
```
