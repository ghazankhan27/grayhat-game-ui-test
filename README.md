# This is the front-end of the grayhat-test chat application.

## You can get started after simply follwing the below instructions:

### Prerequisites:
* Node 18
* Backend needs to be running.

### Backend Intructions:
* Clone this repository https://github.com/ghazankhan27/grayhat-backend
* Follow further instructions provided in the Readme file of mentioned repository.

### Instructions:
1. Clone the repository to your local machine.
2. Run 
  `npm install`
3. Create a `.env` file with the content: 
  `VITE_SOCKET_HOST="localhost:3000"`
4. This is the default host when running the backend server locally. If you change the port, please update the `.env` file.
5. Run 
  `npm run dev`
to start the development server.

To test the application in it's production form, please visit https://chat-app-zeta-silk.vercel.app/

It's a fully functioning chatroom where you can connect multiple users and have a chat.