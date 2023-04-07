export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'API endpoint for getting reviews' })
  } if (req.method === 'POST') {
    res.status(200).json({ message: 'Posting a new review' })
  }
}