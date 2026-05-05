export default function handler(req, res) {
  // Check if the method is POST
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Log to Vercel console for debugging
    console.log("Form Data Received:", { name, email, message });

    // Respond with a 200 Success code
    return res.status(200).json({
      success: true,
      message: 'Connection established with Vercel backend.'
    });
  } else {
    // If someone tries to visit the link directly (GET), return 405
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}