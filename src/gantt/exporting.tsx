import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, Toolbar, ExcelExport } from '@syncfusion/ej2-react-gantt';
import { editingData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

export class Exporting extends SampleBase<{}, {}> {
  private ganttInstance: GanttComponent;
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks',
    resourceInfo: 'resources'
  };
  public projectStartDate: Date = new Date('03/25/2019');
  public projectEndDate: Date = new Date('07/28/2019');
  public gridLines: any = 'Both';
  public toolbar: any = ['ExcelExport', 'CsvExport'];
  public timelineSettings: any = {
    topTier: {
      unit: 'Week',
      format: 'MMM dd, y',
    },
    bottomTier: {
      unit: 'Day',
    },
  };
  public labelSettings: any = {
    leftLabel: 'TaskName',
    rightLabel: 'resources'
  };
  public toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === "GanttExport_excelexport") {
      this.ganttInstance.excelExport();
    }
    else if (args.item.id === "GanttExport_csvexport") {
      this.ganttInstance.csvExport();
    }
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='GanttExport' ref={gantt => this.ganttInstance = gantt} dataSource={editingData} dateFormat={'MMM dd, y'}
            treeColumnIndex={1} allowExcelExport={true} allowSelection={true} showColumnMenu={false} highlightWeekends={true}
            allowUnscheduledTasks={true} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}
            taskFields={this.taskFields} timelineSettings={this.timelineSettings} labelSettings={this.labelSettings} toolbarClick={this.toolbarClick.bind(this)}
            height='410px' gridLines={this.gridLines} toolbar={this.toolbar} resourceNameMapping='resourceName' resourceIDMapping='resourceId' resources={editingResources}>
            <Inject services={[Selection, Toolbar, ExcelExport]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates client-side exporting of the Gantt, which allows you to export Gantt data to Excel and CSV formats. Using the Gantt toolbar buttons, you can export Gantt data to the desired format. </p>
        </div>
        <div id="description">
          <p>Gantt supports client-side exporting, which allows you to export its data to the Excel and CSV formats. </p>
          <p>In this demo, we have defined actions in the <code>toolbarClick</code> event to export the Gantt data using the <code>excelExport</code> and <code>csvExport</code> methods.</p>

          <p>Injecting Module:</p>
          <p>To use Excel and CSV export features, inject the <code>ExcelExport</code> module using the <code>Gantt.Inject(ExcelExport)</code> method. </p>
        </div>
      </div>
    )
  }
}
