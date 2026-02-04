import re
import random

# 14 cities as specified
cities = ['Hyderabad', 'Bengaluru', 'Chennai', 'Mumbai', 'Pune', 'Delhi', 'Noida', 'Gurugram', 'Kolkata', 'Ahmedabad', 'Kochi', 'Coimbatore', 'Vizag', 'Vijayawada']
cities_slug = {
    'Hyderabad': 'hyderabad', 'Bengaluru': 'bengaluru', 'Chennai': 'chennai',
    'Mumbai': 'mumbai', 'Pune': 'pune', 'Delhi': 'delhi', 'Noida': 'noida',
    'Gurugram': 'gurugram', 'Kolkata': 'kolkata', 'Ahmedabad': 'ahmedabad',
    'Kochi': 'kochi', 'Coimbatore': 'coimbatore', 'Vizag': 'vizag', 'Vijayawada': 'vijayawada'
}

# Categories as specified
categories = ['Time Tracking', 'Monitoring', 'Analytics', 'Security']

file_path = r"c:\Users\Dell\Downloads\TrackNexus-Web\TrackNexus-Web\latesttracknexus\app\dashboard\marketing\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find and process each page object for IDs 51-200
def process_page(match):
    page_text = match.group(0)
    id_match = re.search(r"id: '(\d+)'", page_text)

    if not id_match:
        return page_text

    page_id = int(id_match.group(1))

    if not (51 <= page_id <= 200):
        return page_text

    # Random city
    city_name = random.choice(cities)
    city_slug = cities_slug[city_name]

    # Random values
    leads = random.randint(100, 500)
    conversion_rate = round(random.uniform(5.0, 18.0), 1)
    category = random.choice(categories)
    conversions = int(leads * conversion_rate / 100)

    # Get base title (remove any existing city suffix)
    title_match = re.search(r"title: '([^']*)'", page_text)
    if title_match:
        old_title = title_match.group(1)
        # Remove existing city suffix
        base_title = re.sub(r'\s*-\s*[A-Za-z]+$', '', old_title)
        new_title = f"{base_title} - {city_name}"
        new_url = f"/in/{city_slug}/{base_title.lower().replace(' ', '-').replace('--', '-')}-{city_slug}"
    else:
        return page_text

    # Build clean page object
    result = f"""  {{
    id: '{page_id}',
    title: '{new_title}',
    url: '{new_url}',
    category: '{category}',
    tags: ['{city_name}', 'Geo-Targeted'],
    leads: {leads},
    conversions: {conversions},
    conversionRate: {conversion_rate},
    status: 'active',
  }}"""

    return result

# Pattern to match page objects
pattern = r'\s*\{\s*\n\s*id: \'\d+\'[\s\S]*?status: \'[^\']*\',?\s*\n\s*\}'

# First, let's extract the header and footer of the file
array_start = content.find('const mockMarketingPages: MarketingPage[] = [')
if array_start == -1:
    print("Could not find array start")
    exit(1)

array_content_start = content.find('[', array_start) + 1
array_end = content.rfind('];')

header = content[:array_content_start]
footer = content[array_end:]
array_content = content[array_content_start:array_end]

# Split into individual page objects
page_objects = []
brace_count = 0
current_obj = ""
in_object = False

for char in array_content:
    if char == '{':
        brace_count += 1
        in_object = True
    if in_object:
        current_obj += char
    if char == '}':
        brace_count -= 1
        if brace_count == 0 and in_object:
            page_objects.append(current_obj)
            current_obj = ""
            in_object = False

# Process each page object
prev_city = None
new_pages = []

for obj in page_objects:
    id_match = re.search(r"id: '(\d+)'", obj)
    if not id_match:
        continue

    page_id = int(id_match.group(1))

    if 51 <= page_id <= 200:
        # Random city (different from previous)
        available = [c for c in cities if c != prev_city]
        city_name = random.choice(available)
        prev_city = city_name
        city_slug = cities_slug[city_name]

        # Random values
        leads = random.randint(100, 500)
        conversion_rate = round(random.uniform(5.0, 18.0), 1)
        category = random.choice(categories)
        conversions = int(leads * conversion_rate / 100)

        # Get base title
        title_match = re.search(r"title: '([^']*)'", obj)
        if title_match:
            old_title = title_match.group(1)
            # Remove any existing city suffix (handles " - CityName" pattern)
            base_title = re.sub(r'\s*-\s*[A-Za-z]+$', '', old_title)
            new_title = f"{base_title} - {city_name}"
            slug_base = base_title.lower().replace(' ', '-').replace('&', 'and').replace('--', '-')
            new_url = f"/in/{city_slug}/{slug_base}"
        else:
            continue

        new_obj = f"""  {{
    id: '{page_id}',
    title: '{new_title}',
    url: '{new_url}',
    category: '{category}',
    tags: ['{city_name}', 'Geo-Targeted'],
    leads: {leads},
    conversions: {conversions},
    conversionRate: {conversion_rate},
    status: 'active',
  }}"""
        new_pages.append(new_obj)
    else:
        # Keep original for non-targeted IDs (though there shouldn't be any)
        new_pages.append(obj)

# Reconstruct file
new_content = header + "\n  // Original Pages\n" + ",\n".join(new_pages) + ",\n" + footer

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"DONE! Processed {len(new_pages)} pages with randomized cities!")
print("Sample cities from first 10 pages:")
for i, obj in enumerate(new_pages[:10]):
    title_match = re.search(r"title: '([^']*)'", obj)
    if title_match:
        print(f"  {i+1}. {title_match.group(1)}")
