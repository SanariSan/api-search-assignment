interface IWidgetAlt {
  appear: (screen) => void;
  disappear: () => void;
  updateContent: (logsObj: Readonly<Record<string, string[]>>) => void;
}

export type { IWidgetAlt };
