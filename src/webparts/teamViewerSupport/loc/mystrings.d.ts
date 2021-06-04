declare interface ITeamViewerSupportWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  TokenFieldLabel: string;
  ApiUrlFieldLabel: string;
}

declare module 'TeamViewerSupportWebPartStrings' {
  const strings: ITeamViewerSupportWebPartStrings;
  export = strings;
}
