# AI Chatbox for Teoflys Photography Website

## Overview

This AI chatbox provides an intelligent, interactive chat interface to help potential clients with photography-related questions. It's designed to enhance user experience by providing instant assistance with services, pricing, booking, and photography tips.

## Features

### 🤖 AI-Powered Responses
- **OpenAI Integration**: Uses GPT-3.5-turbo for intelligent, contextual responses
- **Groq Integration**: Alternative AI provider using Llama3-8b model
- **Fallback System**: Rule-based responses when AI services are unavailable
- **Conversation Memory**: Maintains context across chat sessions

### 💬 User Experience
- **Floating Chat Button**: Always accessible, non-intrusive design
- **Real-time Typing Indicators**: Shows when AI is processing responses
- **Quick Action Buttons**: Pre-defined common questions for easy access
- **Message Reactions**: Interactive emoji reactions on AI responses
- **Mobile Responsive**: Optimized for all device sizes

### 🎨 Visual Design
- **Modern UI**: Clean, professional interface matching the website theme
- **Dark/Light Mode Support**: Automatically adapts to user's theme preference
- **Smooth Animations**: Elegant transitions and hover effects
- **Professional Branding**: Consistent with Teoflys Photography identity

### 📱 Contact Integration
- **Direct Contact Buttons**: Quick access to phone and email
- **Seamless Handoff**: Easy transition from AI chat to human contact
- **Contact Information**: Always visible contact details

## Technical Implementation

### Architecture
```
Frontend (React/Next.js)
├── AIChatbox Component
├── Message Interface
├── State Management
└── API Integration

Backend (Next.js API Routes)
├── /api/ai-chat
├── OpenAI Integration
├── Groq Integration
└── Fallback Response System
```

### Components Structure
- **AIChatbox.tsx**: Main chat interface component
- **route.ts**: API endpoint for AI chat processing
- **globals.css**: Custom styles and animations

### API Endpoints
- **POST /api/ai-chat**: Processes user messages and returns AI responses

## Setup Instructions

### 1. Environment Variables
Create or update your `.env.local` file:

```bash
# OpenAI API Key (for GPT-3.5-turbo)
OPENAI_API_KEY=your_openai_api_key_here

# AI Provider (openai or groq)
AI_PROVIDER=openai
# or
AI_PROVIDER=groq
```

### 2. API Key Setup

#### OpenAI
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account and get your API key
3. Add to `.env.local`: `OPENAI_API_KEY=sk-...`

#### Groq (Alternative)
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up and get your API key
3. Add to `.env.local`: `AI_PROVIDER=groq`

### 3. Installation
The chatbox is automatically integrated into the main layout and will appear on all pages.

## Usage

### For Users
1. **Access**: Click the floating chat button (bottom-right corner)
2. **Ask Questions**: Type your photography-related questions
3. **Quick Actions**: Use pre-defined buttons for common questions
4. **Get Help**: Receive instant, intelligent responses
5. **Contact**: Use direct contact buttons for human assistance

### For Developers
1. **Customization**: Modify `PHOTOGRAPHY_CONTEXT` in `route.ts`
2. **Styling**: Update CSS classes in `AIChatbox.tsx`
3. **Features**: Add new quick actions or message types
4. **Integration**: Extend with additional AI providers

## Knowledge Base

The AI is trained on comprehensive photography information:

### Services
- Wedding Photography (from $800)
- Portrait Sessions (from $150)
- Event Coverage (from $200/hour)
- Commercial Photography (from $300/hour)
- Food Photography (from $250)
- Landscape Photography (from $180)

### Information Provided
- Service details and pricing
- Booking process and availability
- Photography tips and advice
- Company information and contact details
- Portfolio and style guidance

## Customization

### Adding New Services
Update the `PHOTOGRAPHY_CONTEXT` in `app/api/ai-chat/route.ts`:

```typescript
const PHOTOGRAPHY_CONTEXT = `
// Add new services here
- New Service: Description and pricing
`;
```

### Modifying Quick Actions
Update the `quickActions` array in `components/AIChatbox.tsx`:

```typescript
const quickActions = [
  { text: "New Service", icon: "🎯" },
  // ... existing actions
];
```

### Styling Changes
Modify CSS classes in `components/AIChatbox.tsx` or add custom styles to `globals.css`.

## Troubleshooting

### Common Issues

#### AI Not Responding
1. Check API key configuration
2. Verify environment variables
3. Check browser console for errors
4. Ensure API endpoint is accessible

#### Styling Issues
1. Verify Tailwind CSS is properly configured
2. Check custom CSS in `globals.css`
3. Ensure theme toggle is working

#### Performance Issues
1. Check API response times
2. Monitor token usage
3. Optimize conversation history length

### Debug Mode
Enable console logging by checking browser developer tools for detailed error information.

## Security Considerations

- API keys are stored server-side only
- User messages are processed securely
- No sensitive data is stored in chat
- Rate limiting can be implemented if needed

## Performance Optimization

- Conversation history is limited to current session
- API calls are optimized with appropriate timeouts
- Fallback responses ensure reliability
- Minimal re-renders with efficient state management

## Future Enhancements

### Planned Features
- **File Upload**: Allow users to share photos for feedback
- **Appointment Booking**: Direct calendar integration
- **Multi-language Support**: International client support
- **Analytics Dashboard**: Track common questions and usage

### Integration Possibilities
- **CRM Integration**: Lead capture and follow-up
- **Payment Processing**: Direct quote and payment
- **Social Media**: Share photography tips and portfolio
- **Email Marketing**: Newsletter signup and updates

## Support

For technical support or customization requests:
- **Email**: helloteofly@gmail.com
- **Developer**: Dux (duxforreally@gmail.com)

## License

This AI chatbox is developed for Teoflys Photography and is proprietary software.

---

**Note**: This chatbox enhances user experience by providing instant, intelligent assistance while maintaining the professional image of Teoflys Photography. It serves as a bridge between automated help and human contact, ensuring clients always get the support they need.
