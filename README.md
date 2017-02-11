# Kindo
A simple game about outsmarting your enemy.

<br>

## About
This game was developed for a school project using Node.js and ActionScript3. The goal is to learn how to send packets from server to client using various compression techniques. The game itself is a clone of another game, [Kindo](http://www.kindogame.fr/presskit/).

<br>

## Protocol 
v0.0.1

<br>

### Packets from server


#### Join Packet - The Join response from the server.  

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|
|The packet type, JOIN|4|0|ascii|
|Response (0:Fail, 1:P1, 2:P2, 3:Spec)|1|4|uint8|
|Error Code|1|5|uint8|

<br>
#### Start Packet - When the server is ready to start the game.

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|
|Packet type, STRT|4|0|ascii|
|Status (0:Not ready, 1:Start Game)|1|4|uint8|

<br>
#### Update Packet - This packet updates the client's games.

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|
Packet type, UPDT|4|0|ascii|

<br>
#### Chat Packet - Sends a chat messages.

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|
Packet type, CHAT|4|0|ascii|

<br>
<br>
<br>

### Packets from client

#### Join Packet - Join request packet.

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|

<br>
#### Chat Packet - When a chat is sent.

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|

<br>
#### Turn Packet - Sends the players turn information.

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|

<br>
#### End Turn Packet - Sends when the player is ready to end their turn.

| Descrption | Size | Offset | Type |
|:---:|:---:|:---:|:---:|
