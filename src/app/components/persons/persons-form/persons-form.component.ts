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
      await this.personsService.getPersonsId(this.data.id)
        .subscribe((res: any) => {
          this.person = res;
          this.initializeSelects();
          if (this.person.user != null) {
            this.personsGroup.patchValue({
              access: this.accessOption[1].id
            })
          }

      });
    }
  }

  initializeSelects() {
    this.selectVicePresidencies(this.person.position_area.area.vice_presidency_id);
  }

  selectVicePresidencies(vicePresidencyId: number) {
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
        });
  }


  async selectPositions(areaId: number) {
    await this.positionsService.getPositionsByArea(areaId)
    .subscribe((positions: any[]) => {
      this.positions = positions;
      this.personsGroup.patchValue({
        position_area_id: this.person.position_area.id
      });
    });
  }


  selectProfiles() {
    this.profilesService.getProfiles()
        .subscribe((profiles: Profile[]) => {
          this.profiles = profiles;
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
      email: null
    });
  }

  async createRegister() {
    var userID: any = null;

    if (this.personsGroup.get('access')!.value == 1) {
      let newUser = {
        first_name: this.personsGroup.get('first_name')!.value,
        last_name: this.personsGroup.get('last_name')!.value,
        //position_area_id: this.personsGroup.get('position_area_id')!.value,
        profile_id: this.personsGroup.get('profile_id')!.value,
        email: this.personsGroup.get('email')!.value,
        password: this.personsGroup.get('first_name')!.value.split(' ')[0] + "" + this.personsGroup.get('last_name')!.value.split(' ')[0] + "Koba",
        password_confirmation: this.personsGroup.get('first_name')!.value.split(' ')[0] + "" + this.personsGroup.get('last_name')!.value.split(' ')[0] + "Koba",
      }

      await this.userService.addUser(newUser)
        .subscribe((res: any) => {
          this.fButtonDisabled = false;
          if (res.is_success == true) {
            userID = res.data.user_created_id;
            let newPerson:any  = {
              first_name: this.personsGroup.get('first_name')!.value,
              last_name: this.personsGroup.get('last_name')!.value,
              email: this.personsGroup.get('email')!.value,
              semanal_hours: this.personsGroup.get('semanal_hours')!.value,
              position_area_id: this.personsGroup.get('position_area_id')!.value,
              profile_id: this.personsGroup.get('profile_id')!.value,
              user_id: userID,
              is_active: 1,
              is_delete: 0
            }

            this.personsService.addPerson(newPerson)
              .subscribe((res) => {
                this.fButtonDisabled = false;
                if (res.status == "created") {
                  this.openSnackBar(true, "Registro Creado", "");
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
          this.openSnackBar(false, "Este correo ya está asignado", "");
          });
      } else {
        let newPerson:any  = {
          first_name: this.personsGroup.get('first_name')!.value,
          last_name: this.personsGroup.get('last_name')!.value,
          email: this.personsGroup.get('email')!.value,
          semanal_hours: this.personsGroup.get('semanal_hours')!.value,
          position_area_id: this.personsGroup.get('position_area_id')!.value,
          profile_id: this.personsGroup.get('profile_id')!.value,
          is_active: 1,
          is_delete: 0
        }
        this.personsService.addPerson(newPerson)
          .subscribe((res) => {
            this.fButtonDisabled = false;
            if (res.status == "created") {
              this.openSnackBar(true, "Registro Creado", "");
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
    
    this.userService.getUsers()
      .subscribe(users => {
        let flag = false;
        let userID: any = null;
        
        if (this.personsGroup.get('email')!.value != null) {
          for (let index = 0; index < users.length; index++) {
            if (users[index].email == this.personsGroup.get('email')!.value) {
              flag = true;
              userID = users[index].id;
              break;
            }
          }
        }

        if (this.personsGroup.get('access')!.value == 1 && flag == false) {
          let newUser:any = {
            first_name: this.personsGroup.get('first_name')!.value,
            last_name: this.personsGroup.get('last_name')!.value,
            //position_area_id: this.personsGroup.get('position_area_id')!.value,
            profile_id: this.personsGroup.get('profile_id')!.value,
            email: this.personsGroup.get('email')!.value,
            password: this.personsGroup.get('first_name')!.value.split(' ')[0] + "" + this.personsGroup.get('last_name')!.value.split(' ')[0] + "Koba",
            password_confirmation: this.personsGroup.get('first_name')!.value.split(' ')[0] + "" + this.personsGroup.get('last_name')!.value.split(' ')[0] + "Koba",
          }

          this.personsService.getPersonsId(this.data.id)
            .subscribe(p => {
              if(p.user == null) {
                this.userService.addUser(newUser)
                .subscribe((res: any) => {
                  this.fButtonDisabled = false;
                  if (res.is_success == true) {
                    let newPerson:any  = {
                      first_name: this.personsGroup.get('first_name')!.value,
                      last_name: this.personsGroup.get('last_name')!.value,
                      email: this.personsGroup.get('email')!.value,
                      semanal_hours: this.personsGroup.get('semanal_hours')!.value,
                      position_area_id: this.personsGroup.get('position_area_id')!.value,
                      profile_id: this.personsGroup.get('profile_id')!.value,
                      user_id: res.data.user_created_id
                    }
                    this.personsService.updatePerson(newPerson, this.data.id)
                    .subscribe((res) => {
                      this.fButtonDisabled = false;
                      if (res.status == "created") {
                        this.openSnackBar(true, "Registro modificado", "");
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
                this.userService.updateUser(newUser, p.user.id)
                .subscribe((res: any) => {
                  this.fButtonDisabled = false;
                  if (res.is_success == true) {
                    let newPerson:any  = {
                      first_name: this.personsGroup.get('first_name')!.value,
                      last_name: this.personsGroup.get('last_name')!.value,
                      email: this.personsGroup.get('email')!.value,
                      semanal_hours: this.personsGroup.get('semanal_hours')!.value,
                      position_area_id: this.personsGroup.get('position_area_id')!.value,
                      profile_id: this.personsGroup.get('profile_id')!.value,
                      user_id: res.data.user_created_id
                    }
                    this.personsService.updatePerson(newPerson, this.data.id)
                    .subscribe((res) => {
                      this.fButtonDisabled = false;
                      if (res.status == "created") {
                        this.openSnackBar(true, "Registro modificado", "");
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
              }
            });

          
        } else if (this.personsGroup.get('access')!.value == 1 && flag == true ) {
          this.personsService.getPersonsId(this.data.id)
            .subscribe(p => {
              if(p.email == this.personsGroup.get('email')?.value) {
                this.personsService.updatePerson(this.personsGroup.value, this.data.id )
                .subscribe((res) => {
                  this.fButtonDisabled = false;
                  if (res.status == "created") {
                    let updateUser: any = {
                      first_name: this.personsGroup.get('first_name')!.value,
                      last_name: this.personsGroup.get('last_name')!.value,
                      email: this.personsGroup.get('email')!.value,
                      //position_area_id: this.personsGroup.get('position_area_id')!.value,
                      profile_id: this.personsGroup.get('profile_id')!.value,
                    }
                    this.userService.updateUser(updateUser, p.user.id)
                    .subscribe((res: any) => {
                      this.openSnackBar(true, "Registro Modificado", "");
                      this.onReset();
                    });
                  }
                });
              } else {
                this.openSnackBar(false, "Este correo ya fue asignado a otra persona", "");
                this.fButtonDisabled = false;
              }
            })

        } else if (this.personsGroup.get('access')!.value == 0 && flag == true) {
          let newPerson:any  = {
            first_name: this.personsGroup.get('first_name')!.value,
            last_name: this.personsGroup.get('last_name')!.value,
            email: this.personsGroup.get('email')!.value,
            semanal_hours: this.personsGroup.get('semanal_hours')!.value,
            position_area_id: this.personsGroup.get('position_area_id')!.value,
            profile_id: this.personsGroup.get('profile_id')!.value,
            user_id: null
          }
          this.personsService.updatePerson(newPerson, this.data.id)
          .subscribe((res) => {
            this.fButtonDisabled = false;
            if (res.status == "created") {
              this.openSnackBar(true, "Registro modificado", "");
              this.onReset();
              this.userService.deleteUser(userID)
                .subscribe(res =>{
                  true;
                })
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
      });
    

    // this.personsService.updatePerson(
    //   this.personsGroup.value,
    //   this.data.id
    // )
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
      } else {
        this.isChecked = this.isChecked;
      }
    });
  }

}
