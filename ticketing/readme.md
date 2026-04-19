<!-- kubectl port-forward service/auth-mongo-srv 27018:27017 -->
kubectl port-forward -n ingress-nginx service/ingress-nginx-controller 8443:443
kubectl port-forward service/nats-srv 4222:4222
kubectl port-forward service/tickets-mongo-srv 27017:27017
kubectl port-forward service/tickets-srv 3000:3000
