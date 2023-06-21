import type { TWidgetInstance } from '../../../../core/dashboard/controllers';
import { WidgetsInstancesController } from '../../../../core/dashboard/controllers';

function dashboardShow(widgetInstance: TWidgetInstance) {
  WidgetsInstancesController.show(widgetInstance);
}

function dashboardHide(widgetInstance: TWidgetInstance) {
  WidgetsInstancesController.hide(widgetInstance);
}

export { dashboardShow, dashboardHide };
