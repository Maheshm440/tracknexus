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

lines = content.split('\n')
output_lines = []
i = 0
prev_city = None

while i < len(lines):
    line = lines[i]
    id_match = re.search(r"id: '(\d+)'", line)

    if id_match:
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

            output_lines.append(line)
            i += 1

            # Process title
            if i < len(lines) and 'title:' in lines[i]:
                title_line = lines[i]
                title_match = re.search(r"title: '([^']*)'", title_line)
                if title_match:
                    old_title = title_match.group(1)
                    new_title = re.sub(r'\s*-\s*[A-Za-z]+$', '', old_title)
                    new_title = f"{new_title} - {city_name}"
                    output_lines.append(title_line[:title_match.start()] + f"title: '{new_title}'" + title_line[title_match.end():])
                    i += 1

                    # Process URL
                    if i < len(lines) and 'url:' in lines[i]:
                        url_line = lines[i]
                        url_match = re.search(r"url: '([^']*)'", url_line)
                        if url_match:
                            base_name = new_title.lower().replace(' ', '-').replace('--', '-')
                            new_url = f"/in/{city_slug}/{base_name}"
                            output_lines.append(url_line[:url_match.start()] + f"url: '{new_url}'" + url_line[url_match.end():])
                            i += 1

                            # Update category
                            if i < len(lines) and 'category:' in lines[i]:
                                cat_line = lines[i]
                                cat_match = re.search(r"category: '[^']*'", cat_line)
                                if cat_match:
                                    output_lines.append(cat_line[:cat_match.start()] + f"category: '{category}'" + cat_line[cat_match.end():])
                                else:
                                    output_lines.append(cat_line)
                                i += 1

                            # Update tags (Geo-Targeted for single city)
                            if i < len(lines) and 'tags:' in lines[i]:
                                tags_line = lines[i]
                                tags_match = re.search(r"tags: \[.*?\]", tags_line)
                                if tags_match:
                                    output_lines.append(tags_line[:tags_match.start()] + f"tags: ['{city_name}', 'Geo-Targeted']" + tags_line[tags_match.end():])
                                else:
                                    output_lines.append(tags_line)
                                i += 1

                            # Update leads
                            if i < len(lines) and 'leads:' in lines[i]:
                                leads_line = lines[i]
                                leads_match = re.search(r"leads: \d+", leads_line)
                                if leads_match:
                                    output_lines.append(leads_line[:leads_match.start()] + f"leads: {leads}" + leads_line[leads_match.end():])
                                else:
                                    output_lines.append(leads_line)
                                i += 1

                            # Update conversions
                            if i < len(lines) and 'conversions:' in lines[i]:
                                conv_line = lines[i]
                                conv_match = re.search(r"conversions: \d+", conv_line)
                                if conv_match:
                                    output_lines.append(conv_line[:conv_match.start()] + f"conversions: {conversions}" + conv_line[conv_match.end():])
                                else:
                                    output_lines.append(conv_line)
                                i += 1

                            # Update conversionRate
                            if i < len(lines) and 'conversionRate:' in lines[i]:
                                rate_line = lines[i]
                                rate_match = re.search(r"conversionRate: [\d.]+", rate_line)
                                if rate_match:
                                    output_lines.append(rate_line[:rate_match.start()] + f"conversionRate: {conversion_rate}" + rate_line[rate_match.end():])
                                else:
                                    output_lines.append(rate_line)
                                i += 1

                            # Update status to active
                            if i < len(lines) and 'status:' in lines[i]:
                                status_line = lines[i]
                                status_match = re.search(r"status: '[^']*'", status_line)
                                if status_match:
                                    output_lines.append(status_line[:status_match.start()] + "status: 'active'" + status_line[status_match.end():])
                                else:
                                    output_lines.append(status_line)
                                i += 1
                        else:
                            output_lines.append(url_line)
                            i += 1
                    else:
                        i += 1
                else:
                    output_lines.append(title_line)
                    i += 1
            else:
                i += 1
        else:
            output_lines.append(line)
            i += 1
    else:
        output_lines.append(line)
        i += 1

with open(file_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(output_lines))

print("DONE! All pages updated!")
