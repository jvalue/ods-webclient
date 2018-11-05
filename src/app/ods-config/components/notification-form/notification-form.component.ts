import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../shared/services/notification.service';
import {NotificationClient} from '../../../shared/model/notification-client';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.css']
})
export class NotificationFormComponent implements OnInit {

  sourceId: string;
  notificationClient: NotificationClient;
  clientTypes = ['HTTP', 'GCM', 'AMQP'];
  currentType = 'HTTP';
  currentNotificationArguments: FormGroup;
  httpForm: FormGroup;
  gcmForm: FormGroup;
  amqpForm: FormGroup;

  notificationForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _formBuilder: FormBuilder,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.sourceId = this.route.snapshot.params['sourceId'];
    this.notificationForm = this._formBuilder.group({
      id: ['', Validators.required],
      type: this.currentType,
      typeArguments: new FormGroup({})
    });
    this.httpForm = this._formBuilder.group({
      callbackUrl: [''],
      sendData: [true]
    });
    this.gcmForm = this._formBuilder.group({
      gcmClientId: ['']
    });
    this.amqpForm = this._formBuilder.group({
      exchange: [''],
      host: [''],
      exchangeType: [''],
      routingKey: ['']
    });
    this.updateToHttpNotificationClient();
  }

  update(notificationClientType: string) {

    if (notificationClientType === 'HTTP') {
      this.updateToHttpNotificationClient();
    }
    if (notificationClientType === 'GCM') {
      this.updateToGCMNotificationClient();
    }
    if (notificationClientType === 'AMQP') {
      this.updateToAMQPNotificationClient();
    }

  }

  updateToHttpNotificationClient () {
    this.currentType = 'HTTP';
    this.currentNotificationArguments = this.httpForm;
  }

  updateToGCMNotificationClient () {
    this.currentType = 'GCM';
    this.currentNotificationArguments = this.gcmForm;
  }

  updateToAMQPNotificationClient () {
    this.currentType = 'AMQP';
    this.currentNotificationArguments = this.amqpForm;
  }

  submit() {
    this.notificationForm.controls['typeArguments'] = this.currentNotificationArguments;
    this.notificationClient = this.notificationForm.getRawValue();
    this.notificationService.addNewClient(this.sourceId, this.notificationClient).subscribe();

    this.router.navigate(['odsConfig/datasources/', this.sourceId, 'details']).then(err => {
      console.log(err);
    });
  }

}
