#!/usr/bin/env python3
"""
Download all blog images from Unsplash.
Run from project root: python scripts/download-blog-images.py
"""

import os
import urllib.request
import urllib.error
from pathlib import Path

# Image mappings
IMAGES = {
    "01-productivity-tracker": "1611224923853-80b023f02d71",
    "02-automatic-time-tracking": "1552664730-d307ca884978",
    "03-productivity-tracking-analytics": "1451187580459-43490279c0fa",
    "04-productivity-tracking-tools": "1542744173-8e7e53415bb0",
    "05-employee-productivity-software": "1522071820081-009f0129c71c",
    "06-employee-monitoring-dashboard": "1517245386807-bb43f82c33c4",
    "07-workforce-monitoring-software": "1556761175-b413da4baf72",
    "08-activity-monitoring-reports": "1454165804606-c3d57bc86b40",
    "09-work-analytics-dashboard": "1460925895917-afdab827c52f",
    "10-screen-monitoring-software": "1504868584819-f8e8b4b6d7e3",
    "11-project-time-tracking": "1551288049-bebda4e38f71",
    "12-employee-tracking-software": "1553877522-43269d4ea984",
    "13-team-collaboration-remote": "1600880292203-757bb62b4baf",
    "14-remote-team-management": "1559136555-9303baea8ebd",
    "15-distributed-team-productivity": "1557804506-669a67965ba0",
    "16-work-from-home-productivity": "1531482615713-2afd69097998",
    "17-office-productivity-team": "1521737711867-e3b97375f902",
    "18-time-management-tools": "1519389950473-47ba0277781c",
    "19-employee-accountability-trust": "1556761175-5973dc0f32e7",
    "20-performance-management-analytics": "1531545514256-b1400bc00f31",
    "21-task-management-software": "1552581234-26160f608093",
    "22-team-productivity-software": "1542744094-3a31f272c490",
    "23-productivity-tools-teams": "1507003211169-0a1dd7228f2d",
    "24-billing-time-tracking": "1573497019940-1c28c88b4f3e",
    "25-client-billing-accuracy": "1497215842964-222b430dc094",
    "26-project-profitability-analysis": "1542744094-24638eff58bb",
    "27-roi-tracking-analytics": "1487017159836-4e23ece2e4cf",
    "28-workforce-efficiency-metrics": "1557425955-df376b5903c8",
    "29-business-intelligence-dashboard": "1552664688-cf412ec27db2",
    "30-web-development-workflow": "1498050108023-c5249f4df085",
    "time-tracking-best-practices": "1611224923853-80b023f02d71",
    "employee-monitoring-guide": "1573496359142-b8d87734a5a2",
    "remote-work-productivity-tips": "1587560699334-cc4ff634909a",
}

def download_images():
    blog_images_dir = Path("public/images/blog")
    blog_images_dir.mkdir(parents=True, exist_ok=True)

    print("📥 Downloading blog images from Unsplash...\n")

    downloaded = 0
    failed = 0

    for name, photo_id in IMAGES.items():
        url = f"https://images.unsplash.com/photo-{photo_id}?w=1200&h=630&fit=crop"
        file_path = blog_images_dir / f"{name}.jpg"

        if file_path.exists():
            print(f"⏭️  Skipped: {name}.jpg")
            continue

        try:
            print(f"⬇️  {name}.jpg...", end=" ")

            request = urllib.request.Request(
                url,
                headers={'User-Agent': 'Mozilla/5.0 (Blog Image Optimizer)'}
            )

            with urllib.request.urlopen(request, timeout=15) as response:
                with open(file_path, 'wb') as out_file:
                    out_file.write(response.read())

            size = file_path.stat().st_size / 1024
            print(f"✅ ({size:.1f} KB)")
            downloaded += 1

        except Exception as e:
            print(f"❌ Error: {str(e)[:50]}")
            failed += 1

    print(f"\n✅ Downloaded: {downloaded} | Failed: {failed}")
    print(f"📁 Location: {blog_images_dir.absolute()}\n")

if __name__ == "__main__":
    try:
        download_images()
    except KeyboardInterrupt:
        print("\n⚠️  Download cancelled.")
