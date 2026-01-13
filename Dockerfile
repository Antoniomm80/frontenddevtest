# Stage 1: Install dependencies
FROM node:18-alpine AS deps

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Stage 2: Run unit tests with Vitest
FROM node:18-alpine AS test-unit

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Run vitest tests
RUN yarn test:run

# Create a marker file to confirm tests passed
RUN touch /tmp/unit-tests-passed

# Stage 4: Build production
FROM node:18-alpine AS build

WORKDIR /app

# Copy test markers to ensure tests ran successfully
COPY --from=test-unit /tmp/unit-tests-passed /tmp/

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN yarn build

# Stage 5: Production runtime
FROM node:18-alpine AS production

WORKDIR /app

# Copy built assets from build stage
COPY --from=build /app/dist ./dist

# Install serve - a lightweight static file server
RUN yarn global add serve

# Expose port 3000
EXPOSE 3000

# Start the static server
CMD ["serve", "-s", "dist", "-l", "3000"]