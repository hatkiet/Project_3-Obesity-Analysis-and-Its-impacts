def main ():
    # Ask for API key to be input
    api_key = input("Please enter your Socrata API key: ")

    # Establish info to write to file
    content = f'socrata_api_key = "{api_key}"'

    # Open file and write
    with open("Resources/apikeys.py", "w") as file:
        file.write(content)
    print("API key has been created, Can now open initial_notebook.ipynb")

if __name__ == "__main__":
    main()