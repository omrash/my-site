#!/bin/bash
set -e

echo "🔍 Verifying Phase 1: Core Integration..."

# Check files exist
echo "  Checking components..."
[ -f "components/ParticleConstellation.jsx" ] || { echo "  ❌ ParticleConstellation.jsx missing"; exit 1; }
echo "  ✅ ParticleConstellation.jsx exists"

[ -f "components/Navigation.jsx" ] || { echo "  ❌ Navigation.jsx missing"; exit 1; }
echo "  ✅ Navigation.jsx exists"

# Check if constellation is integrated
echo "  Checking layout integration..."
grep -q "ParticleConstellation" app/layout.js || { echo "  ❌ ParticleConstellation not in layout"; exit 1; }
echo "  ✅ ParticleConstellation integrated"

# Check glassmorphism
echo "  Checking glassmorphism styles..."
grep -q "backdrop-filter" app/globals.css || { echo "  ❌ Glassmorphism not in CSS"; exit 1; }
echo "  ✅ Glassmorphism styles present"

# Build check
echo "  Running build..."
npm run build > /dev/null 2>&1 || { echo "  ❌ Build failed"; exit 1; }
echo "  ✅ Build successful"

# Lint check
echo "  Running lint..."
npm run lint > /dev/null 2>&1 || { echo "  ❌ Lint failed"; exit 1; }
echo "  ✅ Lint passed"

echo ""
echo "✅ Phase 1 verification PASSED"
echo ""
