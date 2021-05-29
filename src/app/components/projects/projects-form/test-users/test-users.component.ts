import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
  users: any[] = [];
  @Input() usersSelected : Person[] = [];
  personControl = new FormControl();
  filterPersons!: Observable<Person[]>;

  @Output() emitChange: EventEmitter<Person[]> = new EventEmitter();

  constructor(
    private _usersService: UserService,
  ) { }

  async ngOnInit() {
    await this._usersService.getFunctionalResourcesSelect()
    .subscribe(users => {
      this.users = users;
      this.filterPersons = this.personControl.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value!.full_name),
        map(name => name ? this._filter(name) : this.users.slice())
      );
    });
    var selectedIDs: number[] = this.usersSelected.map(user => user.id!);
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

  displayFn(person: Person): string {
    return person && person.full_name ? person.full_name : '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(users => users.full_name.toLowerCase().indexOf(filterValue) === 0);
  }

  selected(){
    this.usersSelected.push(this.personControl.value);
    this.emitChange.emit(this.usersSelected);
    this.personControl.reset();
    this.filterPersons = this.personControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value!.full_name),
      map(name => name ? this._filter(name) : this.users.slice())
    );

  }
}
