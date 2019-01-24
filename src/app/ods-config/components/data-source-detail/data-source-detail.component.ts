import {Component, OnInit} from '@angular/core';
import {DataSource} from '../../../shared/model/data-source';
import {DataSourceService} from '../../../shared/services/data-source.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {NotificationService} from '../../../shared/services/notification.service';
import {NotificationClient} from '../../../shared/model/notification-client';
import {ProcessorChainService} from '../../../shared/services/processor-chain.service';
import {ProcessorChain} from '../../../shared/model/processor-chain';
import {PluginService} from '../../../shared/services/plugin.service';
import {DataViewService} from '../../../shared/services/data-view.service';
import {Plugin} from '../../../shared/model/plugin';
import {DataView} from '../../../shared/model/data-view';

@Component({
  selector: 'app-data-source-detail',
  templateUrl: './data-source-detail.component.html',
  styles: ['.mat-expansion-panel-header-description{ ' +
  'width: 200px;' +
  '}' +
  '.mat-expansion-panel-header-title {' +
  'max-width: 300px;' +
  '}']
})
export class DataSourceDetailComponent implements OnInit {

  id: string;

  public dataSource: Observable<DataSource>;
  public notificationClients: Observable<NotificationClient[]>;
  public processorChains: Observable<ProcessorChain[]>;
  public plugins: Observable<Plugin[]>;
  public views: Observable<DataView[]>;

  showChain = false;
  showView = false;
  public processorChain: ProcessorChain;
  public dataView: DataView;

  constructor(
    private datasourceService: DataSourceService,
    private notificationsService: NotificationService,
    private processorChainService: ProcessorChainService,
    private pluginService: PluginService,
    private dataViewService: DataViewService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['sourceId'];
    this.dataSource = this.datasourceService.getDataSourceById(this.id);
    this.notificationClients = this.notificationsService.getAllClients(this.id);
    this.processorChains = this.processorChainService.getAllProcessorChains(this.id);
    this.plugins = this.pluginService.getAllPlugins(this.id);
    this.views = this.dataViewService.getAllViews(this.id);
  }

  deleteProcessorChain(chainId: string) {
    this.processorChainService.deleteProcessorChain(this.id, chainId).subscribe(
      isSuccess => {
        this.processorChains = this.processorChainService.getAllProcessorChains(this.id);
        console.log(isSuccess);
      }
    );
  }

  deleteDataView(viewId: string) {
    this.dataViewService.deleteView(this.id, viewId).subscribe(
      isSuccess => {
        this.views = this.dataViewService.getAllViews(this.id);
        console.log(isSuccess);
      }
    );
  }

  deleteNotificationClient(clientId: string) {
    this.notificationsService.deleteClient(this.id, clientId).subscribe(
      isSuccess => {
        this.notificationClients = this.notificationsService.getAllClients(this.id);
        console.log(isSuccess);
      }
    );
  }

}
