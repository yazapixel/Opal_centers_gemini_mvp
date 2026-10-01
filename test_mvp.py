#!/usr/bin/env python3
"""
Automated Test Suite for Opal Centers MVP Website
Verifies file existence, HTML structure, accessibility attributes, CSS styles, and JavaScript interactions.
"""

import unittest
import os

class TestOpalCentersMVP(unittest.TestCase):
    def setUp(self):
        self.base_dir = os.path.dirname(os.path.abspath(__file__))
        self.html_path = os.path.join(self.base_dir, 'index.html')
        self.css_path = os.path.join(self.base_dir, 'style.css')
        self.js_path = os.path.join(self.base_dir, 'app.js')
        self.readme_path = os.path.join(self.base_dir, 'README.md')

    def test_files_exist(self):
        """Verify all core MVP files exist."""
        self.assertTrue(os.path.exists(self.html_path), "index.html is missing")
        self.assertTrue(os.path.exists(self.css_path), "style.css is missing")
        self.assertTrue(os.path.exists(self.js_path), "app.js is missing")
        self.assertTrue(os.path.exists(self.readme_path), "README.md is missing")

    def test_html_content(self):
        """Verify HTML contains required business information, sections, and accessibility attributes."""
        with open(self.html_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Business Name & Branding
        self.assertIn("مركز أوبال", content)
        self.assertIn("Opal Centers", content)

        # Location details from Benghazi
        self.assertIn("شارع العزيزية", content)
        self.assertIn("بنغازي", content)

        # Key sections and interactive elements
        self.assertIn("id=\"hero\"", content)
        self.assertIn("id=\"services\"", content)
        self.assertIn("id=\"about\"", content)
        self.assertIn("id=\"location\"", content)
        self.assertIn("id=\"bookingModal\"", content)

        # Accessibility attributes
        self.assertIn("role=\"dialog\"", content)
        self.assertIn("aria-modal=\"true\"", content)
        self.assertIn("aria-labelledby", content)

    def test_css_content(self):
        """Verify CSS defines luxury color palette, grid layouts, and responsive styling."""
        with open(self.css_path, 'r', encoding='utf-8') as f:
            css = f.read()

        self.assertIn("--gold-primary", css)
        self.assertIn("display: grid", css)
        self.assertIn("@media", css)
        self.assertIn("scroll-behavior: smooth", css)

    def test_js_content(self):
        """Verify JavaScript handles modal interactions, form validation, and inquiries."""
        with open(self.js_path, 'r', encoding='utf-8') as f:
            js = f.read()

        self.assertIn("bookingModal", js)
        self.assertIn("bookingForm", js)
        self.assertIn("inquiryForm", js)
        self.assertIn("DOMContentLoaded", js)

if __name__ == '__main__':
    unittest.main()
