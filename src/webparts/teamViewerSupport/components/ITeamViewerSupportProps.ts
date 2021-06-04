import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITeamViewerSupportProps {
  context: WebPartContext;
  token:string;
  apiUrl:string;
  description: string;
}
