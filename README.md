# TrexSem

TrexSem is a desktop application for managing and transacting with the XPL and XRS cryptocurrencies on the PlutoCoins network. trexsem has a user-friendly interface for creating wallets, checking balances, and transferring funds.

## Features

- Create new wallets
- Load existing wallets
- View wallet balances (XPL and XRS both supported!)
- Transfer funds to other addresses
- View transaction history
- Real-time balance updates

## Technologies Used

- Electron: For creating the cross-platform desktop application
- HTML/CSS: For the user interface
- JavaScript: For client-side and server-side logic
- Tailwind CSS: For styling
- Axios: For making HTTP requests to the PlutoNodes API

## Development Setup

You should probably download a packaged version of the app instead. See more on the Releases page.

1. Clone the repository:
   ```
   git clone https://github.com/trexsem-Wallet/trexsem.git
   ```

2. Navigate to the project directory:
   ```
   cd trexsem
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the application:
   ```
   npx electron .
   ```

## Security Notes

- Always keep your private key secure and never share it with others (like any other crypto)

## API Usage

TrexSem interacts with the PlutoNodes API. The application uses the following endpoints:

- Create wallet: POST `/external/create`
- Get wallet info: GET `/external/{address}`
- Get transactions: GET `/external/{address}/transactions`
- Transfer funds: POST `/external/transfer`

## Contributing

Contributions to TrexSem are welcome. Please feel free to submit a Pull Request.

## License

Do whatever you want.
