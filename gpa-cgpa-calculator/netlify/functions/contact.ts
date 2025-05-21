import type { Handler } from "@netlify/functions"

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    }
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body || "{}")
    const { name, email, message } = data

    // Validate the data
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Name, email, and message are required" }),
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid email address" }),
      }
    }

    // In a real application, you would send an email here
    // For example, using a service like SendGrid or Mailgun
    // For now, we'll just simulate a successful response

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Thank you for your message. We'll get back to you soon!",
      }),
    }
  } catch (error) {
    console.error("Error processing contact form:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred while processing your request" }),
    }
  }
}
