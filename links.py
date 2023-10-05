import requests

def check_links(links):
    accessible_links = []
    inaccessible_links = []

    for link in links:
        try:
            response = requests.head(link)
            if response.status_code < 400:  # Check if the response status is not an error (e.g., 404)
                accessible_links.append(link)
            else:
                inaccessible_links.append(link)
        except Exception as e:
            inaccessible_links.append(link)

    return accessible_links, inaccessible_links

if __name__ == "__main__":
    input_links = [
        "https://www.example.com",
        "https://www.example.com/nonexistent",  # This link will likely be inaccessible
        "https://www.google.com",
    ]

    accessible_links, inaccessible_links = check_links(input_links)

    print("Accessible Links:")
    for link in accessible_links:
        print(link)

    print("\nInaccessible Links:")
    for link in inaccessible_links:
        print(link)
