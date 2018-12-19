#! /usr/bin/env python
"""
TODO: Write Description
"""
import argparse
import csv
import request

def main():
    # Parsing for command line arguments 
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "email", nargs="?", default="griffink3@gmail.com", type=str,
        help="email address of user")
    parser.add_argument(
        "password", nargs="?", default="2B9dfb1612", type=str,
        help="password")
    parser.add_argument(
        "info_file", nargs="?", default="connections_list.csv", type=str,
        help="the csv file containing all the info for connections to be made")
    parser.add_argument(
        "message_text", nargs="?", default="message_text.txt", type=argparse.FileType("r"),
        help="text file containing the connection message to be personalized and sent")
    args = parser.parse_args()

    # Reading in the raw message text
    original_text = args.email_text.read()
    args.email_text.close()

    # Setting up parameters for authentication 
    auth_url = "https://www.linkedin.com/oauth/v2/authorization"
    response_type = "code"
    client_id = "78po9jcrlm52tz"
    

    url = "https://api.linkedin.com/v2/me"

    # Setting up the SMTP server to be able to send emails
    s = smtplib.SMTP_SSL(host=args.host_address, port=args.port)
    s.login(args.sender_email, args.password)

    line = 0
    info = {}
    with open(args.info_file) as info_file:
        reader = csv.reader(info_file, delimiter=',')
        for row in reader:
            if line == 0:
                # Setting up the dictionary to store personalized info location from the csv header
                for i in range(len(row)):
                    token = "<" + row[i] + ">"
                    info[token] = i 
                if "<email>" not in info:
                    print("Error: Info csv must contain emails")
                    return
            else:
                new = original_text
                email = row[info["<email>"]] # Getting individual email
                # Replace tokens with personalized tokens
                for token in info:
                    new = new.replace(token, row[info[token]])
                msg = 'Subject: {}\n\n{}'.format(subject, new) # Creating a new message
                # Sending the email
                s.sendmail(args.sender_email, email, msg)
                print
                print("EMAIL " + str(line))
                print("Sent: " + new)
                print("To: " + email)
            line += 1
    s.quit # Quitting the SMTP server

if __name__ == "__main__":
    main()