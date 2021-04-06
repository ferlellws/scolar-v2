import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Area } from 'src/app/models/area';
import { Person } from 'src/app/models/person';
import { Position } from 'src/app/models/position';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { VicePresidency } from 'src/app/models/vice-presidency';
import { AreasService } from 'src/app/services/areas.service';
import { PersonsService } from 'src/app/services/persons.service';
import { PositionsService } from 'src/app/services/positions.service';
import { ProfilesService } from 'src/app/services/profiles.service';
import { UserService } from 'src/app/services/user.service';
import { VicePresidenciesService } from 'src/app/services/vice-presidencies.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-general-users-form',
  templateUrl: './general-users-form.component.html',
  styleUrls: ['./general-users-form.component.scss']
})
export class GeneralUsersFormComponent implements OnInit {
  showBtnClose: boolean = true;

  usersGroup!: FormGroup;
  personControl = new FormControl();
  filterPersons!: Observable<Person[]>;

  pluralOption: string = "Usuarios";
  singularOption: string = "Usuario";
  isButtonReset: boolean = false;

  //selectCompanyType!: CompanyType [];
  fButtonDisabled: boolean = false;

  user!: User;
  persons: any [] = [];
  vicePresidencies: VicePresidency [] = [];
  areas: Area[] = [];
  subAreas: Area[] = [];
  positions: any[] = [];
  profiles: Profile[] = [];
  position_area_id: any[] = [];
  areaId!: number;
  subAreaId!: number;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService,
    private personsService: PersonsService,
    private snackBar: MatSnackBar,
    private vicePresidenciesService: VicePresidenciesService,
    private areasService: AreasService,
    private positionsService:PositionsService,
    private profilesService:ProfilesService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.personsService.getWithoutAccess()
      .subscribe((person: Person[]) => {
        this.persons = person;
      });

    this.filterPersons = this.personControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.full_name),
      map(name => name ? this._filter(name) : this.persons.slice())
    );

    this.usersGroup = this.fb.group({
      person_id: [null],
      email: [null, [
                    Validators.required,
                    Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"),
                    Validators.email]
                  ],
      
    });

    if (this.data.mode == 'edit') {
      environment.consoleMessage(">>>>>>>>>>>>>>>>> Edicion");

      await this.userService.getUsersId(this.data.id)
        .subscribe((res: any) => {
          environment.consoleMessage(res, "usuario");
          this.user = res;

          environment.consoleMessage(this.user.position_area, "area");

          //this.initializeSelects();

      });
    }
  }

  displayFn(person: Person): string {
    return person && person.full_name ? person.full_name : '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.persons.filter(person => person.full_name.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit() {
    if (!this.isButtonReset) {
      this.fButtonDisabled = true;
      if (this.data.mode == 'create') {
        this.createRegister();
      } else {
        this.updateRegister();
      }
    }
  }

  onReset() {
    this.isButtonReset = true;
    this.usersGroup.patchValue({
      first_name: null,
      last_name: null,
      email: null,
      semanal_hours: null,
      vicePresidency: null,
      area: null,
      subArea: [null],
      position_area_id: null,
      profile_id: null,
    });
  }

  async createRegister() {
    
    environment.consoleMessage(this.personControl.value, "FORMCONTROLLLLLL");
    environment.consoleMessage(this.personControl.value.id, "ID PERSON");

    // let newUser = {
    //   //user_id: this.usersGroup.get('')!.value,
    //   email: this.usersGroup.get('email')!.value,
    //   password: this.usersGroup.get('first_name')!.value.split(' ')[0] + "" + this.usersGroup.get('last_name')!.value.split(' ')[0] + "Koba",
    //   password_confirmation: this.usersGroup.get('first_name')!.value.split(' ')[0] + "" + this.usersGroup.get('last_name')!.value.split(' ')[0] + "Koba",
    // }

    // await this.userService.addUser(newUser)
    //   .subscribe((res) => {
    //     this.fButtonDisabled = false;
    //     if (res.is_success == true) {
    //       this.openSnackBar(true, res.messages, "");
    //       this.onReset();
    //     }
    //   }, (err) => {
    //     this.fButtonDisabled = false;
    //     let aErrors: any[] = [];
    //     for(let i in err.error) {
    //       aErrors = aErrors.concat(err.error[i])
    //     }

    //     let sErrors: string = "";
    //     aErrors.forEach((err) => {
    //       sErrors += "- " + err + "\n";
    //     })

    //     this.openSnackBar(false, sErrors, "");

    //   });

  }

  updateRegister() {
    environment.consoleMessage(this.usersGroup.value, "this.usersGroup.value: ");
    environment.consoleMessage(this.data.id, "this.data.id: ");
    this.userService.updateUser(
      this.usersGroup.value,
      this.data.id
    )
      .subscribe((res) => {
        this.fButtonDisabled = false;
        if (res.is_success == true) {
          this.openSnackBar(true, res.messages, "");
          this.onReset();
        }
      }, (err) => {
        this.fButtonDisabled = false;
        let aErrors: any[] = [];
        for(let i in err.error) {
          aErrors = aErrors.concat(err.error[i])
        }

        let sErrors: string = "";
        aErrors.forEach((err) => {
          sErrors += "- " + err + "\n";
        })

        this.openSnackBar(false, sErrors, "");
      });
  }

  openSnackBar(succes: boolean, message: string, action: string, duration: number = 3000) {
    var panelClass = "succes-snack-bar";
    if(!succes){
      panelClass  = "error-snack-bar";
    }
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }

  getMessageError(field: string, labelField: string): string {
    let message!: string;

    if (this.usersGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    if(labelField == "correo") {
      if (this.usersGroup.get(field)?.errors?.pattern) {
        message = `Por favor, ingrese un ${labelField} válido`
      }
    }

    return message;
  }

}
