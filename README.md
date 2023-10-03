# My React Native App

A simple React Native application for user registration, login, and accessing a home page. It can be used as a starter project where user authentication is needed.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login.
- Access to a home page.
- Securely stores access/auth tokens on user devices using [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/) for enhanced security. Expo SecureStore offers benefits over Expo AsyncStorage, ensuring data is protected more effectively.

- Thorough validation of all input fields in the Sign-Up and Login forms, enhancing the app's security and user experience.

## Installation

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine.
- Expo CLI installed globally:

   ```bash
   npm install -g expo-cli
   ```

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/my-react-native-app.git
   ```

2. Navigate to the project folder:

   ```bash
   cd my-react-native-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the development server:

   ```bash
   npm start
   ```

2. Use the Expo Go app to scan the QR code provided by Expo DevTools and run the app on your device.

## Contributing

Contributions are always welcome! If you have any suggestions or improvements, please:

1. Fork the project.
2. Create a new branch for your feature or fix.
3. Make your changes.
4. Test your changes thoroughly.
5. Commit your changes and create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
