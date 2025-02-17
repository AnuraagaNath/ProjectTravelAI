
# ProjectTravelAI

ProjectTravelAI is a React-based web application that integrates the TomTom Maps API to provide users with interactive map functionalities, including location search and route calculation.

## Features

- **Interactive Map**: Displays a dynamic map centered on the user's current location.
- **Search Functionality**: Allows users to search for specific locations using the TomTom SearchBox plugin.
- **Route Calculation**: Enables users to calculate and visualize routes between an origin and a destination.

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or above)
- npm (comes with Node.js)

## Getting Started

Follow these steps to set up and run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AnuraagaNath/ProjectTravelAI.git
   cd ProjectTravelAI
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Obtain a TomTom API Key**:
   - Sign up or log in to the [TomTom Developer Portal](https://developer.tomtom.com/).
   - Navigate to the [Dashboard](https://developer.tomtom.com/user/me/apps) and create a new application to get your API key.

4. **Configure the API Key**:
   - Create a `.env` file in the root directory of the project.
   - Add the following line to the `.env` file:
     ```
     REACT_APP_TOMTOM_API_KEY=your_tomtom_api_key_here
     ```
   - Replace `your_tomtom_api_key_here` with the API key you obtained.

5. **Start the Development Server**:
   ```bash
   npm start
   ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

The project's structure is as follows:

```
ProjectTravelAI/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── MapComponent.jsx
│   ├── hooks/
│   │   └── useGeolocation.js
│   ├── App.css
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── package.json
└── README.md
```

- `src/components/MapComponent.jsx`: Contains the main map component that integrates with the TomTom API.
- `src/hooks/useGeolocation.js`: Custom hook to retrieve and manage the user's geolocation.
- `App.js`: Root component that renders the `MapComponent`.
- `App.css`: Styling for the application.
- `.env`: Environment file storing sensitive configurations like the API key.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.
- `npm run eject`: Ejects the app configuration. **Note**: This is a one-way operation.

## Dependencies

Key dependencies used in this project include:

- `react`: JavaScript library for building user interfaces.
- `@tomtom-international/web-sdk-maps`: TomTom Maps SDK for embedding maps.
- `@tomtom-international/web-sdk-services`: TomTom Services SDK for accessing services like routing and search.

For the complete list of dependencies, refer to the `package.json` file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TomTom Developer Portal](https://developer.tomtom.com/) for providing the Maps API and documentation.
- [Create React App](https://create-react-app.dev/) for bootstrapping the React application.

```

Note: Ensure that the `.env` file is included in your `.gitignore` to prevent exposing sensitive information. 
