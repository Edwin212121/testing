import time

def print_slow(text):
    """Print text slowly for dramatic effect."""
    for char in text:
        print(char, end='', flush=True)
        time.sleep(0.05)
    print()

def start_game():
    print_slow("You wake up in a dark, scary forest. The trees loom over you, and the sound of distant howls chills your spine.")
    print_slow("You have to find a way to survive. What will you do?")
    first_choice()

def first_choice():
    print("\n1. Look for shelter.")
    print("2. Search for food.")
    choice = input("Enter your choice (1 or 2): ")
    if choice == "1":
        shelter_path()
    elif choice == "2":
        food_path()
    else:
        print_slow("Invalid choice. Try again.")
        first_choice()

def shelter_path():
    print_slow("\nYou decide to look for shelter. After wandering for a while, you find a small cave.")
    print_slow("Do you want to enter the cave?")
    print("\n1. Yes, enter the cave.")
    print("2. No, keep looking for another shelter.")
    choice = input("Enter your choice (1 or 2): ")
    if choice == "1":
        print_slow("\nYou cautiously enter the cave. It's dark and smells damp.")
        print_slow("Suddenly, you hear a low growl. A bear emerges from the shadows!")
        print_slow("What will you do?")
        print("\n1. Try to fight the bear.")
        print("2. Run out of the cave.")
        bear_choice = input("Enter your choice (1 or 2): ")
        if bear_choice == "1":
            print_slow("\nYou try to fight the bear, but it's too strong. The bear overpowers you. Game over.")
        elif bear_choice == "2":
            print_slow("\nYou run out of the cave as fast as you can. Luckily, the bear doesn't chase you.")
            print_slow("You survive the encounter, but you still need to find shelter.")
            shelter_path()  # Restart shelter search
        else:
            print_slow("Invalid choice. Try again.")
            shelter_path()
    elif choice == "2":
        print_slow("\nYou keep looking but get lost in the forest. Unfortunately, you don't survive the night.")
    else:
        print_slow("Invalid choice. Try again.")
        shelter_path()

def food_path():
    print_slow("\nYou decide to search for food. You find some berries on a bush.")
    print_slow("Do you want to eat the berries?")
    print("\n1. Yes, eat the berries.")
    print("2. No, leave the berries and keep searching.")
    choice = input("Enter your choice (1 or 2): ")
    if choice == "1":
        print_slow("\nThe berries were poisonous! You feel dizzy and collapse. Game over.")
    elif choice == "2":
        print_slow("\nYou keep searching and find a stream with fresh water and edible plants. You survive the night. Well done!")
    else:
        print_slow("Invalid choice. Try again.")
        food_path()

if __name__ == "__main__":
    start_game()