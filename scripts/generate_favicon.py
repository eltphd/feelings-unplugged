#!/usr/bin/env python3
"""
Generate branded favicon assets for Feelings Unplugged.

Outputs:
    marketing/favicon-512.png
    marketing/apple-touch-icon.png (180x180)
    marketing/favicon-32.png
    marketing/favicon.ico (multi-size ico)

Run from repository root:
    python3 scripts/generate_favicon.py
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

# Brand palette (mirrors marketing/style.css)
COLOR_PRIMARY = "#B7664F"
COLOR_PRIMARY_DARK = "#A45A45"
COLOR_SURFACE = "#FCF9F3"
COLOR_SHADOW = (0, 0, 0, 28)


def build_icon(size: int) -> Image.Image:
    """
    Create a square favicon image with stylized F/U monogram.
    """
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    outer_radius = int(size * 0.24)

    # Background with two-tone overlay for subtle depth
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=outer_radius, fill=COLOR_PRIMARY)
    overlay = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    overlay_draw.rounded_rectangle(
        (size * 0.04, size * 0.04, size * 0.94, size * 0.94),
        radius=int(outer_radius * 0.9),
        fill=COLOR_PRIMARY_DARK,
    )
    img = Image.alpha_composite(img, overlay)

    # Add a soft inner shadow for dimensionality
    shadow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle(
        (size * 0.08, size * 0.08, size * 0.92, size * 0.92),
        radius=int(outer_radius * 0.75),
        fill=COLOR_SHADOW,
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=size * 0.04))
    img = Image.alpha_composite(img, shadow)

    draw = ImageDraw.Draw(img)

    accent = COLOR_SURFACE
    background = COLOR_PRIMARY_DARK

    # Stylized "F"
    bar_width = size * 0.12
    draw.rounded_rectangle(
        (size * 0.20, size * 0.22, size * 0.32, size * 0.78),
        radius=int(bar_width * 0.45),
        fill=accent,
    )
    draw.rounded_rectangle(
        (size * 0.32, size * 0.22, size * 0.58, size * 0.36),
        radius=int(bar_width * 0.45),
        fill=accent,
    )
    draw.rounded_rectangle(
        (size * 0.32, size * 0.42, size * 0.52, size * 0.56),
        radius=int(bar_width * 0.45),
        fill=accent,
    )

    # Stylized "U"
    u_outer = (
        size * 0.60,
        size * 0.24,
        size * 0.86,
        size * 0.78,
    )
    draw.rounded_rectangle(u_outer, radius=int(bar_width * 0.75), fill=accent)

    u_inner_margin = size * 0.08
    u_inner = (
        u_outer[0] + u_inner_margin,
        u_outer[1] + u_inner_margin,
        u_outer[2] - u_inner_margin,
        u_outer[3] - u_inner_margin * 0.7,
    )
    draw.rounded_rectangle(u_inner, radius=int(bar_width * 0.6), fill=background)

    return img


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    marketing_dir = repo_root / "marketing"
    marketing_dir.mkdir(exist_ok=True)

    sizes = {
        "favicon-512.png": 512,
        "apple-touch-icon.png": 180,
        "favicon-32.png": 32,
    }

    for name, size in sizes.items():
        image = build_icon(size)
        destination = marketing_dir / name
        image.save(destination, optimize=True)
        print(f"Saved {destination} ({size}x{size})")

    # Multi-size ICO
    ico_image = build_icon(256)
    ico_path = marketing_dir / "favicon.ico"
    ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128)]
    ico_image.save(ico_path, sizes=ico_sizes)
    print(f"Saved {ico_path} (ico with {ico_sizes})")


if __name__ == "__main__":
    main()


