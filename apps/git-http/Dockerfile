FROM golang:1.22-alpine AS builder
WORKDIR /src
COPY apps/git-http/go.mod apps/git-http/go.sum* ./
RUN go mod download 2>/dev/null || true
COPY apps/git-http/ ./
RUN CGO_ENABLED=0 go build -o /git-http ./cmd/server

FROM alpine:3.20
RUN apk add --no-cache ca-certificates git
WORKDIR /app
COPY --from=builder /git-http .
EXPOSE 8080
CMD ["./git-http"]
