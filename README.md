# Ft_Transcendence 🚀

Welcome to the **Ft_Transcendence** repository! This project is a robust, microservices-based web platform designed for modularity, scalability, and ease of development. It utilizes **NestJS** for all backend services and the frontend, orchestrated via **Docker Compose**, with an **Nginx** API Gateway handling traffic.

---

## 🏗 System Architecture

The project follows a Microservices Architecture:

*   **Gateway (`infrastructure/nginx`)**: The single entry point (Reverse Proxy). It handles SSL termination and routes requests to the appropriate service based on the URL path.
*   **Frontend (`frontend`)**: A NestJS service serving the static dashboard and UI assets. Accessible via the root path `/`.
*   **Microservices**:
    *   **Auth Service (`services/auth`)**: Handles authentication logic. Route: `/api/auth`
    *   **Chat Service (`services/chat`)**: Manages real-time messaging. Route: `/api/chat`
    *   **User Service (`services/user_management`)**: Manages user profiles. Route: `/api/user`

---

## 🚀 Getting Started

### Prerequisites

*   Docker & Docker Compose
*   Make (optional, but recommended)

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone <repo_url>
    cd ft_transcendence
    ```

2.  **Environment Setup:**
    The project relies on environment variables. Copy the example file to create your own configuration:
    ```bash
    cp .env.example .env
    ```
    *Edit `.env` if you need to change ports or secrets.*

3.  **Start the Application:**
    We provide a `Makefile` to simplify commands.
    ```bash
    make all
    ```
    *This command generates self-signed SSL certificates and builds/starts all containers in detached mode.*

4.  **Access the Dashboard:**
    Open your browser and navigate to:
    👉 **https://localhost**

    *Note: You will see a security warning because we are using self-signed certificates. You can safely proceed/ignore this for local development.*

---

## 🛠 Development Guide

### 📂 Directory Structure

```text
ft_transcendence/
├── frontend/             # NestJS Frontend Service (Dashboard)
├── infrastructure/       # Nginx, Logging, Monitoring config
├── services/             # Backend Microservices
│   ├── auth/             # Authentication Service
│   ├── chat/             # Chat Service
│   └── user_management/  # User Profile Service
├── shared/               # Shared code/types (optional)
├── .env                  # Your local environment variables
├── docker-compose.yml    # Main orchestration file
└── Makefile              # Shortcut commands
```

### 🔧 Working with Environment Variables

The `.env` file is the **single source of truth** for configuration.
*   **DO NOT** hardcode secrets or ports in your code.
*   **DO** use `process.env.VARIABLE_NAME` in your NestJS services.

**Adding a new variable:**
1.  Add it to `.env`.
2.  Add it to `.env.example` (with a placeholder value) so your teammates know it exists.
3.  The variable will be automatically injected into containers listed in `docker-compose.yml` under `env_file`.

### ➕ How to Add a New Microservice

Want to add a `Game` service? Follow these steps:

1.  **Create the Service Directory**:
    Copy an existing service structure (e.g., `services/chat`) to `services/game`.
    ```bash
    cp -r services/chat services/game
    ```

2.  **Update Service Configuration**:
    *   Update `package.json` name.
    *   Update `src/main.ts`:
        *   Change the **Global Prefix**: `app.setGlobalPrefix('api/game');`
        *   Update the port variable (e.g., `GAME_SERVICE_PORT`).

3.  **Update Docker Compose**:
    Add the new service to `docker-compose.yml`:
    ```yaml
    game:
      container_name: game
      build: services/game
      image: game
      ports:
        - "${GAME_SERVICE_PORT}:${GAME_SERVICE_PORT}"
      env_file:
        - .env
      healthcheck:
        test: ["CMD", "curl", "-f", "http://game:3004/api/game"]
    ```

4.  **Update Nginx Gateway**:
    Edit `infrastructure/nginx/conf.d/default.conf` to route traffic:
    ```nginx
    location /api/game {
        proxy_pass http://game:3004/api/game;
    }
    ```

5.  **Register Port**:
    Add `GAME_SERVICE_PORT=3004` to your `.env` and `.env.example`.

6.  **Build & Run**:
    ```bash
    docker-compose up -d --build game nginx
    ```

---

## 🛑 Clean Up

To stop the containers and remove volumes (database data, etc.):

```bash
make fclean
```
*Note: This also removes generated SSL certificates. They will be regenerated on the next `make all`.*

---

Made with ❤️ by the **Ft_Transcendence Team**.
