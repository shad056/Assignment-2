import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AccountComponent} from './account/account.component';
import { ChannelComponent } from './channel/channel.component';
import { ChatComponent } from './chat/chat.component';
import { GroupComponent } from './group/group.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [{ path: 'login', component: LoginComponent }, { path: 'account', component: AccountComponent}, 
{path: 'profile', component: ProfileComponent},
{path: 'channelhistory/:channel',component: ChannelComponent}, {path: 'chat/:channel',component: ChatComponent}
,{path: 'group/:id',component: GroupComponent}, {path: 'user/:id',component: UserComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
