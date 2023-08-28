
# substrings.js

Looks for substrings found between two given delimiting strings. Find all results and return an array or find the first result and return it. The delimiters can be the same.

## Docs
`getAll` - looks for all substrings and returns the results in an array.

`getOne` - looks for the first substring returns the
result as a string.

## Example
```
const substrings = require("substrings")

const text = "some text BEFORE substring1 AFTER " +
"some text BEFORE substring2 AFTER some text"

substrings.getAll("BEFORE ", " AFTER", text)
// ["substring1","substring2"]

substrings.getOne("BEFORE ", " AFTER", text)
// "substring1"
```
