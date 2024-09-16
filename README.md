# Image Carousel Component

This project implements an Image Carousel component using React and Next.js that displays a series of slides, some of which will be locked based on user XP points. The carousel includes a nav-bar for navigation.

## Running the project locally

To run this project on your local machine, follow these steps:

1. Clone the repository:
   ```
   git clone [repository-url]
   cd [project-directory]
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Approach and Key Decisions

- Used Embla Carousel for the main carousel functionality due to its performance and flexibility.
- Implemented state management using Zustand for its simplicity and ease of use.

- **Efficient Data Fetching**: SWR (stale-while-revalidate) is used for data fetching, providing automatic caching, revalidation, and optimized performance.

- **State Management**: Zustand is employed for managing local UI state, offering a simple and lightweight solution.

- The combination of Zustand for UI state and SWR for server state management provides a clean separation of concerns and efficient data handling

- **Performance Optimization**: Implemented lazy loading for images

- Used Tailwind CSS for styling to ensure responsiveness and consistency.
- Implemented error handling for API calls to improve user experience.
- Implemented a dark mode toggle for the entire application using next-themes.

## Challenges and Solutions

- Implementing the mouse wheel scrolling required using the embla-carousel-wheel-gestures plugin to handle wheel events.
- The shake animation for locked slides was implemented using CSS animations and Tailwind CSS.

## Further Improvements

- Improve accessibility by adding more ARIA attributes and ensuring full keyboard navigation.

- Add more unit and integration tests for better code coverage.

## Deployment

The project is deployed at https://chainscore-carousel.vercel.app/.