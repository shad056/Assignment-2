import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {dataModel} from './Models/dataModel';
import {HttpErrorResponse} from '@angular/common/http';
import { Subject } from "rxjs"; //Event Handler

@Injectable({
  providedIn: 'root'
})
export class MetaService {
//This service sends API requests to the server to match with the route and perform the business logic to read/write to the JSON files
  posts;
  
  constructor(private http: HttpClient) {
   }

 
Authenticate(uname,password) { //this route is used for authenticating a user
  var user = {username: uname, password: password};
  return this.http.post<dataModel>('http://localhost:3000/api/auth', user);
      }

LoadGroups(uname) { //this route is used for loading all available groups
  var user = {username: uname};
  return this.http.post<dataModel>('http://localhost:3000/api/groups', user);
}
FindChannel(group) { //this route is used for loading a particular channel within a group
  return this.http.post<dataModel>('http://localhost:3000/api/channels', {chosengroup: group});
}
AddGroup(group) { //this route is used for adding a new group
  return this.http.post<dataModel>('http://localhost:3000/api/creategroup',{newgroup: group});
}
AllGroups() { //this route is used for loading all the available groups
  return this.http.get<dataModel>('http://localhost:3000/api/getgroups');
}
AddChannel(group, channel) { //this route is used for adding a new channel
  return this.http.post<dataModel>('http://localhost:3000/api/createchannel',{group: group, channel: channel});
} 
AddChannelz(channel) { //this route is used for adding a new channel
  return this.http.post<dataModel>('http://localhost:3000/api/createchannelz',{channel: channel});
} 
AddUser(user,email,password) { //this route is used for adding a new user
  return this.http.post<dataModel>('http://localhost:3000/api/createuser',{user: user, email:email,password:password});
}
AllChannels() { //this route is used for loading all available channels
  return this.http.get<dataModel>('http://localhost:3000/api/getchannels');
}
AllUsers() { //this route is used for loading all available users
  return this.http.get<dataModel>('http://localhost:3000/api/getusers');
}
AddUsertoChannel(user,channel) { //this route is used for adding a user to a channel
  return this.http.post<dataModel>('http://localhost:3000/api/addusertochannel',{user: user, channel:channel});
}
RemoveGroup(group) { //this route is used for removing a particular group
  return this.http.post<dataModel>('http://localhost:3000/api/removegroup',{group: group});
}
RemoveChannel(channel) { //this route is used for removing a particular channel
  return this.http.post<dataModel>('http://localhost:3000/api/removechannel',{channel: channel});
}
RemoveChannelz(channel) { //this route is used for removing a particular channel
  return this.http.post<dataModel>('http://localhost:3000/api/removechannelz',{channel: channel});
}
RemoveChannelzz(channel) { //this route is used for removing a particular channel
  return this.http.post<dataModel>('http://localhost:3000/api/removechannelzz',{channel: channel});
}
RemoveUserfromChannel(user,channel) { //this route is used for removing a user from a channel
  return this.http.post<dataModel>('http://localhost:3000/api/removeuserfromchannel',{user:user,channel: channel});
}
RemoveUser(user) { //this route is used for removing a particular user
  return this.http.post<dataModel>('http://localhost:3000/api/removeuser',{user:user});
}
AssignUserGroupAssis(user,role) { //this route is used for assigning the user a role of group assis
  return this.http.post<any>('http://localhost:3000/api/assignusergroupassis',{user:user});
}
AssignUserRole(user,role) { //this route is used for assigning user a role
  return this.http.post<dataModel>('http://localhost:3000/api/assignuserrole',{user:user, role: role});
}
AddUsertoGroup(user,group) { //this route is used for adding user to a group
  return this.http.post<dataModel>('http://localhost:3000/api/addusertogroup',{user:user, group: group});
}
RemoveUserFromGroup(user,group) { //this route is used for removing user from a group
  return this.http.post<dataModel>('http://localhost:3000/api/removeuserfromgroup',{user:user, group: group});
}
RecordHistory(user,message, dateTime, channel) {
  return this.http.post<dataModel>('http://localhost:3000/api/recordhistory',{user:user,message:message,dateTime:dateTime,channel:channel});
} 
ShowHistory(channel) {
  return this.http.post<any>('http://localhost:3000/api/showhistory',{channel:channel});
} 
}
