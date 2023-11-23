# Step 1: Use an official Node.js runtime as a parent image
FROM node:latest

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Bundle app source inside Docker image
COPY . .

# Step 6: Build your app for production
RUN npm run build

# Step 7: Install a simple server to serve static content
RUN npm install -g serve

# Step 8: Set the command to start the server
CMD ["serve", "-s", "build"]
