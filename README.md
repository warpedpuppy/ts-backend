sample playground queries: 

query GetGreeting {
  greetings
}
query GetCharacters {
  characters {
    id
    name
    color
  }
}
mutation createCharacter {
  createCharacter(input: {
    name: "henry",
    color: "purple"
  }) {
    name
    color
  }
}