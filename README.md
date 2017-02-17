# Plebs
_pleb_  
an ordinary person, especially one from the lower social classes.  
Origin: mid 17th century: originally plural, from Latin plebs . Later a shortened form of plebeian.

<br>

This game was developed for a school project using Node.js and ActionScript3. You control a bunch of plebs in a chess-like game. Also there is leapfrog...

<br>

## Protocol 
v0.0.1

<br>

### Packets from server


#### Join Packet - The Join response from the server.  

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|
|The packet type, JOIN|4|0|ascii|
|Response (0:Fail, 1:P1, 2:P2, 3:Spec)|1|4|uint8|
|Error Code|1|5|uint8|


<br>
#### Start Packet - When the server is ready to start the game.

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|
|Packet type, STRT|4|0|ascii|
|Status (0:Not ready, 1:Start Game)|1|4|uint8|

<br>
#### Update Packet - This packet updates the client's games.

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|
|Packet type, UPDT|4|0|ascii|
|Players turn|1|4|uint8|
|Winner|1|5|uint8|
|Cell status|1 * 30|6-35|uint8|

<br>
#### Chat Packet - Sends a chat messages.

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|
|Packet type, CHAT|4|0|ascii|
|Username length|1|4|uint8|
|username|?|5|ascii|
|message length|1|?|uint8|
|message|?|?|ascii|

<br>
<br>
<br>

### Packets from client

#### Join Packet - Join request packet.

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|
|The packet type, JOIN|4|0|ascii|
|Join as (1:Play, 2:Spec)|1|4|uint8|
|Game Id|1|5|uint8|
|Username Length|1|6|ascii|
|Username|?|7|ascii|

<br>
#### Host Packet - Host request packet.

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|
|The packet type, HOST|4|0|ascii|
|Username Length|1|4|ascii|
|Username|?|5|ascii|

<br>
#### Chat Packet - When a chat is sent.

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|
|Packet type, CHAT|4|0|ascii|
|Message size|1|4|uint8|
|Message|?|5|ascii|

<br>
#### Turn Packet - Sends the players turn information.

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|

<br>
#### End Turn Packet - Sends when the player is ready to end their turn.

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|
