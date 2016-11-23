class RosterPage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      people: null,
      showPersonModal: false,
      person: null,
    };
  }

  componentDidMount() {
    this.fetchPeople();
  }

  fetchPeople() {
    const route = ApiConstants.searchables.roster;
    const resolve = (response) => this.setState({ people: response.searchables });
    const reject = (response) => console.log(response);
    Requester.get(
      route,
      resolve,
      reject,
    );
  }

  onPersonClick(person) {
    this.setState({ showPersonModal: true, person:person });
  }

  closePersonModal() {
    this.setState({ showPersonModal: false, person: null });
  }

  renderPersonModal() {
    const { showPersonModal } = this.state;
    if (showPersonModal == true) {
      return (
        <PersonModal handleClose={() => this.closePersonModal()} person={this.state.person} />
      );
    }
  }

  renderPerson(person) {
    return (
      <div>
        <RosterItem person={person} onPersonClick={(person)=>this.onPersonClick(person)} />
        <div className="item-separator" />
      </div>
    );
  }

  renderPeople() {
    return this.state.people.map((person) => this.renderPerson(person));
  }

  onSearchChange(event) {
    var input = $(event.target).val();
    if (input === "") {
      this.fetchPeople();
    } else {
      const route = ApiConstants.searchables.users(input);
      const resolve = (response) => this.setState({ people: response.searchables });
      const reject = (response) => console.log(response);
      Requester.get(
        route,
        resolve,
        reject,
      );
    }
  }

  render() {
    if (this.state.people == null) {
      return (
        <div />
      );
    } else {
      return (
        <div className="page-wrapper">
          <AdminHeader />
          <div className="content-wrapper roster-page">
            <h1 className="roster-title">Roster</h1>
             <FormGroup className="searchbar">
              <InputGroup>
                <FormControl 
                  componentClass="input"  
                  placeholder="Search"
                  name="first_name"
                  onChange={(event) => this.onSearchChange(event)}/>
                <InputGroup.Addon>
                  <Glyphicon glyph="search" />
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
            <div className="roster-container">
              {this.renderPeople()}
            </div>
            {this.renderPersonModal()}
          </div>
        </div>
      );
    }
  }
}
