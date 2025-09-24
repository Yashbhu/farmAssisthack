# Sustainable Farming Assistant

A modern, comprehensive React TypeScript application that helps farmers optimize their agricultural practices through AI-powered recommendations, yield predictions, and resource management insights.

## 🌟 Features

### Core Functionality
- **Smart Onboarding**: User-friendly setup with crop selection, region mapping, and soil type identification
- **AI-Powered Dashboard**: Real-time recommendations based on current conditions
- **Yield Prediction**: 30-day forecasting with interactive charts
- **Scenario Simulation**: Adjust rainfall, soil nutrients, and temperature to see impact
- **Resource Optimization**: Water usage tracking and savings calculations
- **Historical Data**: Track past recommendations and export capabilities
- **Shareable Scenarios**: Generate URLs to share farming scenarios

### Technical Features
- **Responsive Design**: Mobile-first approach with perfect desktop experience
- **Dark Mode**: Persistent theme switching with system preference detection
- **Real-time Updates**: Instant chart updates when scenario parameters change
- **Accessibility**: Full ARIA compliance and semantic HTML
- **Performance**: Optimized with React Query caching and lazy loading

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd sustainable-farming-assistant
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001/api
VITE_ENABLE_MOCK=true
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── charts/          # Chart components
│   └── theme-provider.tsx
├── pages/               # Main application pages
│   ├── Landing.tsx      # Welcome page
│   ├── Onboarding.tsx   # Farm setup form
│   ├── Dashboard.tsx    # Main application dashboard
│   ├── History.tsx      # Historical data view
│   └── DemoScreenshots.tsx
├── services/            # API services and data fetching
│   └── api.ts
├── store/              # State management (Zustand)
│   └── farming-store.ts
├── hooks/              # Custom React hooks
└── lib/                # Utilities and helpers
```

## 🔧 Configuration

### Mock vs Real API

The application supports both mock data (for development/demo) and real API integration:

**Mock Mode (Default):**
- Uses local data generation
- No external dependencies
- Perfect for demos and development

**Real API Mode:**
- Set `VITE_ENABLE_MOCK=false` in `.env`
- Configure `VITE_API_URL` to your backend endpoint

### Sample Mock Data

The application includes realistic sample datasets for:
- **3 Crop Types**: Wheat, Rice, Tomato
- **4 Regions**: North, South, East, West India  
- **3 Soil Types**: Clay, Sandy, Loamy
- **Dynamic Recommendations**: Based on weather and soil conditions

## 📊 API Endpoints

```typescript
// Sample API responses
interface DashboardData {
  predictedYield: Array<{
    date: string;
    yield: number;
    waterUsage: number;
    recommended: boolean;
  }>;
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    expectedSavings: {
      water: number;
      fertilizer: number;
      labor: number;
    };
    confidence: number;
    explanation: string;
  }>;
  savingsEstimate: {
    water: { saved: number; cost: number };
    fertilizer: { saved: number; cost: number };
    labor: { saved: number; cost: number };
  };
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Green tones for agriculture theme
- **Secondary**: Blue for water-related features
- **Accent**: Orange/amber for alerts and warnings
- **Neutral**: Comprehensive gray scale for text and backgrounds

### Typography
- **Headings**: Bold, clear hierarchy (2xl, xl, lg)
- **Body**: Optimized for readability (150% line height)
- **UI**: Consistent sizing for buttons and labels

### Components
- **Cards**: Rounded corners (2xl), subtle shadows
- **Buttons**: Consistent padding, hover states
- **Forms**: Clear labels, helpful tooltips
- **Charts**: Animated, responsive, themed

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

Included tests:
- Component rendering tests
- User interaction tests  
- Store state management tests
- API service tests

## 📱 Demo Screenshots

Visit `/demo-screenshots` to see three pre-built demo views:

1. **Onboarding Form**: Interactive setup process
2. **Dashboard**: Full feature overview with live data
3. **Export Modal**: Sharing and export capabilities

## 🔗 Scenario Sharing

Generate shareable URLs with pre-configured farm settings:

```typescript
// Example shareable URL
/dashboard?crop=wheat&region=north-india&soil=loamy&size=5&rainfall=10&nutrients=75&temp=2
```

## 🌱 Cost Savings Calculator

Built-in calculator converts resource savings to monetary value:

- **Water Savings**: ₹5 per liter saved
- **Fertilizer Savings**: ₹20 per kg saved  
- **Labor Savings**: ₹50 per hour saved

## 💡 Usage Tips

1. **Start with Onboarding**: Complete farm setup for accurate recommendations
2. **Experiment with Scenarios**: Use sliders to see how conditions affect recommendations
3. **Monitor Confidence Scores**: Higher scores indicate more reliable recommendations
4. **Export Data**: Generate PDFs for record keeping
5. **Share Scenarios**: Use shareable links for collaboration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Recharts](https://recharts.org/) for the interactive charts
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [TanStack Query](https://tanstack.com/query) for data fetching
- [Zustand](https://github.com/pmndrs/zustand) for state management

---

Built with ❤️ for sustainable farming practices.