FROM node:20.11.0

# Expose the application port
EXPOSE 3000

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy the rest of the application files
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV APPLICATIONINSIGHTS_CONNECTION_STRING="InstrumentationKey=1282100c-2c6f-467e-9c2d-4c68fdf940ac;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=abea9b39-4ace-43c6-9803-a9a68462d9c2"

# Define the command to run your application
CMD ["npm", "run", "start"]