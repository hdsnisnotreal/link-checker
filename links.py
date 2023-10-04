import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

# List of URLs to check
urls = [
    "https://education-live.fun/",
    # Add more URLs here
]

# Function to check if a URL is accessible
def check_url(url):
    try:
        response = requests.get(url)
        return response.status_code == 200
    except requests.exceptions.RequestException:
        return False

# Send email function
def send_email(subject, body):
    # Your Gmail credentials (use environment variables or a config file instead)
    gmail_user = os.getenv('GMAIL_USER')
    gmail_password = os.getenv('GMAIL_PASSWORD')

    # Email settings
    to_email = 'micdropws@gmail.com'

    msg = MIMEMultipart()
    msg['From'] = gmail_user
    msg['To'] = to_email
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(gmail_user, gmail_password)
        text = msg.as_string()
        server.sendmail(gmail_user, to_email, text)
        server.quit()
        print("Email sent successfully!")
    except Exception as e:
        print("Error sending email:", str(e))

# Check URLs and send results via email
blocked_urls = []
for url in urls:
    if not check_url(url):
        blocked_urls.append(url)

if blocked_urls:
    subject = "Blocked URLs Report"
    body = "\n".join(blocked_urls)
    send_email(subject, body)
else:
    print("All URLs are accessible.")
