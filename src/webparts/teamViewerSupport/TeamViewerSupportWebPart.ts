import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TeamViewerSupportWebPartStrings';
import TeamViewerSupport from './components/TeamViewerSupport';
import { ITeamViewerSupportProps } from './components/ITeamViewerSupportProps';

export interface ITeamViewerSupportWebPartProps {
  apiUrl: string;
  token: string;
  description: string;
}

export default class TeamViewerSupportWebPart extends BaseClientSideWebPart<ITeamViewerSupportWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITeamViewerSupportProps> = React.createElement(
      TeamViewerSupport,
      {
        context: this.context,
        token: this.properties.token,
        apiUrl: this.properties.apiUrl,
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected static get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('token', {
                  label: strings.TokenFieldLabel
                }),
                PropertyPaneTextField('apiUrl', {
                  label: strings.ApiUrlFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected  get disableReactivePropertyChanges(): boolean {
    return true;
  }

}
