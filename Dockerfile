# Importing node14 docker image
FROM node:14-alpine

# Add dependencies
RUN apk add git python make g++

# Installing restroom
RUN npx degit dyne/restroom-template /restroom-mw
WORKDIR /restroom-mw
RUN yarn

# Configure restroom
ENV ZENCODE_DIR=/restroom-mw/zencode
ENV CUSTOM_404_MESSAGE="nothing to see here"
ENV HTTP_PORT=3300
ENV HTTPS_PORT=3301

# Adding the exported files
RUN echo "Adding exported contracts from apiroom"
RUN echo -e "Scenario 'ecdh': create the signature of an object \nGiven I am 'theBackend' \nGiven I have my 'keypair'\n\n# This is the password that will be used for PBKDF\nGiven I have a 'string' named 'theBackendPassword'\n\n# Loading the data that the user is entering at the signup. This data will be sent from the client to the server\nGiven I have a 'string dictionary' named 'userData'\n\n# The server creates a PBKDF of the 'userData'\nWhen I create the key derivation of 'userData' with password 'theBackendPassword'\n\n# Here we print the PBKDF\nThen print the 'key derivation'\n\n# The output will be sent back to the user, as it will be part of the random seed to create the keypair\n#\n\n"> ./zencode/Keypair-Creation-Server-Side.zen
RUN echo -e '{"theBackend":{"keypair":{"private_key":"Aku7vkJ7K01gQehKELav3qaQfTeTMZKgK+5VhaR3Ui0=","public_key":"BBCQg21VcjsmfTmNsg+I+8m1Cm0neaYONTqRnXUjsJLPa8075IYH+a9w2wRO7rFM1cKmv19Igd7ntDZcUvLq3xI="}},"theBackendPassword":"myVerySecretPassword","userData":{"username":"JohnDoe","email":"john@doe.com","phone":"12345678"}}' > ./zencode/Keypair-Creation-Server-Side.keys
RUN echo -e "Scenario 'ecdh': create keypair from data\n\n# Loading the user name from data\nGiven my name is in a 'string' named 'username'\n\n# Loading the answers from 3 secret questions. The user will have to pick the 3 challenges from a list \n# and have to remember the questions - the order is not important cause Zenroom will sort alphabetically \n# the data in input\n#\n# NOTE: the challenges will never be communicated to the server or to anybody else!\nGiven I have a 'string dictionary' named 'userChallenges'\n\n# Loading the pbkdf received from the server, containing a signed hash of known data\nGiven that I have a 'string' named 'key_derivation'  \n\n# Loading the individual challenges, in order to have them hashed \n# and the hashes OPTIONALLY stored by the server, to improve regeneration of the keypair\nGiven I have a 'string' named 'whereMyParentsMet' in 'userChallenges'\nGiven I have a 'string' named 'myFirstPet' in 'userChallenges'\nGiven I have a 'string' named 'myHomeTown' in 'userChallenges'\nGiven I have a 'string' named 'nameOfFirstTeacher' in 'userChallenges'\nGiven I have a 'string' named 'surnameOfMotherBeforeWedding' in 'userChallenges'\n\n\n# Hashing the user's challenges and renaming it\nWhen I create the hash of 'userChallenges'\nand I rename the 'hash' to 'userChallenges.hash'\n\n# appending the user challenges' hash to the pbkdf, hashing the result and renaming it \nWhen I append 'userChallenges.hash' to 'key_derivation'\nWhen I create the hash of 'key_derivation'\nand I rename the 'hash' to 'concatenatedHashes'\n\n# Creating the keypair from the hash just created\nWhen I create the keypair with secret key 'concatenatedHashes'\n\nWhen I create the 'base64 dictionary'\nand I rename the 'base64 dictionary' to 'hashedAnswers'\n\n\n# Creating the hashes of the single challenges, to OPTIONALLY help \n# regeneration of the keypair\n\nWhen I create the hash of 'whereMyParentsMet'\nand I rename the 'hash' to 'whereMyParentsMet.hash'\nWhen I insert 'whereMyParentsMet.hash' in 'hashedAnswers'\n\nWhen I create the hash of 'myFirstPet'\nand I rename the 'hash' to 'myFirstPet.hash'\nWhen I insert 'myFirstPet.hash' in 'hashedAnswers'\n\nWhen I create the hash of 'myHomeTown'\nand I rename the 'hash' to 'myHomeTown.hash'\nWhen I insert 'myHomeTown.hash' in 'hashedAnswers'\n\nWhen I create the hash of 'nameOfFirstTeacher'\nand I rename the 'hash' to 'nameOfFirstTeacher.hash'\nWhen I insert 'nameOfFirstTeacher.hash' in 'hashedAnswers'\n\nWhen I create the hash of 'surnameOfMotherBeforeWedding'\nand I rename the 'hash' to 'surnameOfMotherBeforeWedding.hash'\nWhen I insert 'surnameOfMotherBeforeWedding.hash' in 'hashedAnswers'\n\n\n\nThen print my 'keypair'\n\n# Comment the line below, if you don't want to output the hashes of the challenges\nThen print 'hashedAnswers'\n\n"> ./zencode/Keypair-Creation-Client-Side.zen
RUN echo -e '{"userChallenges":{"whereMyParentsMet":"Paris","myFirstPet":"ScoobyDoo","myHomeTown":"Amsterdam","nameOfFirstTeacher":"null","surnameOfMotherBeforeWedding":"null"},"username":"JohnDoe","key_derivation":"qf3skXnPGFMrE28UJS7S8BdT8g=="}' > ./zencode/Keypair-Creation-Client-Side.keys

# yarn install and run
CMD yarn start

