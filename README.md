## Plebs
_pleb:_ an ordinary person, especially one from the lower social classes.  
Origin: mid 17th century: originally plural, from Latin plebs . Later a shortened form of plebeian.

<br>
### About
You control a bunch of plebs in a chess-like game. Also there is leapfrog...
This game was built using Node.js and Actionscript3. As a school project the main outcome was that we learn to send packets back and forth between a server and a client.

<br>
### How to play
To play, simply download everything and run the server use `node ./server/main.js` in the command line while in the Plebs directory. You must have node.js installed. Once the server is running run main.exe inside the client folder, and connect to the local server.

To play the game you click on the pleb you would like to move then click on the desired location. You may only move by leapfrogging and you may only leapfrog left, right, up, or down. Get one pleb to the other side to win.

<br>
### Protocol
v1.0.0

This is the protocol for sending packets back and forth. Size and offset are measured in bytes. The data is written into a packet and interpreted by following this protocol and parsing the data according to its size, offset and type. There are no special characters used to separate parts.

<br>
### Packets from server

#### Join Packet - The Join response from the server.

This is sent as a response to the join request from the client. This tells the client if they have any
errors in their username, and what type of user they joined as.

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|
|The packet type, JOIN|4|0|ascii|
|Response (0:Fail, 1:P1, 2:P2, 3:Spec)|1|4|uint8|
|Error Code|1|5|uint8|

<br>
#### Update Packet - This packet updates the client's games.

This updates the client's game state. This sends information about each cell in the game board
and who owns it as well as whose turn it is and if anyone has won the game or not.

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|
|Packet type, UPDT|4|0|ascii|
|Players turn|1|4|uint8|
|Winner|1|5|uint8|
|Cell status|1 each, * 30|6-35|uint8|

<br>
#### Chat Packet - Sends a chat messages.

This packet contains the information about a chat message to be broadcasted to all users in that
game. It contains the username and its length for parsing, along with the message and the message’s length.  

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|
|Packet type, CHAT|4|0|ascii|
|Username length|1|4|uint8|
|username|?|5|ascii|
|message length|1|?|uint8|
|message|?|?|ascii|

<br>
<br>
### Packets from client

#### Join Packet - Join request packet.

This is the join request packet. It sends desired information just as the user type(player or
spectator), the game id they want to join, and their username. The server will respond upon
receiving this packet.

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|
|The packet type, JOIN|4|0|ascii|
|Join as (1:Play, 2:Spec)|1|4|uint8|
|Game Id|1|5|uint8|
|Username Length|1|6|ascii|
|Username|?|7|ascii|

<br>
#### Host Packet - Host request packet.

Like the join request packet, this packet asks the server if it could start a new game session with
a new id. It also sends a requested username. The server will respond with a join packet upon
receiving this packet.

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|
|The packet type, HOST|4|0|ascii|
|Username Length|1|4|ascii|
|Username|?|5|ascii|

<br>
#### Chat Packet - When a chat is sent.

This packet sends desired chat information that they would like the server to broadcast to all
users. This contains the message along with its size. The server responds with its own chat
packet to all users in the game.

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|
|Packet type, CHAT|4|0|ascii|
|Message size|1|4|uint8|
|Message|?|5|ascii|

<br>
#### Move Packet - Sends the players turn information.

This packet contains the desired move a player would like to make. It contains the first cell
clicked, most likely a “pleb” that they want to move and a second cell for its desired location.
The server responds with an update packet.

| Descrption | Size | Offset | Type |
|:---|:---:|:---:|:---:|
|Packet type, MOVE|4|0|ascii|
|Cell 1|1|4|uint8|
|Cell 2|1|5|uint8|
