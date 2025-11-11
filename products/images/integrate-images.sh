#!/bin/bash
# Feelings Unplugged - Image Integration Script
# Run this from: /Users/tarttphd/Documents/GitHub/feelings-unplugged/

echo "🎨 Feelings Unplugged Image Integration"
echo "========================================"
echo ""

# Define paths
REPO_ROOT="/Users/tarttphd/Documents/GitHub/feelings-unplugged"
PRODUCTS_DIR="$REPO_ROOT/products"
IMAGES_DIR="$PRODUCTS_DIR/images"

# Navigate to repo
cd "$REPO_ROOT" || exit 1

echo "📍 Current directory: $(pwd)"
echo ""

# Verify image directories exist
echo "✓ Verifying image directories..."
if [ ! -d "$IMAGES_DIR/teen-journal" ]; then
    mkdir -p "$IMAGES_DIR/teen-journal"
    echo "  Created: teen-journal/"
fi

if [ ! -d "$IMAGES_DIR/parent-guide" ]; then
    mkdir -p "$IMAGES_DIR/parent-guide"
    echo "  Created: parent-guide/"
fi

if [ ! -d "$IMAGES_DIR/educator-toolkit" ]; then
    mkdir -p "$IMAGES_DIR/educator-toolkit"
    echo "  Created: educator-toolkit/"
fi

echo ""
echo "📋 Image Placeholder Inventory:"
echo "================================"
echo ""
echo "TEEN JOURNAL (3 images needed):"
echo "  1. teen-journal-cover.[png/jpg]"
echo "  2. teen-journal-midday-spark.[png/jpg]"
echo "  3. teen-journal-archetypes.[png/jpg]"
echo ""
echo "PARENT GUIDE (2 images needed):"
echo "  4. parent-guide-cover.[png/jpg]"
echo "  5. parent-guide-identity-support.[png/jpg]"
echo ""
echo "EDUCATOR TOOLKIT (2 images needed):"
echo "  6. educator-toolkit-cover.[png/jpg]"
echo "  7. educator-toolkit-check-in.[png/jpg]"
echo ""
echo "=========================================="
echo ""

# Check for existing images
echo "🔍 Checking for existing images..."
echo ""

teen_count=$(find "$IMAGES_DIR/teen-journal" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) ! -name ".gitkeep" | wc -l)
parent_count=$(find "$IMAGES_DIR/parent-guide" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) ! -name ".gitkeep" | wc -l)
educator_count=$(find "$IMAGES_DIR/educator-toolkit" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) ! -name ".gitkeep" | wc -l)

echo "  Teen Journal: $teen_count of 3 images"
echo "  Parent Guide: $parent_count of 2 images"
echo "  Educator Toolkit: $educator_count of 2 images"
echo ""

# List what's there
if [ "$teen_count" -gt 0 ]; then
    echo "  📁 Teen Journal images found:"
    find "$IMAGES_DIR/teen-journal" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) ! -name ".gitkeep" -exec basename {} \; | sed 's/^/     - /'
fi

if [ "$parent_count" -gt 0 ]; then
    echo "  📁 Parent Guide images found:"
    find "$IMAGES_DIR/parent-guide" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) ! -name ".gitkeep" -exec basename {} \; | sed 's/^/     - /'
fi

if [ "$educator_count" -gt 0 ]; then
    echo "  📁 Educator Toolkit images found:"
    find "$IMAGES_DIR/educator-toolkit" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) ! -name ".gitkeep" -exec basename {} \; | sed 's/^/     - /'
fi

echo ""
echo "=========================================="
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Generate images using NiteCreator with prompts from:"
echo "   FEELINGS-UNPLUGGED-IMAGE-PROMPTS.md"
echo ""
echo "2. Save generated images to appropriate directories:"
echo "   $IMAGES_DIR/teen-journal/"
echo "   $IMAGES_DIR/parent-guide/"
echo "   $IMAGES_DIR/educator-toolkit/"
echo ""
echo "3. Once images are in place, run:"
echo "   cd $REPO_ROOT"
echo "   git add products/images/"
echo "   git commit -m \"Add visual assets for print guides\""
echo "   git push"
echo ""
echo "=========================================="
echo ""

# Optional: Stage any new images found
read -p "Would you like to stage any new images for git commit now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📦 Staging images..."
    git add "$IMAGES_DIR"/*.png "$IMAGES_DIR"/*.jpg "$IMAGES_DIR"/*.jpeg 2>/dev/null
    git status
    echo ""
    echo "✓ Images staged. Run 'git commit' when ready."
fi

echo ""
echo "✨ Done!"
