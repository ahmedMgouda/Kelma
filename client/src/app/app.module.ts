import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';



import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthService } from './_services/auth.service';
import { MessageService } from './_services/message.service';
import { CanActivateViaAuthGuard } from './_services/authGuard.service';
import { SocketService } from './_services/socket.service';
import { StreamComponent } from './stream/stream.component';

const routes = [
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [
      CanActivateViaAuthGuard
    ]
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MessagesComponent,
    StreamComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthService,
    MessageService,
    SocketService,
    CanActivateViaAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
