import { Tool } from "@mastra/core/tools";
// import { loadMemory, markTopicUsed, getLastUsedDate } from "../utils/memory.js"
import { z } from "zod";

const BACKEND_TOPICS = [
    "API Design Principles",
    "RESTful API Patterns",
    "GraphQL Basics",
    "gRPC and RPC APIs",
    "API Versioning Strategies",
    "Pagination Techniques",
    "Rate Limiting Strategies",
    "Request Throttling vs Queuing",
    "Authentication Basics",
    "Authorization Models (RBAC/ABAC)",
    "OAuth2 Fundamentals",
    "OpenID Connect (OIDC)",
    "JWT: Usage and Pitfalls",
    "Session Management",
    "SSO and SAML Overview",
    "Secrets Management",
    "Key Rotation Strategies",
    "TLS / HTTPS Basics",
    "Mutual TLS (mTLS)",
    "PKI and Certificate Management",
    "Input Validation & Sanitization",
    "Data Modeling for Relational DBs",
    "Normalization vs Denormalization",
    "Database Indexing (B-trees, Hashes)",
    "Query Optimization Techniques",
    "Transactions & ACID Principles",
    "Isolation Levels and Anomalies",
    "Distributed Transactions (2PC, XA)",
    "Compensating Transactions & Sagas",
    "NoSQL Data Models (Key-Value, Document)",
    "Eventual Consistency",
    "Consistency Models (CP/CA/…)",
    "Sharding and Partitioning",
    "Replication & High Availability",
    "Leader Election & Consensus (Raft/Paxos)",
    "Connection Pooling",
    "ORMs and Query Builders",
    "Database Migrations Best Practices",
    "Caching Fundamentals",
    "Cache Invalidation Strategies",
    "CDN & Edge Caching",
    "In-memory Caches (Redis, Memcached)",
    "Cache Warming and TTL Tuning",
    "Message Queues vs Streaming",
    "Message Brokers: RabbitMQ, ActiveMQ",
    "Kafka & Event Streaming Basics",
    "Exactly-once vs At-least-once Semantics",
    "Idempotency in Distributed Systems",
    "Event Sourcing Patterns",
    "CQRS (Command Query Responsibility Segregation)",
    "Backpressure and Flow Control",
    "WebSockets for Real-time Apps",
    "Server-Sent Events (SSE)",
    "SSE vs WebSockets vs Long Polling",
    "Microservices Fundamentals",
    "Monoliths vs Microservices",
    "Service Boundaries & Decomposition",
    "API Gateways & Edge Proxies",
    "Service Discovery Patterns",
    "Circuit Breaker Pattern",
    "Bulkhead Isolation",
    "Distributed Tracing (OpenTelemetry)",
    "Structured Logging & Correlation IDs",
    "Monitoring & Metrics (Prometheus)",
    "SLOs, SLIs, and Error Budgets",
    "Health Checks & Readiness Probes",
    "Logging Best Practices",
    "Observability vs Monitoring",
    "Chaos Engineering Basics",
    "Rate-based Autoscaling",
    "Horizontal vs Vertical Scaling",
    "Load Balancing Algorithms",
    "Sticky Sessions vs Stateless",
    "Blue-Green & Canary Deployments",
    "Feature Flags & Dark Launches",
    "CI/CD Pipelines (Design & Security)",
    "Containerization with Docker",
    "Kubernetes Basics",
    "Pod Design & Sidecar Patterns",
    "Helm & Release Management",
    "Service Mesh (Istio/Linkerd)",
    "Infrastructure as Code (Terraform)",
    "Secrets in CI/CD",
    "Immutable Infrastructure",
    "Serverless Architectures",
    "Function-as-a-Service Patterns",
    "Cold Starts & Optimization",
    "Observability for Serverless",
    "Testing Strategies for Backends",
    "Unit vs Integration vs End-to-End Tests",
    "Contract Testing (Pact)",
    "Load & Performance Testing",
    "Profiling and Benchmarking",
    "Memory Leaks & GC Tuning",
    "Security Best Practices (OWASP)",
    "Input Sanitization & SQL Injection",
    "Cross-Site Request Forgery (CSRF)",
    "CORS & API Security",
    "Rate Limit Attacks & Mitigation",
    "Data Backup & Restore Strategies",
    "Disaster Recovery Planning",
    "Data Retention & Compliance (GDPR/PII)",
    "Full-Text Search Basics (Elasticsearch)",
    "Time-Series Databases",
    "Graph Databases & Use Cases",
    "Streaming ETL and CDC (Debezium)",
    "Id Generation Strategies (UUID, Snowflake)"
];

// const MIN_TOPIC_COOLDOWN_DAYS = 14;

// function daysAgo(dateString: string) {
//     const then = new Date(dateString).getTime();
//     const now = Date.now();
//     const diffDays = (now - then) / (1000 * 60 * 60 * 24);
//     return diffDays;
// }

export const topicPickerTool = new Tool({
    id: "topicPickerTool",
    description: "Selects the next backend topic for the daily lesson.",
    // inputSchema: z.object({
    //     userId: z.string(),
    // }),
    outputSchema: z.object({
        topic: z.string(),
        // reason: z.string(),
    }),
    async execute({ context }) {
        // const { userId = "default" } = context;
        // const memory = await loadMemory(userId);

        const availableTopics = [];

        // for (const topic of BACKEND_TOPICS) {
        //     const lastUsed = memory.topics[topic];
        //     if (!lastUsed || daysAgo(lastUsed) >= MIN_TOPIC_COOLDOWN_DAYS) {
        //         availableTopics.push(topic);
        //     };
        // };

        // const pool = availableTopics.length ? availableTopics : BACKEND_TOPICS;
        const pool = BACKEND_TOPICS;

        const selected = pool[Math.floor(Math.random() * pool.length)];

        // await markTopicUsed(userId, selected);

        return {
            topic: selected,
            // reason:
                // availableTopics.length < BACKEND_TOPICS.length
                    // ? "Chosen to revisit a core backend concept after a cool-down period."
                    // : "Chosen as a fresh topic to explore today."
        };
    }
});
