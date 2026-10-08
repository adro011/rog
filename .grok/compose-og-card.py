#!/usr/bin/env python3
"""OG card for The Chokepoint: Hormuz aerial + exact editorial lockup."""
from __future__ import annotations

import os

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance

SRC = "/workspace/public/briefing/hormuz-aerial.jpg"
OUT = "/workspace/.grok/card-raw.jpg"
FONTS = "/workspace/.grok/fonts"

OIL = (9, 9, 8)
IVORY = (236, 232, 225)
STEEL = (154, 163, 173)
EMBER = (181, 74, 56)


def mix(c1, c2, t):
    return tuple(int(a + (b - a) * t) for a, b in zip(c1, c2))


def draw_tracked(draw, text, font, fill, cx, y, tracking):
    glyphs = list(text)
    widths = [draw.textlength(g, font=font) for g in glyphs]
    total = sum(widths) + tracking * max(0, len(glyphs) - 1)
    x = cx - total / 2
    for g, w in zip(glyphs, widths):
        draw.text((x, y), g, font=font, fill=fill, anchor="lt")
        x += w + tracking
    return total


def main():
    base = Image.open(SRC).convert("RGB")
    w, h = base.size  # 1792×1008

    # Slightly darker, more oil-black, keep the strait readable
    base = ImageEnhance.Brightness(base).enhance(0.78)
    base = ImageEnhance.Contrast(base).enhance(1.12)
    base = ImageEnhance.Color(base).enhance(0.92)

    # Vignette toward oil black
    vig = Image.new("L", (w, h), 0)
    vd = ImageDraw.Draw(vig)
    vd.ellipse((-w * 0.08, -h * 0.12, w * 1.08, h * 1.12), fill=255)
    vig = vig.filter(ImageFilter.GaussianBlur(90))
    base = Image.composite(base, Image.new("RGB", (w, h), OIL), vig)

    # Center scrim so the lockup reads over bright water
    scrim = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(scrim)
    sd.ellipse(
        (w * 0.18, h * 0.18, w * 0.82, h * 0.82),
        fill=(*OIL, 150),
    )
    scrim = scrim.filter(ImageFilter.GaussianBlur(48))
    img = Image.alpha_composite(base.convert("RGBA"), scrim).convert("RGB")

    draw = ImageDraw.Draw(img)
    cx = w / 2

    font_kicker = ImageFont.truetype(f"{FONTS}/ibm-plex-sans-500.ttf", 28)
    font_the = ImageFont.truetype(f"{FONTS}/newsreader-500.ttf", 42)
    font_title = ImageFont.truetype(f"{FONTS}/newsreader-600.ttf", 118)
    font_tag = ImageFont.truetype(f"{FONTS}/ibm-plex-sans-400.ttf", 30)

    # Lockup sits in the middle of the frame (survives the ~3% 16:9 crop)
    kicker_y = 338
    the_y = 392
    title_y = 442
    rule_y = 592
    tag_y = 618

    draw_tracked(draw, "SPECIAL BRIEFING", font_kicker, STEEL, cx, kicker_y, tracking=9)
    draw_tracked(draw, "THE", font_the, mix(IVORY, STEEL, 0.2), cx, the_y, tracking=14)
    title_w = draw_tracked(draw, "CHOKEPOINT", font_title, IVORY, cx, title_y, tracking=6)

    rule_w = min(title_w * 0.28, 220)
    draw.rectangle((cx - rule_w / 2, rule_y, cx + rule_w / 2, rule_y + 3), fill=EMBER)

    draw_tracked(
        draw,
        "IRAN, ISRAEL  &  THE GLOBAL FUEL CRISIS",
        font_tag,
        mix(STEEL, IVORY, 0.35),
        cx,
        tag_y,
        tracking=3,
    )

    # Fine steel hairline frame, well inside the crop
    m = 42
    draw.rectangle((m, m, w - m, h - m), outline=mix(STEEL, OIL, 0.62), width=1)

    img.save(OUT, "JPEG", quality=93, optimize=True, subsampling=1)
    print("wrote", OUT, img.size, os.path.getsize(OUT))


if __name__ == "__main__":
    main()
