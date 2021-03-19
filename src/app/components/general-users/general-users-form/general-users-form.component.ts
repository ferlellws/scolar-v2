import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Area } from 'src/app/models/area';
import { Position } from 'src/app/models/position';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { VicePresidency } from 'src/app/models/vice-presidency';
import { AreasService } from 'src/app/services/areas.service';
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
  pluralOption: string = "Usuarios";
  singularOption: string = "Usuario";
  isButtonReset: boolean = false;

  //selectCompanyType!: CompanyType [];
  fButtonDisabled: boolean = false;

  user!: User;
  vicepresidencies: VicePresidency [] = [];
  areas: Area[] = [];
  subAreas: Area[] = [];
  positions: Position[] = [];
  profiles: Profile[] = [];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private vicePresidenciesService: VicePresidenciesService,
    private areasService: AreasService,
    private positionsService:PositionsService,
    private profilesService:ProfilesService,
  ) { }

  async ngOnInit(): Promise<void> {
    true;//environment.consoleMessage(this.data, "++++++++++");
    this.usersGroup = this.fb.group({
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
      vicepresidency: [null, Validators.required],
      area: [null, Validators.required],
      subArea: [null],
      position: [null, Validators.required],
      profile: [null, Validators.required],
      is_active: true
    });

    //await this.getSelectCompanyTypes();
    // if (this.data.mode == 'edit') {

    //   this.userService.getUsersId(this.data.id)
    //     .subscribe((res: User) => {
    //       this.user = res;
    //       this.usersGroup.patchValue({
    //         first_name: this.user.first_name,
    //         last_name: this.user.last_name,
    //         email: this.user.email,
    //         semanal_hours: this.user.semanal_hours,
    //         vicepresidency: ,
    //         area: ,
    //         subArea: ,
    //         position_id: this.user.position_id,
    //         profile_id: this.user.profile_id,
    //         is_active: this.user.is_active
    //       });
    //     });
    // }
  }
    
  openVicepresidencies(ev: boolean) {
    this.areas = [];
    if(ev) {
      this.vicePresidenciesService.getVicePresidenciesSelect()
        .subscribe((vicepresidencies: VicePresidency[]) => this.vicepresidencies = vicepresidencies);
    } else {
      this.usersGroup.get('area')!.setValue(null);
      this.usersGroup.get('subArea')!.setValue(null);
      this.usersGroup.get('position')!.setValue(null);

      this.areasService.getAreasSelect()
        .subscribe((areas: Area[]) => {
          for (let index = 0; index < areas.length; index++) {
            if(areas[index].vice_presidency?.id == this.usersGroup.get('vicepresidency')!.value && areas[index].parent == null) {
              this.areas.push(areas[index]);
            }
          }
        });

      // this.areasService.getSubAreas()
      //   .subscribe((subAreas: Area[]) => {
      //     for (let index = 0; index < subAreas.length; index++) {
      //       if(subAreas[index].parent != null) {
      //         if(subAreas[index].parent!.id == this.usersGroup.get('area')!.value) {
      //           this.subAreas.push(subAreas[index]);
      //         }
      //       }

      //     }
      //   });

      // var area_id = this.usersGroup.get('area')!.value;
      // if(this.usersGroup.get('subArea')!.value != null) {
      //   area_id = this.usersGroup.get('subArea')!.value;
      // }
      // this.positionsService.getPositions(area_id)
      //   .subscribe((positions: Position[]) => {
      //     this.positions = positions
      //   });
    }
  }

  openAreas(ev: boolean) {
    this.subAreas = [];
    this.positions = [];
    if(ev) {
      this.usersGroup.get('area')!.setValue(null);
      this.areasService.getAreasSelect()
        .subscribe((areas: Area[]) =>{
          for (let index = 0; index < areas.length; index++) {
            if(areas[index] == this.usersGroup.get('vicepresidency')!.value) {
              this.areas.push(areas[index]);
            }
          }
        });
    } else {
      // this.usersGroup.get('subArea')!.setValue(null);
      // this.usersGroup.get('position')!.setValue(null);

      // this.areasService.getAreasSelect()
      //   .subscribe((subAreas: Area[]) => {
      //     for (let index = 0; index < subAreas.length; index++) {
      //       if(subAreas[index].parent != null) {
      //         if(subAreas[index].parent!.id == this.usersGroup.get('area')!.value) {
      //           this.subAreas.push(subAreas[index]);
      //         }
      //       }
      //     }
      //   });
      
      // this.positionsService.getPositions(this.usersGroup.get('vicepresidency')!.value)
      //   .subscribe((positions: Position[]) => {
      //     for (let index = 0; index < positions.length; index++) {
      //       if(positions[index] == this.usersGroup.get('vicepresidency')!.value) {
      //         this.positions.push(positions[index]);
      //       }
      //     }
      //   });
    }
  }

  openSubAreas(ev: boolean) {
    this.positions = [];
    if(ev) {
      this.usersGroup.get('subArea')!.setValue(null);
      this.areasService.getSubAreas()
        .subscribe((subAreas: Area[]) =>{
          this.subAreas = [];
          for (let index = 0; index < subAreas.length; index++) {
            if(subAreas[index].parent != null) {
              if(subAreas[index].parent!.id == this.usersGroup.get('area')!.value) {
                this.subAreas.push(subAreas[index]);
              }
            }
          }
        });
    } else {
      // this.positionsService.getPositions(this.usersGroup.get('area')!.value)
      //   .subscribe((positions: Position[]) => {
      //     this.positions = positions;
      //   });
    }
  }

  openPosition(ev: boolean) {
    if(ev) {
      this.usersGroup.get('position')?.setValue(null);
      if (this.usersGroup.get('area')!.value != null){
        var area_id = this.usersGroup.get('area')!.value;
        if(this.usersGroup.get('subArea')!.value != null) {
          area_id = this.usersGroup.get('subArea')!.value;
        }
        this.positionsService.getPositions(area_id)
          .subscribe((positions: Position[]) => {
            this.positions = positions;
          });
      } 
    }
  }

  openProfiles(ev: boolean) {
    if(ev) {
      this.profilesService.getProfiles()
        .subscribe((profiles: Profile[]) => {
          this.profiles = profiles;
        });
    }
  }

  onSubmit() {
    true;//environment.consoleMessage(this.usersGroup, "OnSubmit compañias: ");
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
      title: null,
      description: null,
      company_type_id: null,
      is_active: true
    });
  }

  createRegister() {
    var newUser: User = {
      first_name: this.usersGroup.get('first_name')!.value,
      last_name: this.usersGroup.get('last_name')!.value,
      email: this.usersGroup.get('email')!.value,
      semanal_hours: this.usersGroup.get('semanal_hours')!.value,
      position_id: this.usersGroup.get('position')!.value,
      profile_id: this.usersGroup.get('profile')!.value,
      password: this.usersGroup.get('first_name')!.value.split(' ')[0] + "" + this.usersGroup.get('last_name')!.value.split(' ')[0] + "Koba",
      password_confirmation: this.usersGroup.get('first_name')!.value.split(' ')[0] + "" + this.usersGroup.get('last_name')!.value.split(' ')[0] + "Koba",
    }
  
    this.userService.addUser(newUser)
      .subscribe((res) => {
        true;//environment.consoleMessage(res, "<<<<<<<<>>>>>>");
        this.fButtonDisabled = false;
        if (res.status == 'created') {
          this.openSnackBar(true, "Registro creado satisfactoriamente", "");
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
          true;//environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
      });
  }

  updateRegister() {
    true;//environment.consoleMessage(this.usersGroup, `updateRegister para registro con id ${this.data.id}: `);

    this.userService.updateUser(
      this.usersGroup.value,
      this.data.id
    )
      .subscribe((res) => {
        true;//environment.consoleMessage(res, "<<<<<<<<>>>>>>");
        this.fButtonDisabled = false;
        if (res.status == 'updated') {
          this.openSnackBar(true, "Registro actualizado satisfactoriamente", "");
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
          true;//environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
      });
  }

  onClickSelectJob() {
    //this.getSelectJobs();
  }

  getSelectJobs() {
    // this.companyTypesService.getCompaniesSelect()
    //   .subscribe((res: CompanyType []) => this.selectCompanyType = res);
  }

  onClickSelectProfile() {
    //this.getSelectJobs();
  }

  getSelectJProfiles() {
    // this.companyTypesService.getCompaniesSelect()
    //   .subscribe((res: CompanyType []) => this.selectCompanyType = res);
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
