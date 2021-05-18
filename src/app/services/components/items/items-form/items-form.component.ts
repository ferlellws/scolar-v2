import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

// MODELS
import { ComponentModel } from 'src/app/models/component-model';
import { User } from 'src/app/models/user';
import { Company } from 'src/app/models/company';
import { Color } from 'src/app/models/color';
import { ItemPriority } from 'src/app/models/item-priority';
import { ItemResolution } from 'src/app/models/item-resolution';
import { ItemSeverity } from 'src/app/models/item-severity';

//Servicios
import { UserService } from 'src/app/services/user.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { ColorsService } from 'src/app/services/colors.service';
import { ComponentsService } from 'src/app/services/projects/components.service';
import { ItemSeveritiesService } from 'src/app/services/item-severities.service';
import { ItemResolutionsService } from 'src/app/services/item-resolutions.service';
import { ItemPrioritiesService } from 'src/app/services/item-priorities.service';
import { ItemsService } from 'src/app/services/items.service';
import { ItemTypeService } from 'src/app/services/item-type.service';
import { IconsService } from 'src/app/services/icons.service';
import { Icon } from 'src/app/models/icon';
import { TemporalItemsService } from 'src/app/services/temporal-items.service';
import { ItemStatusService } from 'src/app/services/item-status.service';
import { DatePipe } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'tecno-items-form',
  templateUrl: './items-form.component.html',
  styleUrls: ['./items-form.component.scss']
})
export class ItemsFormComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  //Informacion obtenida de los servicios
  companies: Company[] = [];
  developersCompanies: Company[] = [];
  components: ComponentModel[] = [];
  itemSeverities: ItemSeverity[] = [];
  itemResolutions: ItemResolution[] = [];
  users: User[] = [];
  itemPriorities: ItemPriority[] = [];
  itemTypes: any[] = [];
  itemStatus: any[] = [];
  selectedStatus: number;
  requiredStart = '';
  requiredResolution = '';

  newItem:any;
  modificaciones: any = {};
  verificacionBasic: boolean = false;
  verificacionSpecific: boolean = false;
  verificacionTimesDates: boolean = false;

  colors: Color[] = [];

  basic: FormGroup;
  specific: FormGroup;
  timesDates: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  @Input() mode: string;
  @Input() labelAction: string;
  @Input() item: any;
  @Input() company_id: string;
  @Input() developer_company_id: string;
  @Input() project: any;
  @Input() showBtnClose: boolean = true;
  @Input() icons: Icon[];

  constructor(
    private fbB: FormBuilder,
    private fbE: FormBuilder,
    private fbDT: FormBuilder,
    private _companiesService: CompaniesService,
    private _componentsService: ComponentsService,
    private _itemSeveritiesService: ItemSeveritiesService,
    private _itemResolutionsService: ItemResolutionsService,
    private _userService: UserService,
    private _itemPrioritiesService: ItemPrioritiesService,
    private _itemsService: ItemsService,
    private _itemTypesService: ItemTypeService,
    private _iconsService: IconsService,
    private _itemStatusService: ItemStatusService,
    private _temporalItemsService: TemporalItemsService,
    //public dialogRef: MatDialogRef<ItemsFormComponent>,
    private _colorsService: ColorsService,
    public datepipe: DatePipe,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<ItemsFormComponent>,
  ) {

  }

  // constructor() {}

  ngOnInit(): void {
    this.selectedStatus = this.item.item_status_id;
    if (this.mode == 'create'){
      if (this.project.template.id == 1){
        this.selectedStatus = 1;
      } else {
        this.selectedStatus = 12;
      }
    }
    console.log(this.project.selectedStatus);
    console.log("Project: ", this.project);


    this.route.data.subscribe(
      data => {
        console.log("---------++++++++++", data);
        if (Object.keys(data).length > 0) {
          console.log("entro", data);
          this.icons = data.icons;
          this.project = data.project;
          this.companies = data.sponsorsCompanies;
          this.developersCompanies = data.developersCompanies;
          this.components = data.components;
          this.itemPriorities = data.itemPriorities;
          this.itemTypes = data.itemTypes;
          this.itemSeverities = data.itemSeverities;
          this.itemResolutions = data.itemResolutions;
          this.users = data.users;
          this.itemStatus = data.itemStatus;
        }

        console.log("-------> icons: ", this.icons);
        console.log("-------> project: ", this.project);
        console.log("-------> item: ", this.item);
        console.log("-------> statuses: ", this.itemStatus);



        // this._componentsService.getComponents()
        //   .subscribe(components => this.components = components);

        this.basic = this.fbB.group({
          hideRequired: this.hideRequiredControl,
          floatLabel: this.floatLabelControl,
          'projectControl': [this.project.id, [Validators.required]],
          'titleControl': [this.item.title, [Validators.required]],
          'itemDescriptionControl': [this.item.description, [Validators.required]],
          'itemPrioritiesControl': [this.item.item_priority_id, [Validators.required]],
          'companyControl': [this.item.company_id, [Validators.required]],
          'componentControl': [this.item.component_id, [Validators.required]],
        });
        // console.log("llegue con " + this.selectedStatus);
        console.log(">>>>>>>>>>>>>>>>>>>>>> this.item: ", this.item);

        this.specific = this.fbE.group({
          hideRequired: this.hideRequiredControl,
          floatLabel: this.floatLabelControl,
          'itemSeverityControl': [this.item.item_severity_id, [Validators.required]],
          'itemResolutionsControl': [this.item.item_resolution_id],
          'usersControl': [this.item.reported_by_id, [Validators.required]],
          'selectItemTypes': [this.item.item_type_id, [Validators.required]],
          'statusControl': [this.selectedStatus, [Validators.required]],
          'developerCompanyControl': [this.item.developer_company_id],
          'percentControl': [this.item.percent_complete],
        });

        this.timesDates = this.fbDT.group({
          hideRequired: this.hideRequiredControl,
          floatLabel: this.floatLabelControl,
          'hoursControl': [this.item.estimated_time?.hours],
          'minutesControl': [this.item.estimated_time?.minutes],
          'receptionDateControl': [new Date(this.item.reception_date + ':00:00'), [Validators.required]],
          'startDateControl': [new Date(this.item.start_date + ':00:00'), [Validators.required]],
          'dueDateControl': [new Date(this.item.due_date + ':00:00'), [Validators.required]],
          'realDueDateControl': [new Date(this.item.real_due_date + ':00:00')],
        });

        if (this.specific.get('statusControl').value == 17
          || this.specific.get('statusControl').value == 10
          || this.specific.get('statusControl').value == 9){
            this.requiredResolution = ' *';
        } else {
          this.requiredResolution = '';
        }

        if (this.specific.get('statusControl').value != 1 && this.specific.get('statusControl').value != 12){
          this.requiredStart = ' *';
        } else {
          this.requiredStart = '';
        }
      }
    );

    // this._companiesService.getCompanies()
    //   .subscribe(companies => this.companies = companies);
    // this._componentsService.getComponents()
    //   .subscribe(components => this.components = components);
    // this._itemStatusService.getItemStatus()
    //   .subscribe(itemStatus => this.itemStatus = itemStatus.filter(itemStatusObject => itemStatusObject.template_id == this.project.template.id));    ``
    // this._itemSeveritiesService.getItemSeverities()
    //   .subscribe(itemSeverities => this.itemSeverities = itemSeverities.filter(itemSeverity => itemSeverity.template_id == this.project.template.id));
    // this._itemResolutionsService.getItemResolutions()
    //   .subscribe(itemResolutions => this.itemResolutions = itemResolutions.filter(itemResolution => itemResolution.template_id == this.project.template.id));
    // this._userService.getUsers()
    //   .subscribe(users => this.users = users);
    // this._itemPrioritiesService.getItemPriorities()
    //   .subscribe(itemPriorities => this.itemPriorities = itemPriorities.filter(itemPriority => itemPriority.template_id == this.project.template.id));
    // this._itemTypesService.getItemTypes()
    //   .subscribe(itemTypes =>{
    //     this.itemTypes = itemTypes.filter(itemType => itemType.template_id == this.project.template.id);
    //     for (let index = 0; index < this.itemTypes.length; index++) {
    //       var icon = this.icons.filter(icon => icon.id == this.itemTypes[index].icon_id)[0];
    //       if (icon != null) {
    //         this.itemTypes[index].iconName =  icon.title;
    //       }
    //     }
    //   });



  }

  _openStatus(ev: boolean) {
    if (ev) {
      this._itemStatusService.getItemStatus(1)
        .subscribe(itemStatus => this.itemStatus = itemStatus);
    }
  }

  _openSponsorsCompanies(ev: boolean) {
    if (ev) {
      this._companiesService.getSponsorsCompanies()
        .subscribe(companies => this.companies = companies);
    }
  }

  _openComponents(ev: boolean) {
    if (ev) {
      this._componentsService.getComponents()
        .subscribe(components => this.components = components.filter(component => component.sponsor_company_id == this.basic.get('companyControl').value));
    }
  }

  _openDevelopersCompanies(ev: boolean) {
    if (ev) {
      this._companiesService.getDevelopersCompanies()
        .subscribe(developerCompanies => this.developersCompanies = developerCompanies);
    }
  }

  _openItemSeverities(ev: boolean) {
    if (ev) {
      this._itemSeveritiesService.getItemSeverities()
        .subscribe(itemSeverities => this.itemSeverities = itemSeverities.filter(itemSeverity => itemSeverity.template_id == this.project.template.id));
    }
  }

  _openItemResolutions(ev: boolean) {
    if (ev) {
      this._itemResolutionsService.getItemResolutions()
        .subscribe(itemResolutions => this.itemResolutions = itemResolutions.filter(itemResolution => itemResolution.template_id == this.project.template.id));
    }
  }

  _openUsers(ev: boolean) {
    if (ev) {
      this._userService.getUsers()
        .subscribe(users => this.users = users)
    }
  }

  _openItemPriorities(ev: boolean) {
    if (ev) {
      this._itemPrioritiesService.getItemPriorities()
        .subscribe(itemPriorities => this.itemPriorities = itemPriorities.filter(itemPriority => itemPriority.template_id == this.project.template.id));
    }
  }

  _openItemTypes(ev: boolean) {
    if (ev) {
      this._itemTypesService.getItemTypes()
      .subscribe(itemTypes =>{
          this.itemTypes = itemTypes.filter(itemType => itemType.template_id == this.project.template.id);
          for (let index = 0; index < this.itemTypes.length; index++) {
            var icon = this.icons.filter(icon => icon.id == this.itemTypes[index].icon_id)[0];
            if (icon != null) {
              this.itemTypes[index].iconName =  icon.title;
            }
          }
        }
      );
    }
  }

  getSelectedType() {
    var selected = this.itemTypes.filter(itemType => itemType.id == this.specific.get('selectItemTypes').value )[0];
    if (selected != null) {
      return selected;
    } else {
      return {};
    }

  }

  getSelectedStatus() {
    if (this.specific.get('statusControl').value != 1 && this.specific.get('statusControl').value != 12){
      this.requiredStart = ' *';
    } else {
      this.requiredStart = '';
    }
    if (this.specific.get('statusControl').value == 17
      || this.specific.get('statusControl').value == 10
      || this.specific.get('statusControl').value == 9){
        this.requiredResolution = ' *';
    } else {
      this.requiredResolution = '';
    }
    var selected = this.itemStatus.filter(status => status.id == this.specific.get('statusControl').value )[0];
    if (selected != null) {
      return selected;
    } else  {
      return {};
    }
  }

  getIcon(id) {
    if (id != null){

      var selected = this.icons.filter(icon => icon.id == id )[0];
      if (selected != null) {
        return selected;
      } else  {
        return {
          title: ''
        };
      }
    } else {
      return {
        title: ''
      };
    }
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }

  errorBasic(): boolean{

    var requireError: boolean = false;
    if (this.basic.get('titleControl').errors != null){
      if (this.basic.get('titleControl').errors.required){
        requireError = true;
      }
    }
    if (this.basic.get('itemDescriptionControl').errors != null){
      if (this.basic.get('itemDescriptionControl').errors.required){
        requireError = true;
      }
    }
    if (this.basic.get('itemPrioritiesControl').errors != null){
      if (this.basic.get('itemPrioritiesControl').errors.required){
        requireError = true;
      }
    }
    if (this.basic.get('companyControl').errors != null){
      if (this.basic.get('companyControl').errors.required){
        requireError = true;
      }
    }
    if (this.basic.get('componentControl').errors != null){
      if (this.basic.get('componentControl').errors.required){
        requireError = true;
      }
    }
    if (requireError){
      this.verificacionBasic = true;
    } else {
      this.verificacionBasic = false;
    }
    return requireError;
  }

  errorSpecific(): boolean{

    var requireError: boolean = false;

    if (this.specific.get('developerCompanyControl').errors != null){
      if (this.specific.get('developerCompanyControl').errors.required){
        requireError = true;
      }
    }
    if (this.specific.get('selectItemTypes').errors != null){
      if (this.specific.get('selectItemTypes').errors.required){
        requireError = true;
      }
    }
    if (this.specific.get('itemSeverityControl').errors != null){
      if (this.specific.get('itemSeverityControl').errors.required){
        requireError = true;
      }
    }
    /*if (this.specific.get('itemResolutionsControl').errors != null){
      if (this.specific.get('itemResolutionsControl').errors.required){
        requireError = true;
      }
    }*/

    if (this.specific.get('statusControl').value == 17
      || this.specific.get('statusControl').value == 10
      || this.specific.get('statusControl').value == 9){
        if (this.specific.get('itemResolutionsControl').value == null){
          requireError = true;
        }
    }

    if (this.specific.get('usersControl').errors != null){
      if (this.specific.get('usersControl').errors.required){
        requireError = true;
      }
    }

    if (this.specific.get('statusControl').errors != null){
      if (this.specific.get('statusControl').errors.required){
        requireError = true;
      }
    }
    if (requireError){
      this.verificacionSpecific = true;
    } else {
      this.verificacionSpecific = false;
    }
    return requireError;
  }

  errorTimesDates(): boolean{

    var requireError: boolean = false;

    if (this.timesDates.get('receptionDateControl').errors != null){
        requireError = true;
    }
    if (this.timesDates.get('dueDateControl').errors != null){
      if (this.specific.get('statusControl').value != 1 && this.specific.get('statusControl').value != 12){
        requireError = true;
      }
    }
    if (this.timesDates.get('startDateControl').errors != null){
      if (this.specific.get('statusControl').value != 1 && this.specific.get('statusControl').value != 12){
        requireError = true;
      }
    }
    if (requireError){
      this.verificacionTimesDates = true;
    } else {
      this.verificacionTimesDates = false;
    }
    return requireError;
  }

  guardarData(): void {
    if (this.errorBasic() || this.errorSpecific() || this.errorTimesDates()){

    } else {
      this.newItem = {
        title: this.basic.get('titleControl').value,
        description: this.basic.get('itemDescriptionControl').value,
        company_id: this.basic.get('companyControl').value,
        developer_company_id: this.specific.get('developerCompanyControl').value,
        project_id: this.project.id,
        component_id: this.basic.get('componentControl').value,
        item_type_id: this.specific.get('selectItemTypes').value,
        item_priority_id: this.basic.get('itemPrioritiesControl').value,
        item_severity_id: this.specific.get('itemSeverityControl').value,
        item_status_id: this.specific.get('statusControl').value,
        item_resolution_id: this.specific.get('itemResolutionsControl').value,
        reported_by_id: this.specific.get('usersControl').value,
        is_active: 1,
        user_creates_id: sessionStorage.id,
        user_updates_id: sessionStorage.id,
        percent_complete: this.specific.get('percentControl').value,
        estimate_hours: this.timesDates.get('hoursControl').value,
        estimate_minutes: this.timesDates.get('minutesControl').value,
        reception_date: this.parseDate(this.timesDates.get('receptionDateControl').value),
        start_date: this.parseDate(this.timesDates.get('startDateControl').value),
        due_date: this.parseDate(this.timesDates.get('dueDateControl').value),
        real_due_date: this.parseDate(this.timesDates.get('realDueDateControl').value),
      }
      this._itemsService.addItem(this.newItem);
      this.newItem = {};
      this.dialogRef.close();
    }


  }

  tempToItem(id: number): void {
    if (this.errorBasic() || this.errorSpecific() || this.errorTimesDates()){

    } else {
      this.newItem = {
        title: this.basic.get('titleControl').value,
        description: this.basic.get('itemDescriptionControl').value,
        company_id: this.basic.get('companyControl').value,
        project_id: this.project.id,
        component_id: this.basic.get('componentControl').value,
        developer_company_id: this.specific.get('developerCompanyControl').value,
        item_type_id: this.specific.get('selectItemTypes').value,
        item_priority_id: this.basic.get('itemPrioritiesControl').value,
        item_severity_id: this.specific.get('itemSeverityControl').value,
        item_status_id: this.specific.get('statusControl').value,
        item_resolution_id: this.specific.get('itemResolutionsControl').value,
        reported_by_id: this.specific.get('usersControl').value,
        is_active: 1,
        temporal_item_id: this.item.id,
        user_creates_id: sessionStorage.id,
        user_updates_id: sessionStorage.id,
        percent_complete : this.specific.get('percentControl').value,
        estimate_hours: this.timesDates.get('hoursControl').value,
        estimate_minutes: this.timesDates.get('minutesControl').value,
        reception_date: this.parseDate(this.timesDates.get('receptionDateControl').value),
        start_date: this.parseDate(this.timesDates.get('startDateControl').value),
        due_date: this.parseDate(this.timesDates.get('dueDateControl').value),
        real_due_date: this.parseDate(this.timesDates.get('realDueDateControl').value),
      }

      this._itemsService.createFromTemporal(this.newItem, id);
      this.newItem = {};
      //this.dialogRef.close();
    }
  }

  modificarData(): void {
    console.log("Entra modificarData");
    if (this.errorBasic() || this.errorSpecific() || this.errorTimesDates()){
      console.log("Hay un error");
    } else {
      var modificado = false;

      if (this.item.title != this.basic.get('titleControl').value) {
        this.modificaciones.title = this.basic.get('titleControl').value;
        modificado = true;
      }
      if (this.item.company_id != this.basic.get('companyControl').value) {
        this.modificaciones.company_id = this.basic.get('companyControl').value;
        modificado = true;
      }
      if (this.item.developer_company_id != this.specific.get('developerCompanyControl').value) {
        this.modificaciones.developer_company_id = this.specific.get('developerCompanyControl').value;
        modificado = true;
      }
      if (this.item.description != this.basic.get('itemDescriptionControl').value) {
        this.modificaciones.description = this.basic.get('itemDescriptionControl').value;
        modificado = true;
      }
      if (this.item.component_id != this.basic.get('componentControl').value) {
        this.modificaciones.component_id = this.basic.get('componentControl').value;
        modificado = true;
      }
      if (this.item.item_severity_id != this.specific.get('itemSeverityControl').value) {
        this.modificaciones.item_severity_id = this.specific.get('itemSeverityControl').value;
        modificado = true;
      }
      if (this.item.item_resolution_id != this.specific.get('itemResolutionsControl').value) {
        this.modificaciones.item_resolution_id = this.specific.get('itemResolutionsControl').value;
        modificado = true;
      }
      if (this.item.reported_by_id != this.specific.get('usersControl').value) {
        this.modificaciones.reported_by_id = this.specific.get('usersControl').value;
        modificado = true;
      }
      if (this.item.item_priority_id != this.basic.get('itemPrioritiesControl').value) {
        this.modificaciones.item_priority_id = this.basic.get('itemPrioritiesControl').value;
        modificado = true;
      }
      if (this.item.item_type_id != this.specific.get('selectItemTypes').value) {
        this.modificaciones.item_type_id = this.specific.get('selectItemTypes').value;
        modificado = true;
      }
      if (this.item.item_status_id != this.specific.get('statusControl').value) {
        this.modificaciones.item_status_id = this.specific.get('statusControl').value;
        modificado = true;
      }
      if (this.item.percent_complete != this.specific.get('percentControl').value) {
        this.modificaciones.percent_complete = this.specific.get('percentControl').value;
        modificado = true;
      }
      if (this.item.estimate_hours != this.timesDates.get('hoursControl').value) {
        this.modificaciones.estimate_hours = this.timesDates.get('hoursControl').value;
        modificado = true;
      }
      if (this.item.estimate_minutes != this.timesDates.get('minutesControl').value) {
        this.modificaciones.estimate_minutes = this.timesDates.get('minutesControl').value;
        modificado = true;
      }
      if (this.item.reception_date != this.parseDate(this.timesDates.get('receptionDateControl').value)) {
        this.modificaciones.reception_date = this.parseDate(this.timesDates.get('receptionDateControl').value);
        modificado = true;
      }
      if (this.item.start_date != this.parseDate(this.timesDates.get('startDateControl').value)) {
        this.modificaciones.start_date = this.parseDate(this.timesDates.get('startDateControl').value);
        modificado = true;
      }
      if (this.item.due_date != this.parseDate(this.timesDates.get('dueDateControl').value)) {
        this.modificaciones.due_date = this.parseDate(this.timesDates.get('dueDateControl').value);
        modificado = true;
      }
      if (this.item.real_due_date != this.parseDate(this.timesDates.get('realDueDateControl').value)) {
        this.modificaciones.real_due_date = this.parseDate(this.timesDates.get('realDueDateControl').value);
        modificado = true;
      }

      if (modificado){
        this.modificaciones.user_updates_id = sessionStorage.id;
        this._itemsService.modifyItem(this.item.id, this.modificaciones);
      }

      this.modificaciones = {};
    }
  }

  nextBasic(stepper: MatStepper){
    if (this.errorBasic()){
      console.log("Error");
    } else {
      stepper.next();
    }
  }

  nextSpecific(stepper: MatStepper){
    if (this.errorSpecific()){
      console.log("Error");
    } else {
      stepper.next();
    }
  }

  back(stepper: MatStepper){
    stepper.previous();
  }

  parseDate(date): string {
    if (date == ''){
      return null;
    }
    if (date + "" != "Invalid Date" ){
      let d: Date;
      try {
        d = new Date(date);
      } catch {
        d = new Date();
      } finally {
          return this.datepipe.transform(d, 'yyyy-MM-dd');
      }
    } else {
      return null;
    }
  }

}
