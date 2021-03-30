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
      vicePresidency: [null, Validators.required],
      area: [null, Validators.required],
      subArea: [null],
      position_area_id: [null, Validators.required],
      profile_id: [null, Validators.required],
    });

    if (this.data.mode == 'edit') {
      environment.consoleMessage(">>>>>>>>>>>>>>>>> Edicion");
      // this.openVicepresidencies(true, );
      // this.openAreas(true);
      // this.openPosition(true);
      // this.openProfiles(true);

      await this.userService.getUsersId(this.data.id)
        .subscribe((res: any) => {
          environment.consoleMessage(res, "usuario");
          this.user = res;

          environment.consoleMessage(this.user.position_area, "area");

          this.initializeSelects();

      });
    }
  }

  initializeSelects() {
    this.selectVicePresidencies(this.user.position_area.area.vice_presidency_id);
  }

  selectVicePresidencies(vicePresidencyId: number) {
    environment.consoleMessage("->  Entra a selectVicePresidencies")
    this.vicePresidenciesService.getVicePresidenciesSelect()
      .subscribe((vicePresidencies: VicePresidency[]) => {
        this.vicePresidencies = vicePresidencies;

        this.selectAreasByVicePresidency(vicePresidencyId);
        this.selectProfiles();

        this.usersGroup.patchValue({
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          email: this.user.email,
          semanal_hours: this.user.semanal_hours,
          profile_id: this.user.profile?.id,
          vicePresidency: this.user.position_area.area.vice_presidency_id
        });

      });
  }

  async selectAreasByVicePresidency(vicePresidencyId: number) {
    this.areasService.getAreasByVicePresidency(vicePresidencyId)
        .subscribe((areas: Area[]) => {
          this.areas = areas;

          if (this.areas.find(area => this.user.position_area.area.id === area.id)) {
            console.log("Tiene area");
            this.areaId = this.user.position_area.area.id;
            this.selectSubAreasByArea(this.areaId);

            // INICIALIZAR EL CAMPO AREA DEL FORMULARIO
            this.usersGroup.patchValue({
              area: this.areaId,
            });

            this.selectPositions(this.areaId);
          } else {
            if (this.user.position_area.area.id > 0) {
              console.log("Tiene subarea");
              this.subAreaId = this.user.position_area.area.id;

              this.areasService.getParentSubArea(this.subAreaId)
                .subscribe((area: Area) => {
                  this.areaId = area.id;

                  // INICIALIZAR EL CAMPO AREA DEL FORMULARIO
                  this.usersGroup.patchValue({
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
          this.usersGroup.patchValue({
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
      environment.consoleMessage(this.user.position_area.id, "position_area-id: ");

      this.usersGroup.patchValue({
        position_area_id: this.user.position_area.id
      });
    });
  }


  selectProfiles() {
    this.profilesService.getProfiles()
        .subscribe((profiles: Profile[]) => {
          this.profiles = profiles;

          environment.consoleMessage(this.user.profile?.id, "this.user.profile?.id: ")

          this.usersGroup.patchValue({
            profile_id: this.user.profile?.id,
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
      this.usersGroup.get('area')!.setValue(null);
      await this.areasService.getAreasByVicePresidency(this.usersGroup.get('vicePresidency')!.value)
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
      this.usersGroup.get('subArea')!.setValue(null);
      await this.areasService.getSubAreasByArea(this.usersGroup.get('area')!.value)
        .subscribe((subAreas: Area[]) =>{
          this.subAreas = subAreas;
          environment.consoleMessage(this.subAreas, "SubAreas: Open");
        });
    }
  }

  async openPosition(ev: boolean) {
    if(ev) {
      this.usersGroup.get('position_area_id')?.setValue(null);
      if (this.usersGroup.get('area')!.value != null){
        var area_id = this.usersGroup.get('area')!.value;
        if(this.usersGroup.get('subArea')!.value != null) {
          area_id = this.usersGroup.get('subArea')!.value;
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
    let newUser = {
      first_name: this.usersGroup.get('first_name')!.value,
      last_name: this.usersGroup.get('last_name')!.value,
      email: this.usersGroup.get('email')!.value,
      semanal_hours: this.usersGroup.get('semanal_hours')!.value,
      position_area_id: this.usersGroup.get('position_area_id')!.value,
      profile_id: this.usersGroup.get('profile_id')!.value,
      password: this.usersGroup.get('first_name')!.value.split(' ')[0] + "" + this.usersGroup.get('last_name')!.value.split(' ')[0] + "Koba",
      password_confirmation: this.usersGroup.get('first_name')!.value.split(' ')[0] + "" + this.usersGroup.get('last_name')!.value.split(' ')[0] + "Koba",
    }

    await this.userService.addUser(newUser)
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
          true;//environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");

      });

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
