# --- STAGE 1: Build ---
FROM node:20-slim AS builder
WORKDIR /app
# Copy package config
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy source code
COPY . .
# Build the application
RUN npm run build

# --- STAGE 2: Development/Preview ---
# --- STAGE 2: Production ---
FROM node:20-slim
WORKDIR /app
RUN apt-get update && apt-get install -y curl
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Expose the port
EXPOSE 3003
# Start the NestJS server
CMD ["node", "dist/main"]