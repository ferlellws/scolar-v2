import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-test-users',
  templateUrl: './test-users.component.html',
  styleUrls: ['./test-users.component.scss']
})
export class TestUsersComponent implements OnInit {

  usersForm = new FormControl();
  users: Person[] = [];
  @Input() usersSelected : Person[] = [];

  @Output() emitChange: EventEmitter<Person[]> = new EventEmitter();

  constructor(
    private _usersService: UserService,
  ) { }

  async ngOnInit() {
    await this._usersService.getFunctionalResources()
    .subscribe(users => this.users = users);
    var selectedIDs: number[] = this.usersSelected.map(user => user.id!);
    true;//environment.consoleMessage(selectedIDs, "selectedIDs")
    this.usersForm.setValue(selectedIDs);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.usersSelected = changes.usersSelected.currentValue;
    var selectedIDs: number[] = this.usersSelected.map(user => user.id!);
    true;//environment.consoleMessage(selectedIDs, "selectedIDs")
    this.usersForm.setValue(selectedIDs);
  }

  onChangeSelect(){
    var selectedIDs: number [] = this.usersForm.value;
    this.usersSelected = this.users.filter(user => 
      {
        var userID: number = -1;
        if(user.id != null){
          userID = user.id;
        }
        return selectedIDs.includes(userID);

      });
    this.emitChange.emit(this.usersSelected)
  } 

  remove(id: number | undefined){
    this.usersSelected = this.usersSelected.filter(user => user.id != id);
    var selectedIDs: number [] = this.usersForm.value;
    this.usersForm.setValue( selectedIDs.filter( selectedID => selectedID != id));
    this.emitChange.emit(this.usersSelected)
  }

}
