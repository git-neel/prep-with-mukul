#!/bin/bash

# Firebase Conversion Validation Script
# Run this to verify all changes are in place

echo "🔍 Firebase Conversion Validation"
echo "=================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0
warnings=0

# Check Firebase configuration files
echo "📋 Checking Firebase Configuration Files..."
files=(
  "firebase.json"
  "firestore.rules"
  "firestore.indexes.json"
  ".firebaserc"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file"
  else
    echo -e "${RED}✗${NC} $file (missing)"
    ((errors++))
  fi
done
echo ""

# Check Cloud Functions
echo "☁️  Checking Cloud Functions..."
functions_files=(
  "functions/src/index.ts"
  "functions/package.json"
  "functions/tsconfig.json"
)

for file in "${functions_files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file"
  else
    echo -e "${RED}✗${NC} $file (missing)"
    ((errors++))
  fi
done
echo ""

# Check frontend files
echo "⚛️  Checking Frontend Files..."
frontend_files=(
  "client/src/lib/firebase.ts"
  "client/src/lib/queryClient.ts"
)

for file in "${frontend_files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file"
  else
    echo -e "${RED}✗${NC} $file (missing)"
    ((errors++))
  fi
done
echo ""

# Check shared files
echo "🔗 Checking Shared Files..."
if [ -f "shared/schema.ts" ]; then
  # Check if Drizzle is removed
  if grep -q "drizzle" "shared/schema.ts"; then
    echo -e "${YELLOW}⚠${NC} shared/schema.ts still contains Drizzle references"
    ((warnings++))
  else
    echo -e "${GREEN}✓${NC} shared/schema.ts (Drizzle removed)"
  fi
else
  echo -e "${RED}✗${NC} shared/schema.ts (missing)"
  ((errors++))
fi
echo ""

# Check documentation
echo "📚 Checking Documentation..."
docs=(
  "FIREBASE_SETUP.md"
  "FIREBASE_MIGRATION.md"
  "FIREBASE_CONVERSION_SUMMARY.md"
)

for file in "${docs[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file"
  else
    echo -e "${RED}✗${NC} $file (missing)"
    ((errors++))
  fi
done
echo ""

# Check environment setup
echo "🔐 Checking Environment Setup..."
if [ -f ".env.example" ]; then
  echo -e "${GREEN}✓${NC} .env.example exists"
  if ! grep -q "VITE_FIREBASE" ".env.example"; then
    echo -e "${RED}✗${NC} .env.example missing Firebase config"
    ((errors++))
  else
    echo -e "${GREEN}✓${NC} .env.example has Firebase variables"
  fi
else
  echo -e "${RED}✗${NC} .env.example (missing)"
  ((errors++))
fi

if [ -f ".env.local" ]; then
  echo -e "${YELLOW}⚠${NC} .env.local exists (make sure it has real Firebase config)"
else
  echo -e "${YELLOW}⚠${NC} .env.local not found (create from .env.example)"
  ((warnings++))
fi
echo ""

# Check dependencies
echo "📦 Checking Dependencies..."
if grep -q '"firebase"' "package.json"; then
  echo -e "${GREEN}✓${NC} Firebase dependency added to package.json"
else
  echo -e "${RED}✗${NC} Firebase dependency missing from package.json"
  ((errors++))
fi
echo ""

# Check .gitignore
echo "🚫 Checking .gitignore..."
ignore_items=(".firebase/" ".env.local" "functions/dist")
for item in "${ignore_items[@]}"; do
  if grep -q "$item" ".gitignore"; then
    echo -e "${GREEN}✓${NC} $item in .gitignore"
  else
    echo -e "${YELLOW}⚠${NC} $item not in .gitignore"
  fi
done
echo ""

# Summary
echo "=================================="
echo "📊 Validation Summary"
echo "=================================="

if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
  echo -e "${GREEN}✓ All checks passed! Ready to deploy.${NC}"
  echo ""
  echo "Next steps:"
  echo "1. Update .env.local with Firebase config"
  echo "2. Update .firebaserc with your project ID"
  echo "3. Run: npm install && cd functions && npm install && cd .."
  echo "4. Run: npm run build"
  echo "5. Run: firebase deploy"
  exit 0
elif [ $errors -eq 0 ]; then
  echo -e "${YELLOW}⚠ All required files present, but fix warnings above${NC}"
  exit 0
else
  echo -e "${RED}✗ $errors file(s) missing. Conversion may be incomplete.${NC}"
  echo ""
  echo "Common causes:"
  echo "- Files were not created (run conversion again)"
  echo "- Files were deleted"
  echo "- Check git status: git status"
  exit 1
fi
