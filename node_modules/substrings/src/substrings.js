
/**
 * Substrings
 * 
 * The main module functions.
 */

import { check, init, fetch } from "./lib/utilities.js"


/**
 * Looks for substrings found between two given delimiting
 * strings and returns them in an array
 * 
 * @param  {String} open - Substring starting delimiter
 * @param  {String} close - Substring ending delimiter
 * @param  {String} text - Text to search for substrings
 * @return {Array} An array of substrings
 */
export function getAll (open, close, text) {
  const start = init(open, close, text)
  const results = []

  if (check(start.query, true)) {
    return fetch(start.query, start.text, results)
  }
}


/**
 * Looks for the first substring found between two given 
 * delimiting strings and returns it
 * 
 * @param  {String} open - Substring starting delimiter
 * @param  {String} close - Substring ending delimiter
 * @param  {String} text - Text to search for substrings
 * @return {Array} An array of substrings
 */
export function getOne (open, close, text) {
  const start = init(open, close, text)

  if (check(start.query, true)) {
    return start.text.slice(0, start.query.stop)
  }
}
