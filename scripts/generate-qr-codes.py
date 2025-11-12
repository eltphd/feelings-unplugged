#!/usr/bin/env python3
"""
Generate QR codes for feedback page
"""
import qrcode
import os

# Feedback page URL
feedback_url = "https://feelingsunplugged.space/marketing/feedback.html"

# Create QR code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(feedback_url)
qr.make(fit=True)

# Create image
img = qr.make_image(fill_color="black", back_color="white")

# Save to products/images directory
output_path = os.path.join(os.path.dirname(__file__), "..", "products", "images", "feedback-qr-code.png")
img.save(output_path)
print(f"QR code saved to: {output_path}")

