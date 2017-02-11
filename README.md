# Kindo
A simple game about outsmarting your enemy.  

## Protocol v0.0.1

### Packets from server

JOIN - The JOIN response from the server.

        4       0         ascii   Packet type, JOIN.
        1       4         uint8   Result (0:Fail, 1:P1, 2:P2, 3:Spec)
        1       5         uint8   The Error code

STRT - When the server is ready to start the game.

        4       0         ascii   Packet type, STRT.
        1       4         uint8   Status (0:Not ready, 1:Start Game)

UPDT - Updates the state of the game board.

        4       0         ascii   Packet type, UPDT.

CHAT - Broadcasts a chat messages.

        4       0         ascii   Packet type, CHAT.


### Packets from client
JOIN
CHAT
MOVE
ENDT
