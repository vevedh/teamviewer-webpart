import * as React from 'react';
import styles from './TeamViewerSupport.module.scss';
import { ITeamViewerSupportProps } from './ITeamViewerSupportProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DisplayMode } from '@microsoft/sp-core-library';
import axios from 'axios';


export default class TeamViewerSupport extends React.Component<ITeamViewerSupportProps, {}> {

  state:any = {
    teamusers:  [],
    loading: true
  }

  displayMode: DisplayMode;

  public componentDidMount(): void {
    this._fetchUsers();
  }
  private _fetchUsers() {

    axios.get(this.props.apiUrl +'/users?full_list=true',{
        headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.token}`
      }
    }).then((res)=>{
      console.log('Users :',res.data.users);
      this.setState({teamusers:res.data.users, loading:false});

    })
  }



  public render(): React.ReactElement<ITeamViewerSupportProps> {

    return(
      <div className={styles.teamViewerSupport}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <p className={styles.description}>{escape(this.props.description)}</p>
            </div>
          </div>
          <div className={styles.row}>
          {
              (this.state.loading)?'Chargement en cours...':(this.state.teamusers.length>0)?this.state.teamusers.map(user => (
                (user.custom_quicksupport_id) ?
                <div key={'div-'+user.id} className={styles.column}>
                <a href={'https://get.teamviewer.com/'+user.custom_quicksupport_id} className={styles.button} target='_blank' >
                  <span id={'span-'+user.id} className={styles.label}>{user.name}</span>
                </a>
               </div> : ''

              )):<div className={styles.column}>Vous devez renseigner des paramètres token et url de l'api TeamViewer</div>
          }
          </div>
        </div>
      </div >
    );
  }

}
