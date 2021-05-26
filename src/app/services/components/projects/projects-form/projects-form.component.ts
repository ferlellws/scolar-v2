import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemsFormComponent } from '../../items/items-form/items-form.component';

//SERVICIOS
import { TemplatesService } from 'src/app/services/templates.service';
import { ProjectCategoriesService } from 'src/app/services/project-categories.service';
import { UserService } from 'src/app/services/user.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { ColorsService } from "src/app/services/colors.service";

//MODELOS
import { TemplateModel } from 'src/app/models/template-model';
import { ProjectCategory } from 'src/app/models/project-category';
import { User } from 'src/app/models/user';
import { Color } from 'src/app/models/color';
import { Project } from 'src/app/models/project';
import { Company } from 'src/app/models/company';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'tecno-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.scss']
})
export class ProjectsFormComponent implements OnInit {

  //Informacion obtenida de los servicios
  templates: TemplateModel[] = [];
  projectCategories: ProjectCategory[] = [];
  users: User[] = [];
  companies: Company[] = [];
  colors: Color[] = [];

  newProject:any;
  modificaciones: any = {};

  //informacion previa para modificacion
  @Input() mode: string;
  @Input() id: string;
  @Input() bgColor: string;
  @Input() projectName: string;
  @Input() projectDescription: string;
  @Input() userReporter: string;
  @Input() company_id: string;
  @Input() code: string;
  @Input() is_active: string;
  @Input() is_multiple_components: string;
  @Input() is_multiple_resources: string;
  @Input() project_category_id: string;
  @Input() template_id: string;

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  flagClose: boolean = false;

  constructor(
    private _templateService: TemplatesService,
    private _projectCategoryService: ProjectCategoriesService,
    private _userService: UserService,
    private _projectsService: ProjectsService,
    private _companiesService: CompaniesService,
    private _colorsService: ColorsService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ItemsFormComponent>,
  ) {}


  ngOnInit(): void {

    //casteo a string
    this.is_multiple_resources = '' + this.is_multiple_resources;
    this.is_multiple_components = '' + this.is_multiple_components;

    this.options = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      'projectNameControl': [this.projectName],
      'codeControl': [this.code],
      'projectDescriptionControl': [this.projectDescription],
      'companyControl': [this.company_id,[Validators.required]],
      'templateControl': [this.template_id],
      'project_categoryControl': [this.project_category_id],
      'userReporterControl': [this.userReporter],
      'is_multiple_resourcesControl': [this.is_multiple_resources],
      'is_multiple_componentsControl': [this.is_multiple_components],
      'bgColorControl': [this.bgColor],
    });

    this.colors = this._colorsService.getColors();
    this._companiesService.getCompanies()
      .subscribe(companies => this.companies = companies);
    this._templateService.getTemplates()
      .subscribe(templates => this.templates = templates);
    this._projectCategoryService.getProjectCategories()
      .subscribe(projectCategories => this.projectCategories = projectCategories);
    this._userService.getUsers()
      .subscribe(users => this.users = users);
  }

  _openCompanies(ev:boolean) {
    if(ev) {
      this._companiesService.getCompanies()
      .subscribe(companies => this.companies = companies);
    }
  }

  _openTemplates(ev:boolean) {
    if(ev) {
      this._templateService.getTemplates()
      .subscribe(templates => this.templates = templates);
    }
  }

  _openProjectCategories(ev:boolean) {
    if(ev) {
      this._projectCategoryService.getProjectCategories()
      .subscribe(projectCategories => {
        this.projectCategories = projectCategories;
        this.projectCategories = this.projectCategories.filter(category => category.company_id == this.options.get('companyControl').value);
      });
    }
  }

  _openUsers(ev:boolean) {
    if(ev) {
      this._userService.getUsers()
      .subscribe(users => this.users = users);
    }
  }

  getColorLabel() {
    var color = this.colors.filter(color => color.name == this.options.get('bgColorControl').value)[0];
    if (color != null) {
      return color.label;
    }else {
      return '';
    }
  }

  onNoClick(): void {
    // this.dialogRef.close();
    console.log("onNoClick");
  }

  saveData(): void {
    this.newProject={
      id: 0,
      code: this.options.get('codeControl').value,
      title: this.options.get('projectNameControl').value,
      description: this.options.get('projectDescriptionControl').value,
      company_id: this.options.get('companyControl').value,
      template_id: this.options.get('templateControl').value,
      project_category_id: this.options.get('project_categoryControl').value,
      lead_id: this.options.get('userReporterControl').value,
      is_multiple_resources: this.options.get('is_multiple_resourcesControl').value,
      is_multiple_components: this.options.get('is_multiple_componentsControl').value,
      color: this.options.get('bgColorControl').value,
      is_active: '1'
    };

    this._projectsService.addProject(this.newProject);
    this.dialogRef.close();
    this.newProject = {}
  }
  modifyData(): void {
    this.newProject={
      id: this.id,
      code: this.options.get('codeControl').value,
      title: this.options.get('projectNameControl').value,
      description: this.options.get('projectDescriptionControl').value,
      company_id: this.options.get('companyControl').value,
      template_id: this.options.get('templateControl').value,
      project_category_id: this.options.get('project_categoryControl').value,
      lead_id: this.options.get('userReporterControl').value,
      is_multiple_resources: this.options.get('is_multiple_resourcesControl').value,
      is_multiple_components: this.options.get('is_multiple_componentsControl').value,
      color: this.options.get('bgColorControl').value,
      is_active: this.is_active
    };

    if (this.code != this.newProject.code)
      this.modificaciones.code = this.newProject.code;
    if (this.projectName != this.newProject.title)
      this.modificaciones.title = this.newProject.title;
    if (this.projectDescription != this.newProject.description)
      this.modificaciones.description = this.newProject.description;
    if (this.company_id != this.newProject.company_id)
      this.modificaciones.company_id = this.newProject.company_id;
    if (this.template_id != this.newProject.template_id)
      this.modificaciones.template_id = this.newProject.template_id;
    if (this.project_category_id != this.newProject.project_category_id)
      this.modificaciones.project_category_id = this.newProject.project_category_id;
    if (this.userReporter != this.newProject.lead_id)
      this.modificaciones.lead_id = this.newProject.lead_id;
    if (this.is_multiple_resources != this.newProject.is_multiple_resources)
      this.modificaciones.is_multiple_resources = this.newProject.is_multiple_resources;
    if (this.is_multiple_components != this.newProject.is_multiple_components)
      this.modificaciones.is_multiple_components = this.newProject.is_multiple_components;
    if (this.bgColor != this.newProject.color)
      this.modificaciones.color = this.newProject.color;
    if (this.is_active != this.newProject.is_active)
      this.modificaciones.is_active = this.newProject.is_active;

    this._projectsService.modifyProject(this.id,this.modificaciones);

    this.dialogRef.close();
    this.newProject = {};
    this.modificaciones = {};
    // SE DEBE USUAR PARA CERRAR EL DIALOGO CUANDO NO SE PONE mat-dialog-close EN EL BOTON DE GUARDAR SI GUARDA LA INFO CORRECTAMENTE SI NO DEBE IMPEDIR QUE SE CIERRE
    // this.dialogRef.close();
  }

}
