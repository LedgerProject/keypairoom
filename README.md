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
  
 
 