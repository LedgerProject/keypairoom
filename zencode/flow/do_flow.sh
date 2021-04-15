#!/bin/bash

# path to your zenroom install
zenroom='/Users/SB/Software/Ledger/crypto/Zenroom_test/zenroom-osx.command'

client_input=client_input.data
key_derivation=key_derivation.keys
recreated_keypair=recreated_keypair.keys

# Hash questions and answers to send to the server to check these are the correct ones
${zenroom} -a client_start.data -z client_start.zen | jq '.' > ${client_input}

# Compare hashes and if successful give key
${zenroom} -a ${client_input} -k server_reply.keys -z server_reply.zen | jq '.' > ${key_derivation}

# Regenerate keypair
${zenroom} -a ${client_input} -k ${key_derivation} -z client_make_keypair.zen | jq '.' > ${recreated_keypair}

# Compare regenerated keypair to old one (this step is not performed in a real flow, it is for verification now)
${zenroom} -a old_keypair.data -k ${recreated_keypair} -z verify_keypair.zen | jq '.' 

