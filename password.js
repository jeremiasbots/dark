/**
 * @param {Number} Length 
 * @returns {String}
 */
module.exports = (Cantidad) => {

  if (!Cantidad) throw new TypeError("La cantidad no esta definida")
  var length = Cantidad,
  token = "21432564234hjjkjsh21y4u12hkjnaskdnqkwnkj4n1k4b124bwekbnrksa",
  value = "";
  for (var i = 0, n = token.length; i < length; ++i) {
    value += token.charAt(Math.floor(Math.random() * n));
  }
  return value;

}