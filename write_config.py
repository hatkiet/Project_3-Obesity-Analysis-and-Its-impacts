def main ():
    # Ask for API Token to be input
    print("""
    If you don't wish to use API token. Skip and move on to First_Clean.ipynb
    Want API Token? go to: https://evergreen.data.socrata.com/""")
    api_token = input("Please enter your Socrata API Token: ")

    # Establish info to write to file
    content = f'socrata_api_token = "{api_token}"\n'

    # Setup postgres info for future
    print("""Note: method 1 uses sqlalchemy, this will automatically add your information.
    You can forgo this and input it manually into the First_clean.ipynb
    IMPORTANT: .gitignore will not track the file this info will be entered in.
    However, a local file will be created in Resoureces/config/config.py
    For security it is advised you delete file after finished using this project.""")
    setup_db = input("Would you like to set your postgres information? (yes/no): ")
    if setup_db.lower() == 'yes':
        db_name = input("Enter desired Database name: ")
        user_name = input("Enter your username: ")
        password = input("Enter your password: ")
        host = input("enter host name (default: localhost): ") or "localhost"
        port = input("Enter port (default: 5432): ") or "5432"

        database_info = (
            f'postgresql://{user_name}:{password}@{host}:{port}/{db_name}'
        )
        content += f'postgres_info_string = "{database_info}"\n'

    else:
        print("""If you would like to continue with method 1 without entering info into this script, 
              manually input into First_clean.ipynb""")


    # Open file and write
    with open("Resources/config/config.py", "w") as config_file:
        config_file.write(content)
    print("Config has been set, Can now open First_Clean.ipynb")

if __name__ == "__main__":
    main()