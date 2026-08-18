FROM golang:1.22-alpine AS builder
WORKDIR /src
COPY apps/api/go.mod apps/api/go.sum* ./
RUN go mod download 2>/dev/null || true
COPY apps/api/ ./
RUN CGO_ENABLED=0 go build -o /api ./cmd/server

FROM alpine:3.20
RUN apk add --no-cache ca-certificates git
WORKDIR /app
COPY --from=builder /api .
EXPOSE 8080
CMD ["./api"]
