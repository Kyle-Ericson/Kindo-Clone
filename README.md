# Kindo
A simple game about outsmarting your enemy.

## About
This game was developed for a school project using Node.js and ActionScript3. The goal is to learn how to send packets from server to client using various compression techniques.

## Protocol 
v0.0.1

### Packets from server


#### Join Packet - The Join response from the server.  

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|
|The packet type, JOIN|4|0|ascii|
|Response (0:Fail, 1:P1, 2:P2, 3:Spec)|1|4|uint8|
|Error Code|1|5|uint8|


#### Start Packet - When the server is ready to start the game.

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|
|Packet type, STRT|4|0|ascii|
|Status (0:Not ready, 1:Start Game)|1|4|uint8|

#### Update Packet - This packet updates the clients games.

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|
Packet type, UPDT|4|0|ascii|

#### Chat Packet - Broadcasts a chat messages.

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|
Packet type, CHAT|4|0|ascii|


### Packets from client

#### Join Packet - Join request packet.

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|

#### Chat Packet - When a chat is sent.

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|

#### Turn Packet - Sends the players turn information.

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|

#### End Turn Packet - Sends when the player is ready to end their turn.

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|
