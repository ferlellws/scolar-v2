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

  user!: any;
  vicepresidencies: VicePresidency [] = [];
  areas: Area[] = [];
  subAreas: Area[] = [];
  positions: any[] = [];
  profiles: Profile[] = [];
  position_area_id: any[] = [];

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
    });
    
    if (this.data.mode == 'edit') {
      this.openVicepresidencies(true);
      this.openAreas(true);
      this.openPosition(true);
      this.openProfiles(true);
      
      await this.userService.getUsersId(this.data.id)
        .subscribe((res: any) => {
          environment.consoleMessage(res, "usuario");
          this.user = res;
          
          environment.consoleMessage(this.user.position_area.area, "area");
          
          this.vicePresidenciesService.getVicePresidency(this.user.position_area.area.vice_presidency_id)
            .subscribe((vicepresidency: VicePresidency) => {
              environment.consoleMessage(vicepresidency, "vicepresidencia");
              
              if (this.user.position_area.area.parent_id != null) {
                this.areasService.getAreasId(this.user.position_area.area.parent_id)
                  .subscribe((subArea: Area) => {
                    environment.consoleMessage(subArea, "subárea");

                    this.usersGroup.patchValue({
                      first_name: this.user.first_name,
                      last_name: this.user.last_name,
                      email: this.user.email,
                      semanal_hours: this.user.semanal_hours,
                      profile: this.user.profile.id,
                      vicepresidency: vicepresidency.id,
                      area: this.user.position_area.area.id,
                      subArea: subArea.id,
                      position: this.user.position_area.position.id,
                    });
                  });

              } else {
                this.usersGroup.patchValue({
                  first_name: this.user.first_name,
                  last_name: this.user.last_name,
                  email: this.user.email,
                  semanal_hours: this.user.semanal_hours,
                  profile: this.user.profile.id,
                  vicepresidency: vicepresidency.id,
                  area: this.user.position_area.area.id,
                  subArea: null,
                  position: this.user.position_area.position.id,
                });
              }
          });
      });
    }
  }
    
  async openVicepresidencies(ev: boolean) {
    this.areas = [];
    if(ev) {
      await this.vicePresidenciesService.getVicePresidenciesSelect()
        .subscribe((vicepresidencies: VicePresidency[]) => this.vicepresidencies = vicepresidencies);
    } else {
      this.usersGroup.get('area')!.setValue(null);
      this.usersGroup.get('subArea')!.setValue(null);
      this.usersGroup.get('position')!.setValue(null);

      await this.areasService.getAreasSelect()
        .subscribe((areas: Area[]) => {
          for (let index = 0; index < areas.length; index++) {
            if(areas[index].vice_presidency?.id == this.usersGroup.get('vicepresidency')!.value && areas[index].parent == null) {
              this.areas.push(areas[index]);
            }
          }
        });
    }
  }

  async openAreas(ev: boolean) {
    this.subAreas = [];
    this.positions = [];
    if(ev) {
      this.usersGroup.get('area')!.setValue(null);
      await this.areasService.getAreasSelect()
        .subscribe((areas: Area[]) =>{
          for (let index = 0; index < areas.length; index++) {
            if (areas[index] == this.usersGroup.get('vicepresidency')!.value) {
              this.areas.push(areas[index]);
            }
          }
          environment.consoleMessage(this.areas, "Areas: Open");
        });
    }
  }

  async openSubAreas(ev: boolean) {
    this.positions = [];
    if(ev) {
      this.usersGroup.get('subArea')!.setValue(null);
      await this.areasService.getSubAreas()
        .subscribe((subAreas: Area[]) =>{
          this.subAreas = [];
          for (let index = 0; index < subAreas.length; index++) {
            if(subAreas[index].parent != null) {
              if(subAreas[index].parent!.id == this.usersGroup.get('area')!.value) {
                this.subAreas.push(subAreas[index]);
              }
            }
          }
          environment.consoleMessage(this.subAreas, "SubAreas: Open");
        });
    }
  }

  async openPosition(ev: boolean) {
    if(ev) {
      this.usersGroup.get('position')?.setValue(null);
      if (this.usersGroup.get('area')!.value != null){
        var area_id = this.usersGroup.get('area')!.value;
        if(this.usersGroup.get('subArea')!.value != null) {
          area_id = this.usersGroup.get('subArea')!.value;
        }
        await this.positionsService.getPositions(area_id)
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
    this.usersGroup.patchValue({
      first_name: null,
      last_name: null,
      email: null,
      semanal_hours: null,
      vicepresidency: null,
      area: null,
      subArea: [null],
      position: null,
      profile: null,
    });
  }

  async createRegister() {
    var newUser: User = {
      first_name: this.usersGroup.get('first_name')!.value,
      last_name: this.usersGroup.get('last_name')!.value,
      email: this.usersGroup.get('email')!.value,
      semanal_hours: this.usersGroup.get('semanal_hours')!.value,
      position_area_id: this.usersGroup.get('position')!.value,
      profile_id: this.usersGroup.get('profile')!.value,
      password: this.usersGroup.get('first_name')!.value.split(' ')[0] + "" + this.usersGroup.get('last_name')!.value.split(' ')[0] + "Koba",
      password_confirmation: this.usersGroup.get('first_name')!.value.split(' ')[0] + "" + this.usersGroup.get('last_name')!.value.split(' ')[0] + "Koba",
    }
  
    await this.userService.addUser(newUser)
      .subscribe((res) => {
        this.fButtonDisabled = false;
        if (res.is_success == true) {
          this.openSnackBar(true, "Registro creado satisfactoriamente", "");
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
          true;//environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
        
      });
    
  }

  updateRegister() {
    
    this.userService.updateUser(
      this.usersGroup.value,
      this.data.id
    )
      .subscribe((res) => {
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
