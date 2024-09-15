# Estimation App


## Installation

Instructions for setting up and installing the project locally.

1. **Clone the repository:**

    ```bash
    git clone https://github.com/VismayPanchal/estimation-app.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd react-estimation-app
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Run the application:**

    ```bash
    npm run dev
    ```

## Usage

### Start JSON Server

1. **Navigate to json-server directory**
    ```bash
    cd json-server
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run json server on port 8000**
    ```bash
    npx json-server db.json --port 8000
    ```


## Folder Structure

Explain the layout of your project's files and directories. Here's an example:

```bash
├── public/              # Public assets (HTML, images, etc.)
│   ├── index.html       # Main HTML file
│   └── ...
├── src/                 # Source code files
│   ├── components/      # Reusable components
│   ├── Reducers/        # contains reducers for the app
│   ├── Actions/         # rtk actions
│   ├── App.js           # Root component
│   ├── index.js         # Entry point for React
    ├── locale/              # Translation files for internationalization
    │   ├── en.json          # English translations
    │   ├── jp.json          # Japanese translations
├── README.md            # This README file
├── package.json         # Node package manager configuration
└── ...
```
