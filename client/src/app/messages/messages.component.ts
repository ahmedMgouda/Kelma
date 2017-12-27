import { Component, OnInit } from '@angular/core';
import { MessageService } from '../_services/message.service';
import { SocketService } from '../_services/socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthConfig } from 'angular2-jwt';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [MessageService, SocketService]
})
export class MessagesComponent implements OnInit {
  /*
  * UI related variables starts
  */
  private overlayDisplay = false;
  private selectedUserId = null;
  private selectedSocketId = null;
  private selectedUserName = null;
  /*
  * UI related variables ends
  */

  /*
  * Chat and message related variables starts
  */
  public username = null;
  private userId = null;
  private socketId = null;
  private chatListUsers = [];
  private message = '';
  private messages = [];
  /*
  * Chat and message related variables ends
  */


  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private socketService: SocketService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {


      /*
      * getting userID from URL using 'route.snapshot'
      */
      this.username =  this.authService.userName;
      this.userId =  this.authService.userId;

    if (this.userId === '' || typeof this.userId === 'undefined') {
      this.router.navigate(['/login']);
    } else {
          this.overlayDisplay = true;

          /*
      * making socket connection by passing UserId.
      */
          this.socketService.connectSocket(this.userId);

          /*
          * calling method of service to get the chat list.
          */
          this.socketService.getChatList(this.userId).subscribe(response => {

            if (!response.error) {

              if (response.singleUser) {

                /*
                * Removing duplicate user from chat list array.
                */
                if (this.chatListUsers.length > 0) {
                  this.chatListUsers = this.chatListUsers.filter(function (obj) {
                    return obj._id !== response.chatList._id;
                  });
                }

                /*
                * Adding new online user into chat list array
                */
                this.chatListUsers.push(response.chatList);

              } else if (response.userDisconnected) {
                this.chatListUsers = this.chatListUsers.filter(function (obj) {
                  return obj.socketId !== response.socketId;
                });
              } else {
                /*
                * Updating entire chatlist if user logs in.
                */
                this.chatListUsers = response.chatList;
              }
            } else {
              alert(`Chat list failure.`);
            }
          });


          /*
          * subscribing for messages statrts
          */
          const messagesArr = this.messages;
          this.socketService.receiveMessages().subscribe(response => {
            if (this.selectedUserId && this.selectedUserId === response.fromUserId) {
              messagesArr.push(response);
              setTimeout(() => {
                document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
              }, 100);
            }
          });
          /*
        * subscribing for messages statrts
        */

      }

  }


  /*
  * Method to select the user from the Chat list starts
  */

  selectedUser(user): void {
    this.selectedUserId = user._id;
    this.selectedSocketId = user.socketId;
    this.selectedUserName = user.userName;
    let messagesArr = this.messages;
    /*
    * calling method to get the messages
    */
    this.messageService.getMessages({ userId: this.userId, toUserId: this.selectedUserId }, (error, response) => {
      if (!response.error) {
        messagesArr = response.messages;
      }
    });
  }

  isUserSelected(userId: string): boolean {
    if (!this.selectedUserId) {
      return false;
    }
    return this.selectedUserId === userId ? true : false;
  }

  sendMessage(event) {

    if (event.keyCode === 13) {
      if (this.message === '' || this.message === null) {
        alert(`Message can't be empty.`);
      } else {

        if (this.message === '') {
          alert(`Message can't be empty.`);
        } else if (this.userId === '') {
          this.router.navigate(['/']);
        } else if (this.selectedUserId === '') {
          alert(`Select a user to chat.`);
        } else {
          const messagesArr = this.messages;
          const data = {
                fromUserId :  this.userId,
                message : (this.message).trim(),
                toUserId: this.selectedUserId,
                toSocketId : this.selectedSocketId,
                fromSocketId: this.socketId
          };
                messagesArr.push(data);

          setTimeout(() => {
            document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
          }, 100);

          /*
          * calling method to send the messages
          */
          this.message = null;
          this.socketService.sendMessage(data);
        }
      }
    }
  }
  receiveMessages() {
    const messagesArr = this.messages;

    this.socketService.receiveMessages().subscribe(response => {
      messagesArr.push(response);
    });
  }
  alignMessage(userId) {
    return this.userId === userId ? false : true;
  }


  logout() {
    this.socketService.logout({ userId: this.userId }).subscribe(response => {
      this.router.navigate(['/']); /* Home page redirection */
    });
  }
}



