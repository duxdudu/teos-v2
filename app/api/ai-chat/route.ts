import { NextRequest, NextResponse } from 'next/server';

// Photography knowledge base for context
const PHOTOGRAPHY_CONTEXT = `
You are an AI photography assistant for Teos.visual Photography, a professional photography business. You help potential clients with:

SERVICES OFFERED:
- Wedding Photography: Full day coverage, engagement sessions, bridal portraits
- Portrait Photography: Professional headshots, family portraits, creative portraits
- Event Photography: Corporate events, parties, celebrations
- Commercial Photography: Product photography, business branding
- Food Photography: Restaurant menus, culinary photography
- Landscape Photography: Nature and scenic photography

PRICING INFORMATION:
- Wedding packages start from $800 for basic coverage
- Portrait sessions from $150 for 1-hour session
- Event coverage from $200 per hour
- Commercial photography from $300 per hour
- Food photography from $250 per session
- Landscape photography from $180 per session

BOOKING PROCESS:
- Contact via email (theonyn11@gmail.com) or phone
- Discuss requirements and get custom quote
- Book date and location
- Receive professional photography service
- Get edited photos within 2-3 weeks

PHOTOGRAPHY TIPS:
- Natural lighting is best for portraits
- Plan outfits that complement the location
- Consider the time of day for outdoor shoots
- Bring props or accessories for personalization
- Relax and be yourself during sessions

COMPANY DETAILS:
- Professional equipment and editing
- Experienced photographer with artistic eye
- Flexible scheduling and locations
- High-quality prints and digital files
- Customer satisfaction guarantee

Always be helpful, professional, and encourage clients to contact the business for specific pricing and availability. Keep responses concise but informative.
`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check which AI provider to use
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const groqApiKey = process.env.GROQ_API_KEY;
    const aiProvider = process.env.AI_PROVIDER || 'groq';

    // If no API keys are available, use fallback
    if (!openaiApiKey && !groqApiKey) {
      console.log('No API keys available, using fallback responses');
      return NextResponse.json({
        response: generateFallbackResponse(message)
      });
    }

    let aiResponse;
    
    try {
      if (aiProvider === 'groq' && groqApiKey) {
        console.log('Using Groq API');
        aiResponse = await callGroqAPI(message, conversationHistory, groqApiKey);
      } else if (openaiApiKey) {
        console.log('Using OpenAI API');
        aiResponse = await callOpenAIAPI(message, conversationHistory, openaiApiKey);
      } else {
        console.log('Falling back to rule-based responses');
        aiResponse = generateFallbackResponse(message);
      }
    } catch (error) {
      console.error('AI API Error:', error);
      aiResponse = generateFallbackResponse(message);
    }

    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error('AI Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function callOpenAIAPI(message: string, conversationHistory: any[], apiKey: string) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: PHOTOGRAPHY_CONTEXT
          },
          ...conversationHistory.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response at the moment.';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

async function callGroqAPI(message: string, conversationHistory: any[], apiKey: string) {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: PHOTOGRAPHY_CONTEXT
          },
          ...conversationHistory.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response at the moment.';
  } catch (error) {
    console.error('Groq API Error:', error);
    throw error;
  }
}

function generateFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Wedding photography
  if (lowerMessage.includes('wedding') || lowerMessage.includes('marriage')) {
    return "Wedding photography is one of our specialties! We offer full-day coverage starting from $800, including engagement sessions and bridal portraits. Our packages include professional editing and high-quality prints. Would you like to discuss your specific wedding date and requirements? Contact us at helloteofly@gmail.com for a custom quote!";
  }
  
  // Portrait photography
  if (lowerMessage.includes('portrait') || lowerMessage.includes('headshot') || lowerMessage.includes('family')) {
    return "Portrait photography sessions start from $150 for a 1-hour session. We specialize in professional headshots, family portraits, and creative portraits. We can shoot at our studio or on location. Would you like to book a session? Contact us to discuss your vision and schedule!";
  }
  
  // Event photography
  if (lowerMessage.includes('event') || lowerMessage.includes('party') || lowerMessage.includes('corporate')) {
    return "Event photography coverage starts from $200 per hour. We cover corporate events, parties, celebrations, and special occasions. We provide professional equipment and quick turnaround times. Contact us to discuss your event details and get a custom quote!";
  }
  
  // Commercial photography
  if (lowerMessage.includes('commercial') || lowerMessage.includes('business') || lowerMessage.includes('product')) {
    return "Commercial photography services start from $300 per hour. We specialize in product photography, business branding, and marketing materials. Our work helps businesses showcase their products professionally. Contact us to discuss your commercial photography needs!";
  }
  
  // Food photography
  if (lowerMessage.includes('food') || lowerMessage.includes('restaurant') || lowerMessage.includes('culinary')) {
    return "Food photography sessions start from $250. We create stunning images for restaurant menus, culinary businesses, and food blogs. Our expertise includes proper lighting and styling to make food look irresistible. Contact us to discuss your food photography project!";
  }
  
  // Pricing
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
    return "Our photography services have various pricing tiers:\n• Wedding packages: from $800\n• Portrait sessions: from $150\n• Event coverage: from $200/hour\n• Commercial: from $300/hour\n• Food photography: from $250\n• Landscape: from $180\n\nContact us for custom quotes based on your specific needs!";
  }
  
  // Booking
  if (lowerMessage.includes('book') || lowerMessage.includes('schedule') || lowerMessage.includes('appointment')) {
    return "To book a photography session, please contact us at helloteofly@gmail.com or call us. We'll discuss your requirements, provide a custom quote, and schedule your preferred date and location. We're flexible with scheduling and locations!";
  }
  
  // General photography tips
  if (lowerMessage.includes('tip') || lowerMessage.includes('advice') || lowerMessage.includes('help')) {
    return "Here are some photography tips:\n• Natural lighting works best for portraits\n• Plan outfits that complement your location\n• Consider the time of day for outdoor shoots\n• Bring props or accessories for personalization\n• Relax and be yourself during sessions\n\nNeed specific advice? Contact us for personalized guidance!";
  }
  
  // Default response
  return "Thank you for your message! I'm here to help with any photography-related questions. I can assist with pricing, services, booking, and photography tips. For specific inquiries or to book a session, please contact us at helloteofly@gmail.com. How else can I help you today?";
}
