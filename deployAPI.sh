#!/usr/bin/env bash 

# echo "${red}red text ${green}green text${reset}"
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

echo "${reset} "
echo "   "
echo "Make sure you have node 10 or above installed, the version you have is" 
echo "   "
node -v
echo "   "
echo "   "
# Installing restroom
npx degit dyne/restroom-template restroom-mw --force

# setup docker
cd ./restroom-mw

touch .env
echo 'ZENCODE_DIR=./zencode
CUSTOM_404_MESSAGE=nothing to see here
HTTP_PORT=3300
HTTPS_PORT=3301' > .env


# Adding the exported files
echo "   "
echo "Adding exported contracts from apiroom"

echo Creating directory "./zencode/dyneorg/"
mkdir -p "./zencode/dyneorg"

echo Creating file "Keypair-Creation-Server-Side.zen":
echo "Scenario 'ecdh': create the signature of an object 
Given I am 'theBackend' 
Given I have my 'keypair'

# This is the password that will be used for PBKDF
Given I have a 'string' named 'theBackendPassword'

# Loading the data that the user is entering at the signup. This data will be sent from the client to the server
Given I have a 'string dictionary' named 'userData'

# The server creates a PBKDF of the 'userData'
When I create the key derivation of 'userData' with password 'theBackendPassword'

# Here we print the PBKDF
Then print the 'key derivation'

# The output will be sent back to the user, as it will be part of the random seed to create the keypair
#

"> ./zencode/dyneorg/Keypair-Creation-Server-Side.zen

echo Creating file "Keypair-Creation-Server-Side.keys":
echo '{"theBackend":{"keypair":{"private_key":"Aku7vkJ7K01gQehKELav3qaQfTeTMZKgK+5VhaR3Ui0=","public_key":"BBCQg21VcjsmfTmNsg+I+8m1Cm0neaYONTqRnXUjsJLPa8075IYH+a9w2wRO7rFM1cKmv19Igd7ntDZcUvLq3xI="}},"theBackendPassword":"myVerySecretPassword","userData":{"username":"JohnDoe","email":"john@doe.com","phone":"12345678"}}' > ./zencode/dyneorg/Keypair-Creation-Server-Side.keys

echo Creating file "Keypair-Creation-Client-Side.zen":
echo "Scenario 'ecdh': create keypair from data

# Loading the user name from data
Given my name is in a 'string' named 'username'

# Loading the answers from 3 secret questions. The user will have to pick the 3 challenges from a list 
# and have to remember the questions - the order is not important cause Zenroom will sort alphabetically 
# the data in input
#
# NOTE: the challenges will never be communicated to the server or to anybody else!
Given I have a 'string dictionary' named 'userChallenges'

# Loading the pbkdf received from the server, containing a signed hash of known data
Given that I have a 'string' named 'key_derivation'  

# Loading the individual challenges, in order to have them hashed 
# and the hashes OPTIONALLY stored by the server, to improve regeneration of the keypair
Given I have a 'string' named 'whereMyParentsMet' in 'userChallenges'
Given I have a 'string' named 'myFirstPet' in 'userChallenges'
Given I have a 'string' named 'myHomeTown' in 'userChallenges'
Given I have a 'string' named 'nameOfFirstTeacher' in 'userChallenges'
Given I have a 'string' named 'surnameOfMotherBeforeWedding' in 'userChallenges'


# Hashing the user's challenges and renaming it
When I create the hash of 'userChallenges'
and I rename the 'hash' to 'userChallenges.hash'

# appending the user challenges' hash to the pbkdf, hashing the result and renaming it 
When I append 'userChallenges.hash' to 'key_derivation'
When I create the hash of 'key_derivation'
and I rename the 'hash' to 'concatenatedHashes'

# Creating the keypair from the hash just created
When I create the keypair with secret key 'concatenatedHashes'

When I create the 'base64 dictionary'
and I rename the 'base64 dictionary' to 'hashedAnswers'


# Creating the hashes of the single challenges, to OPTIONALLY help 
# regeneration of the keypair

When I create the hash of 'whereMyParentsMet'
and I rename the 'hash' to 'whereMyParentsMet.hash'
When I insert 'whereMyParentsMet.hash' in 'hashedAnswers'

When I create the hash of 'myFirstPet'
and I rename the 'hash' to 'myFirstPet.hash'
When I insert 'myFirstPet.hash' in 'hashedAnswers'

When I create the hash of 'myHomeTown'
and I rename the 'hash' to 'myHomeTown.hash'
When I insert 'myHomeTown.hash' in 'hashedAnswers'

When I create the hash of 'nameOfFirstTeacher'
and I rename the 'hash' to 'nameOfFirstTeacher.hash'
When I insert 'nameOfFirstTeacher.hash' in 'hashedAnswers'

When I create the hash of 'surnameOfMotherBeforeWedding'
and I rename the 'hash' to 'surnameOfMotherBeforeWedding.hash'
When I insert 'surnameOfMotherBeforeWedding.hash' in 'hashedAnswers'



Then print my 'keypair'

# Comment the line below, if you don't want to output the hashes of the challenges
Then print 'hashedAnswers'

"> ./zencode/dyneorg/Keypair-Creation-Client-Side.zen

echo Creating file "Keypair-Creation-Client-Side.keys":
echo '{"userChallenges":{"whereMyParentsMet":"Paris","myFirstPet":"ScoobyDoo","myHomeTown":"Amsterdam","nameOfFirstTeacher":"null","surnameOfMotherBeforeWedding":"null"},"username":"JohnDoe","key_derivation":"qf3skXnPGFMrE28UJS7S8BdT8g=="}' > ./zencode/dyneorg/Keypair-Creation-Client-Side.keys






# Finished exported files
echo "   "
echo "Finished exporting contracts from apiroom"
echo "   "

# Debbing
echo "   "
echo "Printing the .env file:"
echo "   "
cat .env

# instructions 
echo "   "
echo "${reset} "
echo "${green} ALL DONE  "
echo "${reset} "
echo "   "
echo "To install restroom-mw type:"
echo "   "
echo "${red}cd restroom-mw"
echo "${reset} "
echo "${red}yarn"
echo "${reset} "
echo "To launch restroom-mw type:"
echo "${reset} "
echo "${red}yarn start"
echo "${reset} "


