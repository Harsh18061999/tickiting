# Project Setup Guide

Follow these steps to set up and run the Ticketing Microservices project locally.

## Prerequisite Tools

Ensure you have the following installed on your local machine:
- **Node.js** (LTS version)
- **Docker**
- **Minikube** (for local Kubernetes cluster)
- **Skaffold** (for automated development workflow)
- **kubectl** (Kubernetes command-line tool)

## Local Environment Preparation

### 1. Start Minikube
Use the Docker driver for better performance:
```bash
minikube start --driver=docker
```

### 2. Enable Ingress
Enable the NGINX Ingress controller in your cluster:
```bash
minikube addons enable ingress
```

### 3. Update Hosts File
Map `ticketing.dev` to your Minikube IP.
1. Get Minikube IP: `minikube ip`
2. Add the IP to your `/etc/hosts` file:
   ```bash
   [MINIKUBE_IP] ticketing.dev
   ```

### 4. Create Kubernetes Secrets
The application requires a `jwt-secret` for authentication:
```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
```
*Note: Replace `asdf` with a secure key in production environments.*

## Running the Project

Navigate to the project root and start the Skaffold development loop:
```bash
cd ticketing
skaffold dev
```
Skaffold will build the Docker images, apply the Kubernetes manifests, and start a file-sync loop for rapid development.

## Accessing the Application

Once Skaffold reports that the services are online, you can access the application at:
- **Frontend**: https://ticketing.dev
- **Auth Service**: https://ticketing.dev/api/users/signup
- **Tickets Service**: https://ticketing.dev/api/tickets

## Development Utilities

### NATS Port Forwarding
If you need to access the NATS Streaming server locally (e.g., for `nats-test`):
```bash
kubectl port-forward service/nats-srv 4222:4222
```

### Common Library Updates
If you make changes to the `@microservicescommon/common` library:
1. Navigate to the `common` directory.
2. Build and publish (or link) the changes:
   ```bash
   npm run build
   # Use npm link or your publication workflow
   ```
