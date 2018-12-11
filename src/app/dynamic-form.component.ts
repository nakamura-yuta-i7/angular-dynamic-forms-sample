import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
 
import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';

@Component({
  selector: 'dynamic-form',
  template: `
  <div>
    <form (ngSubmit)="onSubmit()" [formGroup]="form">
  
      <div *ngFor="let question of questions" class="form-row">
        <dynamic-form-question [question]="question" [form]="form"></dynamic-form-question>
      </div>
  
      <div class="form-row">
        <button type="submit" [disabled]="!form.valid">Save</button>
      </div>
    </form>
  
    <div *ngIf="payLoad" class="form-row">
      <strong>Saved the following values</strong><br>{{payLoad}}
    </div>
  </div>
  `,
  styles: [],
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {
 
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
 
  constructor(private qcs: QuestionControlService) {  }
 
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }
 
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
