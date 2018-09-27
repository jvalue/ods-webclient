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
})
export class DataSourceDetailComponent implements OnInit {

  public dataSource: Observable<DataSource>;
  public notificationClients: Observable<NotificationClient[]>;
  public processorChains: Observable<ProcessorChain[]>;
  public plugins: Observable<Plugin[]>;
  public views: Observable<DataView[]>;

  constructor(
    private datasourceService: DataSourceService,
    private notificationsService: NotificationService,
    private processorChainService: ProcessorChainService,
    private pluginService: PluginService,
    private dataViewService: DataViewService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['sourceId'];
    this.dataSource = this.datasourceService.getDataSourceById(id);
    this.notificationClients = this.notificationsService.getAllClients(id);
    this.processorChains = this.processorChainService.getAllProcessorChains(id);
    this.plugins = this.pluginService.getAllPlugins(id);
    this.views = this.dataViewService.getAllViews(id);
  }

}
