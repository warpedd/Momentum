# How to Launch a Development Instance of This Project

Launching the backend of this project requires MongoDB Atlas credentials and an
authentication key. Please contact the administrators of this project for obtaining
access.

1. Clone the repository with `git clone`.
2. To start the backend local development instance:
    1. Change directory to `backend`.
    2. Rename `env.example` to `env` and update the file with your Atlas username/password.
    3. Create a file `credentials.json` and fill it with the credential JSON information.
    4. Execute command `npm install`.
    5. Execute command `npm run dev`.
3. To start the frontend development local development instance:
    1. Change directory to the top level of the project (`cd ..` if in `backend`)
    2. Execute command `npm install`.
    3. Execute command `npm start`.

## Killing a running development server

Note: If you are changing the ports on which you're launching these development instances then
      change the commands below to your chosen port numbers.

For the backend development instance, execute command `npx kill-port 5000`.

For the frontend development instance, execute command `npx kill-port 3000`. 
