#### Create a cluster with kops or similar

    kops create cluster \                                                                                                  ✔  11081  16:24:24
    --name aws-cluster.arminjazi.com \
    --zones us-east-1a \
    --state $KOPS_STATE_STORE \
    --master-size t3.micro --master-count 1 --node-size t3.micro --node-count 2 

currently `us-east-1a` has the cheapest instances, where `KOPS_STATE_STORE` is the aws bucket for kops state

#### Install ingress-nginx Controller

ingress-nginx is a Ingress Controller, which helps Ingress to route the traffic easily.

    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/aws/deploy.yaml

#### Install cert-manager

    kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v0.15.0/cert-manager.yaml
