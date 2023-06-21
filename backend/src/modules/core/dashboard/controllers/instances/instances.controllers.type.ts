import type { WidgetAlt, WidgetMain } from '../../widgets';

type TWidgetInstance = WidgetMain | WidgetAlt; // | etc
type TWidgetNames = 'main' | 'alt'; // | etc

export type { TWidgetInstance, TWidgetNames };
