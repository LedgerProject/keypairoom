# Keypairoom

Component to generate and regenerate a keypair, in a deterministic and private way.
The cryptographic part consists of two [Zenroom](zenroom.org) smart contracts, the first executed server-side to generate a seed (based on public data such as user name), the second generate client side, based on the output of the first smart contract and on private information, namely "The challenges". 

# Input data of the smart contracts 

 - [Seed: input data needed to generate the pbkdf from the server](./zencode/Keypair-Creation-Server-Side.keys ':include :type=code json') 
 
```json
{
   "theBackend":{
      "keypair":{
         "private_key":"Aku7vkJ7K01gQehKELav3qaQfTeTMZKgK+5VhaR3Ui0=",
         "public_key":"BBCQg21VcjsmfTmNsg+I+8m1Cm0neaYONTqRnXUjsJLPa8075IYH+a9w2wRO7rFM1cKmv19Igd7ntDZcUvLq3xI="
      }
   },
   "theBackendPassword":"myVerySecretPassword",
   "userData":{
      "username":"JohnDoe",
      "email":"john@doe.com",
      "phone":"12345678"
   }
}
``` 
 
 
 - [Keypair and challenged hashes: ](./zencode/Keypair-Creation-client-Side.keys ':include :type=code json')

```json
{
	"userChallenges": {
		"whereMyParentsMet": "Paris",
		"myFirstPet": "ScoobyDoo",
		"myHomeTown": "Amsterdam",
		"nameOfFirstTeacher": "null",
		"surnameOfMotherBeforeWedding": "null"
	},
	"username": "JohnDoe",
	"key_derivation": "qf3skXnPGFMrE28UJS7S8BdT8g=="
}
``` 

# Smart contracts deployed as APIs

See here what the scripts will return: 

 - [Server side: generation of seed based on public info](https://apiroom.net/api/dyneorg/Keypair-Creation-Server-Side) 
 - [Client side: generation of keypair and optional hashing of challenges](https://apiroom.net/api/dyneorg/Keypair-Creation-Client-Side) 
 - And here the [Swagger](https://apiroom.net/docs/dyneorg/) for both scripts (search for the names of the APIs on the page)
 
 - The deployment is done [via restroom-mw](https://dyne.github.io/restroom-mw/#/) and can be installed using the script [deployAPI.sh](deployAPI.sh) or the [Dockerfile](Dockerfile), info about Dockerfile deployment [here](https://dev.zenroom.org/#/pages/apiroom?id=build-and-run-the-docker-image). 
  
# Keypair lib

To configure backend environment variables please put an .env file at the top of your project like this or rename .env.sample to .env: 

```json
#BACKEND CREDENTIALS
BACKEND_PRIVATE_KEY=Aku7vkJ7K01gQehKELav3qaQfTeTMZKgK+5VhaR3Ui0=
BACKEND_PUBLIC_KEY=BBCQg21VcjsmfTmNsg+I+8m1Cm0neaYONTqRnXUjsJLPa8075IYH+a9w2wRO7rFM1cKmv19Igd7ntDZcUvLq3xI=
BACKEND_PASSWORD=myVerySecretPassword

#UNCOMMENT HERE IF YOU WANT TO OVERRIDE DEFAULT WITH A DIFFERENT CONTRACT
#SERVER_SIDE_CONTRACT=zencode/Keypair-Creation-Server-Side.zen
#CLIENT_SIDE_CONTRACT=zencode/Keypair-Creation-Client-Side.zen

#UNCOMMENT HERE IF YOU WANT TO OVERRIDE FOLDER OR FILENAME default: prop/questions-en_GB.json
#QUESTION_FOLDER=props/
#QUESTION_FILE_PREPEND=questions-
``` 
 ## Installation

```bash
npm i keypair-lib
```

## Usage

```ts
import { getSafetyQuestions } from 'keypair-lib'

getSafetyQuestions('en_GB'); 
```
outcome:

```json
{
    "question1":"Where my parents met?",
    "question2":"What is the name of your first pet?",
    "question3":"What is your home town?",
    "question4":"What is the name of your first teacher?",
    "question5":"What is the surname of your mother before wedding?"
}
``` 

```ts
import { createPBKDF } from 'keypair-lib'

const userData = {
    username: "JohnDoe",
    email: "john@doe.com",
    phone: "12345678",
};

const data = await createPBKDF(userData);
```
content of data will be:

```json
{
   "key_derivation": "IF+tlV3TquNpuXVheRz8vKwkD567Nf9YzrI/AIi5Yr0gX62VXdOq42m5dWF5HPw="
}
``` 

```ts
import { sanitizeAnswers } from 'keypair-lib'

const answers = {
    question1: "L'Aquila",
    question2: "C arl",
    question3: "88 ggg",
    question4: "null",
    question5: "null",
};

sanitizeAnswers(answers);
```
outcome:

```json
{
    "question1": "laquila",
    "question2": "carl",
    "question3": "88ggg",
    "question4": "null",
    "question5": "null",
}
``` 

```ts
import { recoveryKeypair } from 'keypair-lib'

const answers = {
    question1: "Paris",
    question2: "ScoobyDoo",
    question3: "Amsterdam",
    question4: "null",
    question5: "null",
};
const PBKDF = "qf3skXnPGFMrE28UJS7S8BdT8g==";
const username = "user";

const data = await recoveryKeypair(answers, PBKDF, username);
```
outcome:

```json
{
    "hashedAnswers": {
        "question1.hash": "XdJytPMWt3anuOPQiUs34eQr49XTsgS4pYNsxQWXprE=",
        "question2.hash": "2hauYmg/8TGnG5IeCTzlFKHvw1XpxbKaMdmEUbUNQ2c=",
        "question3.hash": "ABPAH+DQlCCbi9PSO4+W26vNAd3SoDnuuoLRiRrPDWE=",
        "question4.hash": "dCNOmK/nSY+12vHzasLXiswzlGT5UHA7jAGYkvmCuQs=",
        "question5.hash": "dCNOmK/nSY+12vHzasLXiswzlGT5UHA7jAGYkvmCuQs=",
    },
    "user": {
        "keypair": {
        "private_key": "VUVdIyPeC+x3o66b+n06Jxc4c3p9TBFfaSiaEPx5FmI=",
        "public_key":
            "BDYfET6GOWSTizMYIRfcthw2MKksTpg+f8LR0ndq6fRxOLfhT7d1IjvwkvV0LzlzHuGat8SF9unNwhA3alpQ8So=",
        },
    },
}
``` 

```ts
import { verifyAnswers } from 'keypair-lib'

const answers = {
    question1: "Paris",
    question2: "ScoobyDoo",
    question3: "Amsterdam",
    question4: "null",
    question5: "null",
};
const PBKDF = "qf3skXnPGFMrE28UJS7S8BdT8g==";
const publicKey =
    "BDYfET6GOWSTizMYIRfcthw2MKksTpg+f8LR0ndq6fRxOLfhT7d1IjvwkvV0LzlzHuGat8SF9unNwhA3alpQ8So=";
const username = "user";

const data = await verifyAnswers(answers, PBKDF, username, publicKey);
```
outcome:

```json
true
``` 
 