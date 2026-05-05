export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Logic to send email would go here using your chosen API key.
  // For now, we'll simulate a success.
  console.log(`New message from ${name}: ${message}`);

  return res.status(200).json({ message: 'Success' });
}