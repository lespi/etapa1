import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'FormularioWebPartStrings';

import 'etapa1/dist/etapa1/bundle.js';

export interface IFormularioWebPartProps {
  description: string;
}

export default class FormularioWebPart extends BaseClientSideWebPart<IFormularioWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `<app-formulario-web-part description="${ this.properties.description }"></app-formulario-web-part>`;
  }

  protected get dataVersion(): Version {
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
