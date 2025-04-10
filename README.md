# Internal Tools

A Next.js application for internal company tools and resources management.

## Features

- Modern React with Next.js 13+
- TypeScript for type safety
- Tailwind CSS for styling
- Radix UI for accessible components
- Global state management with Context API
- Type-safe API calls with custom hooks
- Dark/Light theme support

## Project Structure

```
src/
├── app/           # Next.js app directory
├── components/    # Reusable UI components
├── contexts/      # React Context providers
├── hooks/         # Custom React hooks
├── lib/          # Third-party library configurations
├── types/        # TypeScript type definitions
├── utils/        # Utility functions
└── constants/    # Application constants
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_VERSION=0.1.0
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Development

### Code Style

- We use ESLint and Prettier for code formatting
- Follow TypeScript best practices
- Use functional components with hooks
- Write meaningful component and function names
- Add JSDoc comments for complex functions

### Best Practices

1. **State Management**
   - Use local state for component-specific data
   - Use Context for global state
   - Avoid prop drilling

2. **Performance**
   - Use React.memo for expensive components
   - Implement proper dependency arrays in useEffect
   - Lazy load components when possible

3. **Error Handling**
   - Use try/catch blocks for async operations
   - Implement proper error boundaries
   - Display user-friendly error messages

4. **Testing**
   - Write unit tests for utilities
   - Write integration tests for components
   - Test error scenarios

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

This project is private and confidential.
