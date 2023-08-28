
/**
 * Utilities
 * 
 * Defines utility functions used by the main script.
 */


/**
 * Checks the value returned by a string's indexOf() method.
 * Returns false if the search value was not found in the
 * string. Returns true if the value is a valid index.
 * 
 * @param {Number} index - An index from a native method.
 * @returns {Boolean} - If the index is valid.
 */
function exists (index) {
  const exists = index >= 0

  return exists
}


/**
 * Trims text up to and including the opening delimiter off
 * of the beginning of the text string and adds information
 * to query object.
 * 
 * @param {Object} query - A substring query object.
 * @param {Text} text - The text being searched.
 * @returns {Object} - Object with the query and text.
 */
function update (query, text) {
  const q = query

  q.before = text.indexOf(q.open)
  q.start = q.before + q.open.length

  const newText = text.slice(q.start, text.length)

  q.stop = newText.indexOf(q.close)
  q.after = q.stop + q.close.length
  q.openPos = q.before
  q.closePos = q.before + q.stop
  q.hasOpen = exists(q.openPos)
  q.hasClose = exists(q.stop)
  q.position = q.position + q.start + q.after

  return { query: q, text: newText }
}


/**
 * Outputs debug warnings on a substring query and returns
 * true if there is a new substring result.
 *  
 * @param {Object} query - A substring query object.
 * @param {Boolean} hasResults - If results already exist.
 * @returns {Boolean} - If there is a new result.
 */
export function check (query, hasResults) {
  const order = query.openPos < query.closePos
  const check = query.hasOpen && query.hasClose && order

  if (query.hasOpen && !query.hasClose) {
    console.log("Missing closing delimiter.")
  }
  if (!query.hasOpen && query.hasClose) {
    console.log("Missing opening delimiter.")
  }
  if (query.hasOpen && query.hasClose && !order) {
    console.log("Closing delimiter found before opening.")
  }
  if (!query.hasOpen && !query.hasClose && !hasResults) {
    console.log("No results found.")
  }

  return check
}


/**
 * Creates a new query object. Runs the update function on
 * the new query and text.
 * 
 * @param {String} open - Substring starting delimiter.
 * @param {String} close - Substring ending delimiter.
 * @param {String} text - The text being searched.
 * @returns {Object} - Object returned by update().
 */
export function init (open, close, text) {
  const query = {
    open,
    close,
    position: 0,
  }

  return update(query, text)
}

/**
 * Adds the current result to the results array and trims
 * the result and closing delimiter from the beginning of
 * the text and update() is run on the query and new text.
 * The updated query is passed to check() and if more 
 * results are found, fetch() is run recursively with the
 * updated query, text, and results. When all results have
 * been found, the results array is returned.
 * 
 * @param {Object} query - A substring query object.
 * @param {String} text - The text being searched.
 * @param {Array} results - Array of current results.
 * @returns {Array} Array of all results.
 */
export function fetch (query, text, results) {

  const currentSubstring = text.slice(0, query.stop)
  const newText = text.slice(query.after, text.length)

  results.push(currentSubstring)

  const updated = update(query, newText)

  if (check(updated.query, true) === true) {
    fetch(updated.query, updated.text, results)
  }
  return results

}
