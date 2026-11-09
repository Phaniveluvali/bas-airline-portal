# Bahrain Airport Services (BAS) - Airline Portal (GitOps Managed)

Enterprise static web platform providing airline services management, passenger and flight operations, and administrative dashboards for Bahrain Airport Services (BAS).

## GitOps Architecture

- **Engine**: ArgoCD GitOps Operator
- **Target Namespace**: \`bas\`
- **Container Strategy**: Stateless, immutable \`nginx:1.27-alpine\` artifact (\`bas-static-web:v1.0.0\`)
- **Ingress URL**: \`https://tecnics-internal.online/\` (TLS secured via \`ca-vmx-tls-cert\`)
- **Routing**: Root path (\`/\`) routed via Ingress-Nginx without conflicting with microservices or ArgoCD.

## Repository Layout

\`\`\`
bas-airline-portal/
├── src/                         # Production portal source files
│   ├── index.html               # Main login page
│   ├── dashboard.html           # Operations dashboard
│   ├── admin-*.html             # Administration suites
│   ├── flights.html             # Flight management
│   ├── documents.html           # Document repository
│   ├── invoices.html            # Invoicing modules
│   ├── service-requests.html    # Ground service requests
│   ├── reports.html             # Analytics & reports
│   ├── notifications.html       # Alerts & notifications
│   ├── css/                     # Stylesheets (Bootstrap & custom)
│   ├── js/                      # Interactive client modules
│   └── images/                  # Portal graphics, logos, reference diagrams
├── nginx/
│   └── default.conf             # Production Nginx config with Gzip & routing
├── Dockerfile                   # Cloud-native Alpine container image
├── k8s/                         # Pure Declarative Kubernetes Manifests (No Helm)
│   ├── namespace.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── kustomization.yaml
└── argocd/
    └── application.yaml         # ArgoCD Application Definition
\`\`\`

## Build & Local Test

\`\`\`bash
docker build -t bas-static-web:v1.0.0 -t bas-static-web:latest .
docker run -d -p 8080:80 --name bas-test bas-static-web:v1.0.0
curl -I http://localhost:8080/healthz
\`\`\`
