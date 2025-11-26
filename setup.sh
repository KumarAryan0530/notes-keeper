#!/bin/bash

# Notes Keeper - Complete Setup Script
# This script sets up both backend and frontend

echo "🚀 Notes Keeper - Full Stack Setup"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install it first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v)${NC}"
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL is not installed. Please install it first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ PostgreSQL installed${NC}"
echo ""

# Backend Setup
echo -e "${YELLOW}Setting up Backend...${NC}"
cd backend

# Copy .env file
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file${NC}"
    echo "  Please edit backend/.env with your PostgreSQL credentials"
else
    echo -e "${YELLOW}⚠ .env file already exists${NC}"
fi

# Install dependencies
echo "Installing backend dependencies..."
npm install
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

cd ..

# Frontend Setup
echo ""
echo -e "${YELLOW}Setting up Frontend...${NC}"
cd frontend

# Install dependencies
echo "Installing frontend dependencies..."
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

cd ..

# Summary
echo ""
echo "===================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "===================================="
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Configure Database:"
echo "   - Start PostgreSQL"
echo "   - Run: psql -U postgres -f DATABASE_SETUP.sql"
echo "   - Or manually run commands in DATABASE_SETUP.sql"
echo ""
echo "2. Edit Backend Configuration:"
echo "   - Edit backend/.env with your database credentials"
echo ""
echo "3. Start Backend Server:"
echo "   - cd backend && npm run dev"
echo "   - (or npm start for production)"
echo ""
echo "4. Start Frontend Server (in new terminal):"
echo "   - cd frontend && npm start"
echo ""
echo "5. Open in Browser:"
echo "   - http://localhost:4200"
echo ""
echo -e "${YELLOW}API Documentation: See API_DOCUMENTATION.md${NC}"
echo -e "${YELLOW}Full Documentation: See README.md${NC}"
