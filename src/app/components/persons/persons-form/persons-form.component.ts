import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioGroup } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { AlertDialogComponent } from '../../shared/alert-dialog/alert-dialog.component';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-general-users-form',
  templateUrl: './persons-form.component.html',
  styleUrls: ['./persons-form.component.scss']
})
export class PersonsFormComponent implements OnInit {
  showBtnClose: boolean = true;

  isChecked = false;
  accessOption: any = [
    {
      id: 0,
      name: "No"
    },
    {
      id: 1,
      name: "Si"
    }
  ]

  accessGroup!: MatRadioGroup;

  personsGroup!: FormGroup;
  pluralOption: string = "Personas";
  singularOption: string = "Persona";
  isButtonReset: boolean = false;

  fButtonDisabled: boolean = false;

  user!: User;
  person!: Person;
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
    public dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {

    this.personsGroup = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null,Validators.required],
      email: [null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"),
        Validators.email]
      ],
      semanal_hours: [null, [
                    Validators.required,
                    Validators.max(40),
                    Validators.min(0)]
                  ],
      vicePresidency: [null, Validators.required],
      area: [null, Validators.required],
      subArea: [null],
      position_area_id: [null, Validators.required],
      profile_id: [null, Validators.required],
      access: [null, Validators.required]
    });

    this.personsGroup.patchValue({
      access: this.accessOption[0].id
    })
    
    if (this.data.mode == 'edit') {
      environment.consoleMessage(this.data.id, ">>>>>>>>>>>>>>>>> Edicion");

      await this.personsService.getPersonsId(this.data.id)
        .subscribe((res: any) => {
          environment.consoleMessage(res, "PERSONA");
          this.person = res;

          environment.consoleMessage(this.person.position_area, "area");

          this.initializeSelects();

      });
    }
  }

  initializeSelects() {
    this.selectVicePresidencies(this.person.position_area.area.vice_presidency_id);
  }

  selectVicePresidencies(vicePresidencyId: number) {
    environment.consoleMessage("->  Entra a selectVicePresidencies")
    this.vicePresidenciesService.getVicePresidenciesSelect()
      .subscribe((vicePresidencies: VicePresidency[]) => {
        this.vicePresidencies = vicePresidencies;

        this.selectAreasByVicePresidency(vicePresidencyId);
        this.selectProfiles();

        this.personsGroup.patchValue({
          first_name: this.person.first_name,
          last_name: this.person.last_name,
          email: this.person.email,
          semanal_hours: this.person.semanal_hours,
          profile_id: this.person.profile?.id,
          vicePresidency: this.person.position_area.area.vice_presidency_id
        });

      });
  }

  async selectAreasByVicePresidency(vicePresidencyId: number) {
    this.areasService.getAreasByVicePresidency(vicePresidencyId)
        .subscribe((areas: Area[]) => {
          this.areas = areas;

          if (this.areas.find(area => this.person.position_area.area.id === area.id)) {
            console.log("Tiene area");
            this.areaId = this.person.position_area.area.id;
            this.selectSubAreasByArea(this.areaId);

            // INICIALIZAR EL CAMPO AREA DEL FORMULARIO
            this.personsGroup.patchValue({
              area: this.areaId,
            });

            this.selectPositions(this.areaId);
          } else {
            if (this.person.position_area.area.id > 0) {
              console.log("Tiene subarea");
              this.subAreaId = this.person.position_area.area.id;

              this.areasService.getParentSubArea(this.subAreaId)
                .subscribe((area: Area) => {
                  this.areaId = area.id;

                  // INICIALIZAR EL CAMPO AREA DEL FORMULARIO
                  this.personsGroup.patchValue({
                    area: this.areaId,
                  });

                  this.selectSubAreasByArea(this.areaId);
                  this.selectPositions(this.subAreaId);
                })
            }
          }

          environment.consoleMessage(this.areas, "Areas: Open");
          environment.consoleMessage("+++++++++++Inicializa formulario");

          // INICIALIZAR EL CAMPO SUBAREA DEL FORMULARIO
          this.personsGroup.patchValue({
            subArea: this.subAreaId,
          });
        });
  }

  async selectSubAreasByArea(areaId: number) {
    await this.areasService.getSubAreasByArea(areaId)
        .subscribe((subAreas: Area[]) =>{
          this.subAreas = subAreas;
          environment.consoleMessage(this.subAreas, "subAreas: Open");
        });
  }


  async selectPositions(areaId: number) {
    await this.positionsService.getPositionsByArea(areaId)
    .subscribe((positions: any[]) => {
      this.positions = positions;

      environment.consoleMessage(this.positions, "positions: Open");
      environment.consoleMessage(this.person.position_area.id, "position_area-id: ");

      this.personsGroup.patchValue({
        position_area_id: this.person.position_area.id
      });
    });
  }


  selectProfiles() {
    this.profilesService.getProfiles()
        .subscribe((profiles: Profile[]) => {
          this.profiles = profiles;

          environment.consoleMessage(this.person.profile?.id, "this.person.profile?.id: ")

          this.personsGroup.patchValue({
            profile_id: this.person.profile?.id,
          });
        });
  }

  async openVicepresidencies(ev: any) {
    console.log(">>>openVicepresidencies: ", ev);

    this.areas = [];
    if(ev) {
      await this.vicePresidenciesService.getVicePresidenciesSelect()
        .subscribe((vicePresidencies: VicePresidency[]) => {
          this.vicePresidencies = vicePresidencies;
          // this.openAreas(false);
        });
    }
  }

  async openAreas(ev: any) {
    this.subAreas = [];
    this.positions = [];
    console.log("Entra a openAreas: ", ev);

    if(ev) {
      this.personsGroup.get('area')!.setValue(null);
      await this.areasService.getAreasByVicePresidency(this.personsGroup.get('vicePresidency')!.value)
        .subscribe((areas: Area[]) =>{
          this.areas = areas;
          environment.consoleMessage(this.areas, "Areas: Open");
        });
    }
  }

  async openSubAreas(ev: any) {
    console.log("Entra a openSubAreas: ", ev);
    this.positions = [];
    if(ev) {
      this.personsGroup.get('subArea')!.setValue(null);
      await this.areasService.getSubAreasByArea(this.personsGroup.get('area')!.value)
        .subscribe((subAreas: Area[]) =>{
          this.subAreas = subAreas;
          environment.consoleMessage(this.subAreas, "SubAreas: Open");
        });
    }
  }

  async openPosition(ev: boolean) {
    if(ev) {
      this.personsGroup.get('position_area_id')?.setValue(null);
      if (this.personsGroup.get('area')!.value != null){
        var area_id = this.personsGroup.get('area')!.value;
        if(this.personsGroup.get('subArea')!.value != null) {
          area_id = this.personsGroup.get('subArea')!.value;
        }
        await this.positionsService.getPositionsByArea(area_id)
          .subscribe((positions: any[]) => {
            this.positions = positions
          });
          environment.consoleMessage(this.positions, "Position: Open");
      }
    }
  }

  async openProfiles(ev: boolean) {
    if(ev) {
      await this.profilesService.getProfiles()
        .subscribe((profiles: Profile[]) => {
          this.profiles = profiles;
        });
    }
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
    this.personsGroup.patchValue({
      first_name: null,
      last_name: null,
      semanal_hours: null,
      vicePresidency: null,
      area: null,
      subArea: [null],
      position_area_id: null,
      profile_id: null,
    });
  }

  async createRegister() {
    var userID: any = null;

    if (this.personsGroup.get('access')!.value == 1) {
      let newUser = {
        email: this.personsGroup.get('email')!.value,
        password: this.personsGroup.get('first_name')!.value.split(' ')[0] + "" + this.personsGroup.get('last_name')!.value.split(' ')[0] + "Koba",
        password_confirmation: this.personsGroup.get('first_name')!.value.split(' ')[0] + "" + this.personsGroup.get('last_name')!.value.split(' ')[0] + "Koba",
      }

      await this.userService.addUser(newUser)
        .subscribe((res: any) => {
          this.fButtonDisabled = false;
          if (res.is_success == true) {
            this.openSnackBar(true, res.messages, "");
            //this.onReset();
            userID = res.data.user_created_id;
            environment.consoleMessage(userID,"USER ID");

            let newPerson:any  = {
              first_name: this.personsGroup.get('first_name')!.value,
              last_name: this.personsGroup.get('last_name')!.value,
              email: this.personsGroup.get('email')!.value,
              semanal_hours: this.personsGroup.get('semanal_hours')!.value,
              position_area_id: this.personsGroup.get('position_area_id')!.value,
              profile_id: this.personsGroup.get('profile_id')!.value,
              user_id: userID
            }

            this.personsService.addPerson(newPerson)
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
      } else {
        let newPerson:any  = {
        first_name: this.personsGroup.get('first_name')!.value,
        last_name: this.personsGroup.get('last_name')!.value,
        email: this.personsGroup.get('email')!.value,
        semanal_hours: this.personsGroup.get('semanal_hours')!.value,
        position_area_id: this.personsGroup.get('position_area_id')!.value,
        profile_id: this.personsGroup.get('profile_id')!.value,
      }
        this.personsService.addPerson(newPerson)
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

  }

  updateRegister() {
    this.personsService.updatePerson(
      this.personsGroup.value,
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

    if (this.personsGroup.get(field)?.errors?.required && labelField != "correo") {
      message = `Campo ${labelField} es requerido`
    }

    if(labelField == "correo") {
      if (this.personsGroup.get(field)?.errors?.pattern) {
        message = `Por favor, ingrese un ${labelField} válido`
      }
    }

    return message;
  }

  accessPerson(data: any) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirmación',
        question: `¿Esta seguro que desea dar acceso al aplicativo KOBAProject a esta persona?`,
        value: data.value
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      true;//environment.consoleMessage(result, 'The dialog was closed');
      if (result) {
        this.isChecked = !this.isChecked;
        environment.consoleMessage(this.personsGroup.get('access')!.value,"ACCES");
      } else {
        this.isChecked = this.isChecked;
      }
    });
  }

}
