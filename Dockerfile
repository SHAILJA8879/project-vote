# Stage 1: Build the React app
FROM node:22-slim AS builder

WORKDIR /app

# Copy package files and install all dependencies
# Using 'npm ci' for deterministic builds in production
COPY package*.json ./
RUN npm install

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Production environment
FROM node:22-slim

# Set environment to production
ENV NODE_ENV=production

WORKDIR /app

# Copy the built assets and server file from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server.cjs ./

# Install only production dependencies
RUN npm install --omit=dev

# The application listens on the port defined by the PORT environment variable
# Cloud Run sets this automatically to 8080 by default.
EXPOSE 8080

# Start the server
CMD ["node", "server.cjs"]