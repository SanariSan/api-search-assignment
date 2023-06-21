import type { TWidgetNames } from '../../../core/dashboard/controllers';
import { WidgetAlt, WidgetMain } from '../../../core/dashboard/widgets';

function dashboardWidgetGet(widgetName: TWidgetNames): typeof WidgetMain | typeof WidgetAlt {
  switch (widgetName) {
    case 'main': {
      return WidgetMain;
    }
    case 'alt': {
      return WidgetAlt;
    }
    // no default
  }
}

export { dashboardWidgetGet };
