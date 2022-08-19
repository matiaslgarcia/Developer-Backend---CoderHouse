export default function cantRandom(req, res) {
  return req.params.cantidad || 100000000
}
