#!/bin/bash
set -e

echo "🔍 Verifying Phase 2: Portfolio Content..."

# Check components exist
echo "  Checking components..."
[ -f "components/Experience.jsx" ] || { echo "  ❌ Experience.jsx missing"; exit 1; }
echo "  ✅ Experience.jsx exists"

[ -f "components/ProjectCard.jsx" ] || { echo "  ❌ ProjectCard.jsx missing"; exit 1; }
echo "  ✅ ProjectCard.jsx exists"

[ -f "components/Skills.jsx" ] || { echo "  ❌ Skills.jsx missing"; exit 1; }
echo "  ✅ Skills.jsx exists"

[ -f "components/ContactForm.jsx" ] || { echo "  ❌ ContactForm.jsx missing"; exit 1; }
echo "  ✅ ContactForm.jsx exists"

[ -f "components/BackToTop.jsx" ] || { echo "  ❌ BackToTop.jsx missing"; exit 1; }
echo "  ✅ BackToTop.jsx exists"

# Build check
echo "  Running build..."
npm run build > /dev/null 2>&1 || { echo "  ❌ Build failed"; exit 1; }
echo "  ✅ Build successful"

echo ""
echo "✅ Phase 2 verification PASSED"
echo ""
