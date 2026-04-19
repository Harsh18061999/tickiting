# Ticketing Microservices Project

## Local Development Workflow

This project uses `skaffold` and `minikube` for local development.

### Accessing MongoDB Locally

If you have a local MongoDB instance running on port `27017`, you should map the cluster's MongoDB instance to a different port (e.g., `27018`) to avoid conflicts.

Use the following command to forward the `auth-mongo-srv` to your local machine:

```bash
kubectl port-forward service/auth-mongo-srv 27018:27017
```

You can then connect to the cluster's database via `mongodb://localhost:27018`.

### Ingress Access

Ensure your `ingress-nginx` controller is running and forwarded if necessary:

```bash
kubectl port-forward -n ingress-nginx service/ingress-nginx-controller 8080:80

if you try with https then 
kubectl port-forward -n ingress-nginx service/ingress-nginx-controller 8443:443
kubectl port-forward pod/nats-depl-ff4d8d856-vzgzs 4222:4222
and run on hhtps port services to store cookies in your header.
```
