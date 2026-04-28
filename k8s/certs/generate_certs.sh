#!/bin/bash

CERT_DIR="./infrastructure/nginx/certs"

if [ ! -f "$CERT_DIR/transcendence.crt" ]; then
    echo "🔐 Generating new SSL certificates..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "$CERT_DIR/transcendence.key" \
        -out "$CERT_DIR/transcendence.crt" \
        -subj "/C=MA/ST=Benguerir/L=Benguerir/O=1337/CN=localhost"
else
    echo "✅ Certificates already exist."
fi
